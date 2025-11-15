import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { token, user, logout } = useAuth();

  return (
    <nav className="bg-white shadow-md fixed top-0 left-0 w-full z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between py-4 px-6">

        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-pink-600">
          🍬 SweetShop
        </Link>

        {/* Center Links */}
        <div className="hidden md:flex gap-6 text-lg">
          <Link to="/" className="hover:text-pink-600">Home</Link>
          <Link to="/about" className="hover:text-pink-600">About</Link>
          <Link to="/contact" className="hover:text-pink-600">Contact</Link>
          <Link to="/sweets" className="hover:text-ppink-600">Sweets</Link>

          {/* ⭐ User → My Orders */}
          {token && user?.role === "user" && (
            <Link to="/orders" className="hover:text-pink-600">
              My Orders
            </Link>
          )}

          {/* ⭐ Admin → All Orders */}
          {token && user?.role === "admin" && (
            <Link to="/admin-orders" className="hover:text-pink-600">
              Orders
            </Link>
          )}
        </div>

        {/* Right Side Buttons */}
        <div className="flex gap-4">

          {/* Not logged in */}
          {!token && (
            <Link
              to="/login"
              className="px-4 py-2 bg-pink-600 text-white rounded-lg"
            >
              Login
            </Link>
          )}

          {/* Logged in */}
          {token && (
            <>
              {/* Admin Panel Button */}
              {user?.role === "admin" && (
                <Link
                  to="/admin"
                  className="px-4 py-2 bg-yellow-500 text-white rounded-lg"
                >
                  Admin
                </Link>
              )}

              {/* Logout Button */}
              <button
                onClick={logout}
                className="px-4 py-2 bg-red-500 text-white rounded-lg"
              >
                Logout
              </button>
            </>
          )}

        </div>
      </div>
    </nav>
  );
};

export default Navbar;
