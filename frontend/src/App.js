import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import Navbar from "./components/Navbar";
import AppRoutes from "./routes/AppRoutes";
import Footer from "./components/Footer";
import { useNavigate, useLocation } from "react-router-dom";

const App = () => {
  // Access user data from Redux state
  const user = useSelector((state) => state.userData?.user); // Assuming user data is stored in `state.user.data`

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Redirect to login page if user is not logged in and is not on /login or /register page
    if (!user && !['/login', '/register'].includes(location.pathname)) {
      navigate("/login");
    }
  }, [user, navigate, location.pathname]);

  return (
    <div className="bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-100 min-h-screen">
      {/* Pass dynamic data to Navbar */}
      <Navbar />

      {/* Main Routes */}
      <div className="container mx-auto px-4 py-6">
        <AppRoutes />
      </div>

      <Footer />
    </div>
  );
};

export default App;
