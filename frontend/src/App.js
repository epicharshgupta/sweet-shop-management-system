import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AdminOrders from "./pages/AdminOrders";

import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Sweets from "./pages/Sweets";
import AdminDashboard from "./pages/AdminDashboard";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MyOrders from "./pages/MyOrders";
import ProtectedRoute from "./components/ProtectedRoute";
function App() {
  return (
    <div className="min-h-screen flex flex-col">

      {/* NAVBAR */}
      <Navbar />
      <ToastContainer position="top-right" />

      {/* MAIN CONTENT (scrollable area) */}
      <div className="flex-grow pt-20">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/sweets" element={<Sweets />} />


          <Route
            path="/orders"
            element={
              <ProtectedRoute>
                <MyOrders />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin-orders"
            element={
              <ProtectedRoute adminOnly={true}>
                <AdminOrders />
              </ProtectedRoute>
            }
          />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </div>

      {/* FOOTER */}
      <Footer />

    </div>
  );
}

export default App;
