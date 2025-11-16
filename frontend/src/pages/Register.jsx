import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { API_URL } from "../config";

const Register = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  });

  const [error, setError] = useState("");

  // Disable scroll on register page
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch(`${API_URL}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.status === 201) {
        login(data.token, data.user);
        navigate("/dashboard");
      } else {
        setError(data.message || "Registration failed");
      }
    } catch {
      setError("Server error. Try again.");
    }
  };

  return (
    <div
      className="
        flex items-start justify-center
        h-[calc(100vh-60px)]
        pt-10
        bg-gradient-to-br from-purple-100 via-white to-pink-200
        px-4
        overflow-hidden
      "
    >

      {/* Glass Card */}
      <div className="backdrop-blur-xl bg-white/40 shadow-2xl p-10 rounded-3xl w-full max-w-md border border-white/30 animate-fadeIn">

        {/* Header */}
        <h2 className="text-4xl font-extrabold text-center text-purple-600 mb-6 drop-shadow-lg">
          Create Account 🎀
        </h2>

        <p className="text-center text-gray-700 mb-6">
          Join the sweetest shopping experience!
        </p>

        {error && (
          <div className="bg-red-100 text-red-700 p-3 rounded-lg mb-4 text-center">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={submit} className="space-y-4">

          <input
            type="text"
            placeholder="Full Name"
            required
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full p-3 rounded-xl border focus:ring-2 focus:ring-purple-400 outline-none bg-white/70 shadow"
          />

          <input
            type="email"
            placeholder="Email Address"
            required
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full p-3 rounded-xl border focus:ring-2 focus:ring-purple-400 outline-none bg-white/70 shadow"
          />

          <input
            type="password"
            placeholder="Password"
            required
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            className="w-full p-3 rounded-xl border focus:ring-2 focus:ring-purple-400 outline-none bg-white/70 shadow"
          />

          {/* Role Dropdown */}
          <select
            onChange={(e) => setForm({ ...form, role: e.target.value })}
            className="w-full p-3 rounded-xl border bg-white/70 shadow focus:ring-2 focus:ring-purple-400"
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>

          {/* Button */}
          <button
            className="w-full py-3 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl shadow-lg transition-transform hover:scale-[1.02]"
          >
            Register
          </button>
        </form>

        <p className="text-center mt-5 text-gray-700">
          Already have an account?{" "}
          <Link to="/login" className="text-purple-600 font-semibold hover:underline">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
