import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";
import { API_URL } from "../config";

const MyOrders = () => {
  const { token } = useAuth();
  const [orders, setOrders] = useState([]);

  const loadOrders = async () => {
    try {
      const res = await fetch(`${API_URL}/api/orders/my`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();
      setOrders(data);
    } catch (err) {
      toast.error("Failed to load orders");
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  return (
    <div className="max-w-5xl mx-auto mt-24 px-4">
      <h1 className="text-4xl font-bold mb-6 text-center text-pink-600">
        📦 My Orders
      </h1>

      {/* NO ORDERS */}
      {orders.length === 0 && (
        <div className="text-center mt-20">
          {/* <img
            src="https://cdni.iconscout.com/illustration/premium/thumb/empty-cart-illustration-download-in-svg-png-gif-file-formats--empty-state-ecommerce-ui-pack-illustrations-7391445.png"
            alt="No orders"
            className="w-64 mx-auto"
          /> */}
          <h2 className="text-2xl font-semibold mt-4 text-gray-600">
            No Orders Yet
          </h2>
          <p className="text-gray-500">Start exploring delicious sweets!</p>

          <a
            href="/sweets"
            className="mt-5 inline-block bg-pink-600 text-white px-6 py-2 rounded-lg hover:bg-pink-700"
          >
            🍬 Browse Sweets
          </a>
        </div>
      )}

      {/* ORDERS LIST */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {orders.map((order) => (
          <div
            key={order._id}
            className="bg-white rounded-xl shadow-lg p-5 border border-gray-100 hover:shadow-2xl transition-all"
          >
            <div className="flex items-center gap-4">
              {/* Sweet Image Placeholder */}
              <div className="w-20 h-20 bg-pink-100 rounded-lg flex items-center justify-center text-3xl">
                🍭
              </div>

              <div>
                <h2 className="text-xl font-bold">{order.sweetName}</h2>
                <p className="text-gray-600">Quantity: {order.quantity}</p>
                <p className="font-semibold text-green-600">
                  ₹{order.total}
                </p>
              </div>
            </div>

            <div className="mt-4 text-sm text-gray-500">
              Ordered On: {new Date(order.createdAt).toLocaleString()}
            </div>

            <div className="mt-3">
              <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
                ✔ Completed
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyOrders;
