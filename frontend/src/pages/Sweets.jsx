import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import PurchaseModal from "../components/PurchaseModal";
import { toast } from "react-toastify";
import { API_URL } from "../config";

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

  // Normalize API response
  const normalizeToArray = (data) => {
    if (Array.isArray(data)) return data;
    if (data?.sweets) return data.sweets;
    if (data && typeof data === "object") return [data];
    return [];
  };

  // FETCH ALL SWEETS
  const fetchSweets = async () => {
    try {
      const res = await fetch(`${API_URL}/api/sweets`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) {
        toast.error("Login first to see sweets");
        setSweets([]);
        return;
      }

      const data = await res.json();
      setSweets(normalizeToArray(data));
      setCurrentPage(1);
    } catch {
      toast.error("Failed to load sweets");
      setSweets([]);
    }
  };

  // SEARCH SWEETS — BUG FIXED
  const handleSearch = async () => {
    try {
      // Build clean search query
      const q = {};

      if (searchName.trim()) q.name = searchName.trim();
      if (searchCategory.trim()) q.category = searchCategory.trim().toLowerCase();

      if (minPrice !== "") q.minPrice = Number(minPrice);
      if (maxPrice !== "") q.maxPrice = Number(maxPrice);

      const query = new URLSearchParams(q).toString();

      const res = await fetch(
        `${API_URL}/api/sweets/search${query ? "?" + query : ""}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (!res.ok) {
        toast.error("Search failed");
        return;
      }

      const data = await res.json();
      setSweets(normalizeToArray(data));
      setCurrentPage(1);
    } catch {
      toast.error("Search error");
    }
  };

  useEffect(() => {
    fetchSweets();
  }, [token]);

  // Pagination Logic
  const indexOfLastSweet = currentPage * sweetsPerPage;
  const indexOfFirstSweet = indexOfLastSweet - sweetsPerPage;

  const currentSweets = sweets.slice(indexOfFirstSweet, indexOfLastSweet);

  const totalPages = Math.ceil(sweets.length / sweetsPerPage);

  return (
    <div className="max-w-6xl mx-auto mt-10 px-4">
      <h1 className="text-4xl font-bold mb-6 text-center">🍬 Available Sweets</h1>

      {/* SEARCH BOX */}
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
            placeholder="Category (milk, bengali...)"
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

      {/* SWEETS GRID */}
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
                  s.quantity === 0
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-green-600 hover:bg-green-700"
                }`}
              >
                {s.quantity === 0 ? "Out of Stock" : "Purchase"}
              </button>
            </div>
          ))
        )}
      </div>

      {/* PAGINATION */}
      {sweets.length > sweetsPerPage && (
        <div className="flex justify-center mt-8 gap-4">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
          >
            ◀ Previous
          </button>

          <span className="px-4 py-2 font-semibold">
            Page {currentPage} of {totalPages}
          </span>

          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
          >
            Next ▶
          </button>
        </div>
      )}

      {/* PURCHASE MODAL */}
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
