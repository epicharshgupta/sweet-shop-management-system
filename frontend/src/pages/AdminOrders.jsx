import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";
import { API_URL } from "../config";

const AdminOrders = () => {
  const { token } = useAuth();
  const [orders, setOrders] = useState([]);

  const loadOrders = async () => {
    try {
      const res = await fetch(`${API_URL}/api/orders`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();

      if (res.status === 200) {
        setOrders(data);
      } else {
        toast.error(data.message || "Failed to load orders");
      }
    } catch {
      toast.error("Server error");
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  return (
    <div className="max-w-6xl mx-auto mt-24 px-4">
      <h1 className="text-3xl font-bold mb-6 text-center text-pink-600">
        📦 All Purchase Orders 
      </h1>

      {orders.length === 0 ? (
        <p className="text-center text-gray-600">No orders found.</p>
      ) : (
        <div className="overflow-x-auto shadow-lg rounded-lg">
          <table className="min-w-full bg-white">
            <thead className="bg-pink-600 text-white">
              <tr>
                <th className="py-3 px-4">User ID</th>
                <th className="py-3 px-4">Sweet</th>
                <th className="py-3 px-4">Quantity</th>
                <th className="py-3 px-4">Total Price</th>
                <th className="py-3 px-4">Date</th>
              </tr>
            </thead>

            <tbody>
              {orders.map((o) => (
                <tr key={o._id} className="border-b">
                  <td className="py-3 px-4">{o.userId}</td>
                  <td className="py-3 px-4">{o.sweetName}</td>
                  <td className="py-3 px-4">{o.quantity}</td>
                  <td className="py-3 px-4 font-semibold">₹{o.total}</td>
                  <td className="py-3 px-4 text-gray-600">
                    {new Date(o.createdAt).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminOrders;
