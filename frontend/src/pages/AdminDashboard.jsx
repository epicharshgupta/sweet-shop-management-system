import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";
import { API_URL } from "../config";

const AdminDashboard = () => {
  const { user, token } = useAuth();

  const [sweets, setSweets] = useState([]);
  const [form, setForm] = useState({
    name: "",
    category: "",
    price: "",
    quantity: ""
  });

  const [editing, setEditing] = useState(null);

  // Fetch sweets
  const loadSweets = async () => {
    try {
      const res = await fetch(`${API_URL}/api/sweets`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (Array.isArray(data)) setSweets(data);
    } catch {
      toast.error("Failed to fetch sweets");
    }
  };

  useEffect(() => {
    loadSweets();
  }, []);

  // Add or Update Sweet
  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = editing
      ? `${API_URL}/api/sweets/${editing._id}`
      : `${API_URL}/api/sweets`;

    const method = editing ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(form)
      });

      if (res.status === 200 || res.status === 201) {
        toast.success(
          editing ? "Sweet updated successfully" : "Sweet added successfully"
        );
        setForm({ name: "", category: "", price: "", quantity: "" });
        setEditing(null);
        loadSweets();
      } else {
        toast.error("Failed to save sweet");
      }
    } catch {
      toast.error("Error occurred");
    }
  };

  // Delete Sweet
  const deleteSweet = async (id) => {
  if (!window.confirm("Delete this sweet?")) return;

  try {
    const res = await fetch(`${API_URL}/api/sweets/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` }
    });

    if (res.status === 200) {
      toast.success("Sweet deleted");
      loadSweets();
    }
  } catch {
    toast.error("Failed to delete sweet");
  }
};

  return (
    <div className="max-w-5xl mx-auto mt-10 px-4">
      {/* HEADER */}
      <h1 className="text-2xl font-bold">
        Welcome, {user?.name} (Admin) 👑
      </h1>
      <p className="text-gray-600 mb-6">Manage all sweets below</p>

      {/* FORM */}
      <div className="bg-white p-6 rounded-lg shadow mb-8">
        <h2 className="text-xl font-semibold mb-4">
          {editing ? "✏️ Edit Sweet" : "➕ Add New Sweet"}
        </h2>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">

          <input
            className="border p-2 rounded"
            type="text"
            placeholder="Sweet Name"
            value={form.name}
            required
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />

          <input
            className="border p-2 rounded"
            type="text"
            placeholder="Category"
            value={form.category}
            required
            onChange={(e) => setForm({ ...form, category: e.target.value })}
          />

          <input
            className="border p-2 rounded"
            type="number"
            placeholder="Price"
            value={form.price}
            required
            onChange={(e) => setForm({ ...form, price: e.target.value })}
          />

          <input
            className="border p-2 rounded"
            type="number"
            placeholder="Quantity"
            value={form.quantity}
            required
            onChange={(e) => setForm({ ...form, quantity: e.target.value })}
          />

          <button className="bg-green-600 text-white py-2 rounded col-span-full">
            {editing ? "Update Sweet" : "Add Sweet"}
          </button>

        </form>
      </div>

      {/* SWEETS LIST */}
      <h2 className="text-xl font-semibold mb-3">All Sweets</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {sweets.map((s) => (
          <div key={s._id} className="bg-white p-5 rounded-lg shadow">
            <h3 className="text-xl font-bold">{s.name}</h3>
            <p className="text-gray-600">Category: {s.category}</p>
            <p className="text-gray-700">Price: ₹{s.price}</p>
            <p className="text-gray-900 font-semibold">Qty: {s.quantity}</p>

            {/* Buttons */}
            <div className="mt-4 flex justify-between">
              <button
                onClick={() => {
                  setEditing(s);
                  setForm({
                    name: s.name,
                    category: s.category,
                    price: s.price,
                    quantity: s.quantity
                  });
                }}
                className="px-3 py-1 bg-blue-600 text-white rounded"
              >
                Edit
              </button>

              <button
                onClick={() => deleteSweet(s._id)}
                className="px-3 py-1 bg-red-600 text-white rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
