import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { API_URL } from "../config";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  // Disable scroll on login page
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
      const res = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.status === 200) {
        login(data.token, data.user);
        navigate("/dashboard");
      } else {
        setError(data.message || "Invalid credentials");
      }
    } catch {
      setError("Server error. Please try again.");
    }
  };

  return (
    <div className="
      flex items-start justify-center
  h-[calc(100vh-60px)]
  pt-10
  bg-gradient-to-br from-pink-100 via-white to-pink-200
  px-4
  overflow-hidden
    ">

      {/* Card */}
      <div className="backdrop-blur-xl bg-white/40 shadow-2xl p-10 rounded-3xl w-full max-w-md border border-white/30 animate-fadeIn">

        {/* Title */}
        <h2 className="text-4xl font-extrabold text-center text-pink-600 mb-6 drop-shadow-lg">
          Welcome Back 🍬
        </h2>

        <p className="text-center text-gray-700 mb-6">
          Login to continue your sweet journey
        </p>

        {error && (
          <div className="bg-red-100 text-red-700 p-3 rounded-lg mb-3 text-center">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={submit} className="space-y-4">

          <input
            type="email"
            placeholder="Email Address"
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full p-3 rounded-xl border focus:ring-2 focus:ring-pink-400 outline-none bg-white/70 shadow"
            required
          />

          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            className="w-full p-3 rounded-xl border focus:ring-2 focus:ring-pink-400 outline-none bg-white/70 shadow"
            required
          />

          <button
            className="w-full bg-pink-600 hover:bg-pink-700 text-white font-bold py-3 rounded-xl shadow-lg transition-transform hover:scale-[1.02]"
          >
            Login
          </button>
        </form>

        <p className="text-center mt-5 text-gray-700">
          New user?{" "}
          <Link to="/register" className="text-pink-600 font-semibold hover:underline">
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
