import { useState } from "react";
import { toast } from "react-toastify";

const PurchaseModal = ({ sweet, token, onClose, onSuccess }) => {
  const [qty, setQty] = useState(1);
  const [loading, setLoading] = useState(false);

  const purchase = async () => {
    if (qty < 1) return toast.error("Quantity must be at least 1");

    setLoading(true);

    try {
      const res = await fetch(
        `http://localhost:4000/api/sweets/${sweet._id}/purchase`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ quantity: qty }),
        }
      );

      const data = await res.json();

      if (res.status === 200) {
        toast.success("🎉 Purchase successful!");
        onSuccess();
        onClose();
      } else {
        toast.error(data.message);
      }
    } catch {
      toast.error("Something went wrong");
    }

    setLoading(false);
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 animate-fadeIn">
      
      {/* Modal Card */}
      <div className="bg-white/30 backdrop-blur-xl border border-white/40 rounded-3xl shadow-2xl w-[90%] max-w-lg p-8 animate-scaleIn">

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-700 hover:text-red-500 text-2xl"
        >
          ✖
        </button>

        {/* Title */}
        <h2 className="text-3xl font-extrabold text-center text-black mb-4">
          Purchase {sweet.name} 🍬
        </h2>

        {/* Sweet Details */}
        <div className="text-center mb-4">
          <p className="text-white text-lg">Price: ₹{sweet.price}</p>
          <p className="text-white">Available Stock: {sweet.quantity}</p>
        </div>

        {/* Quantity Input */}
        <div className="flex flex-col items-center gap-2 mb-6">
          <label className="font-semibold text-black">Enter Quantity</label>

          <input
            type="number"
            value={qty}
            min={1}
            max={sweet.quantity}
            onChange={(e) => setQty(e.target.value)}
            className="w-32 p-2 border rounded-xl text-center shadow bg-white/70 outline-none 
                       focus:ring-2 focus:ring-purple-400"
          />
        </div>

        {/* Total Price */}
        <p className="text-center text-xl font-semibold text-black mb-6">
          Total: ₹{sweet.price * qty}
        </p>

        {/* Buttons */}
        <div className="flex justify-center gap-4">
          <button
            onClick={purchase}
            disabled={loading}
            className={`px-6 py-3 text-white rounded-xl shadow-lg font-semibold transition 
                       ${loading ? "bg-gray-400" : "bg-purple-600 hover:bg-purple-700 hover:scale-105"}`}
          >
            {loading ? "Processing..." : "Buy Now"}
          </button>

          <button
            onClick={onClose}
            className="px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-xl shadow-lg font-semibold transition hover:scale-105"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default PurchaseModal;
