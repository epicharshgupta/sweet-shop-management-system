import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import PurchaseModal from "../components/PurchaseModal";
import { toast } from "react-toastify";

const Sweets = () => {
  const { token } = useAuth();

  const [sweets, setSweets] = useState([]);
  const [selectedSweet, setSelectedSweet] = useState(null);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const sweetsPerPage = 9;

  // Filters
  const [searchName, setSearchName] = useState("");
  const [searchCategory, setSearchCategory] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  // helper to normalize response -> always array
  const normalizeToArray = (data) => {
    if (!data) return [];
    if (Array.isArray(data)) return data;
    // if paginated object like { sweets: [...] }
    if (data.sweets && Array.isArray(data.sweets)) return data.sweets;
    // if single sweet object, wrap it
    if (typeof data === "object") return [data];
    return [];
  };

  const fetchSweets = async () => {
    try {
      const res = await fetch("http://localhost:4000/api/sweets", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) {
        const txt = await res.text().catch(() => "");
        toast.error("Failed to load sweets: " + (txt || res.status));
        setSweets([]);
        return;
      }

      const data = await res.json();
      const arr = normalizeToArray(data);
      setSweets(arr);
      setCurrentPage(1);
    } catch (error) {
      console.error("fetchSweets error:", error);
      // toast.error("Failed to load sweets (network)");
      toast.error("login first then u are able to see sweets");

      setSweets([]);
    }
  };

  const handleSearch = async () => {
    try {
      const query = new URLSearchParams({
        name: searchName.trim(),
        category: searchCategory.trim(),
        minPrice: minPrice || undefined,
        maxPrice: maxPrice || undefined,
      }).toString();

      const url = `http://localhost:4000/api/sweets/search${query ? "?" + query : ""}`;

      const res = await fetch(url, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) {
        const txt = await res.text().catch(() => "");
        toast.error("Search failed: " + (txt || res.status));
        return;
      }

      const data = await res.json();
      const arr = normalizeToArray(data);
      setSweets(arr);
      setCurrentPage(1);
    } catch (error) {
      console.error("handleSearch error:", error);
      toast.error("Search failed (network)");
    }
  };

  useEffect(() => {
    fetchSweets();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  // Pagination computed
  const indexOfLastSweet = currentPage * sweetsPerPage;
  const indexOfFirstSweet = indexOfLastSweet - sweetsPerPage;

  // SAFETY: ensure sweets is array before slicing
  const currentSweets = Array.isArray(sweets)
    ? sweets.slice(indexOfFirstSweet, indexOfLastSweet)
    : [];

  const totalPages = Array.isArray(sweets) ? Math.max(1, Math.ceil(sweets.length / sweetsPerPage)) : 1;

  return (
    <div className="max-w-6xl mx-auto mt-10 px-4">
      <h1 className="text-4xl font-bold mb-6 text-center">🍬 Available Sweets</h1>

      {/* SEARCH */}
      <div className="bg-white p-5 rounded-lg shadow mb-8">
        <h2 className="text-xl font-semibold mb-4">Search & Filters</h2>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <input
            type="text"
            placeholder="Search by name"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
            className="border p-2 rounded"
          />

          <input
            type="text"
            placeholder="Category (e.g. milk, bengali)"
            value={searchCategory}
            onChange={(e) => setSearchCategory(e.target.value)}
            className="border p-2 rounded"
          />

          <input
            type="number"
            placeholder="Min Price"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            className="border p-2 rounded"
          />

          <input
            type="number"
            placeholder="Max Price"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="border p-2 rounded"
          />
        </div>

        <div className="flex gap-2 mt-4">
          <button
            onClick={handleSearch}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded font-semibold"
          >
            🔍 Search
          </button>

          <button
            onClick={() => {
              // clear filters and reload all sweets
              setSearchName("");
              setSearchCategory("");
              setMinPrice("");
              setMaxPrice("");
              fetchSweets();
            }}
            className="px-4 py-2 border rounded"
          >
            Clear
          </button>
        </div>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {currentSweets.length === 0 ? (
          <div className="col-span-full text-center text-gray-500 py-10">
            No sweets found.
          </div>
        ) : (
          currentSweets.map((s) => (
            <div key={s._id} className="bg-white shadow-lg rounded-lg p-5 text-center">
              <h3 className="text-2xl font-bold">{s.name}</h3>
              <p className="text-gray-600">Category: {s.category}</p>
              <p className="text-gray-900 font-semibold">₹{s.price}</p>
              <p className={s.quantity === 0 ? "text-red-600 font-bold" : "text-green-700"}>
                Stock: {s.quantity}
              </p>

              <button
                disabled={s.quantity === 0}
                onClick={() => setSelectedSweet(s)}
                className={`mt-4 w-full py-2 rounded text-white font-bold ${
                  s.quantity === 0 ? "bg-gray-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"
                }`}
              >
                {s.quantity === 0 ? "Out of Stock" : "Purchase"}
              </button>
            </div>
          ))
        )}
      </div>

      {/* PAGINATION */}
      {Array.isArray(sweets) && sweets.length > sweetsPerPage && (
        <div className="flex justify-center mt-8 gap-4">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
            disabled={currentPage === 1}
          >
            ◀ Previous
          </button>

          <span className="px-4 py-2 font-semibold">
            Page {currentPage} of {totalPages}
          </span>

          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
            disabled={currentPage === totalPages}
          >
            Next ▶
          </button>
        </div>
      )}

      {/* MODAL */}
      {selectedSweet && (
        <PurchaseModal
          sweet={selectedSweet}
          token={token}
          onClose={() => setSelectedSweet(null)}
          onSuccess={() => {
            fetchSweets();
            setSelectedSweet(null);
          }}
        />
      )}
    </div>
  );
};

export default Sweets;

