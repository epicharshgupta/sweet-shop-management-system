import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { token, user } = useAuth();

  // ❌ If not logged in → go to login
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // ❌ If route is admin-only but user is NOT admin → redirect to dashboard
  if (adminOnly && user?.role !== "admin") {
    return <Navigate to="/dashboard" replace />;
  }

  // ✅ Authorized → show component
  return children;
};

export default ProtectedRoute;
