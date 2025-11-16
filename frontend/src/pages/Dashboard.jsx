import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import { API_URL } from "../config";

const Dashboard = () => {
  const { user, token } = useAuth();
  const [sweets, setSweets] = useState([]);

  // Fetch all sweets for count + listing
  const loadSweets = async () => {
    try {
      const res = await fetch(`${API_URL}/api/sweets`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setSweets(data);
    } catch (e) {
      console.log("Error loading sweets");
    }
  };

  useEffect(() => {
    loadSweets();
  }, []);

  return (
    <div className="pt-28 pb-16 min-h-screen bg-gradient-to-br from-pink-50 to-white">
      <div className="max-w-5xl mx-auto px-6">

        {/* Welcome Section */}
        <h1 className="text-4xl font-extrabold text-pink-600 mb-3">
          Welcome, {user?.name} 🍭
        </h1>

        <p className="text-gray-700 text-lg">
          Explore, browse & enjoy the best sweets created just for you!
        </p>

        <Link
          to="/sweets"
          className="mt-6 inline-block bg-pink-600 hover:bg-pink-700 text-white px-6 py-3 rounded-xl shadow font-semibold transition"
        >
          Browse Sweets →
        </Link>

        {/* Stats Card */}
        <div className="mt-10 bg-white shadow-xl p-6 rounded-2xl">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Total Available Sweets</h2>
          <p className="text-pink-600 text-4xl font-extrabold mb-4">{sweets.length}</p>

          {/* List */}
          <div className="mt-4 space-y-3">
            {sweets.map((s) => (
              <div
                key={s._id}
                className="flex justify-between bg-gray-50 p-3 rounded-lg shadow-sm"
              >
                <span className="text-gray-800 font-medium">{s.name}</span>
                <span className="text-gray-600">Qty: {s.quantity}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Tip */}
        <p className="text-gray-500 text-center mt-8 text-sm">
          Tip: Use the search feature on the Sweets page for quick filtering.
        </p>
      </div>
    </div>
  );
};

export default Dashboard;
