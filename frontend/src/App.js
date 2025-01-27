import React, { useEffect, useState } from "react";

import { useSelector } from "react-redux"; 
import Navbar from "./components/Navbar";
import AppRoutes from "./routes/AppRoutes";
import Footer from "./components/Footer";
import { Navigate, useNavigate } from "react-router-dom";

const App = () => {
  // Access user data from Redux state
  const user = useSelector((state) => state.auth?.user); // Assuming user data is stored in `state.user.data`

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState("customer");


  const navigate=useNavigate();
  useEffect(() => {
    if (user) {
      setUserRole(user.user.userRole);
      console.log("userRole is" +user.user.role);
      setIsLoggedIn(true);
    } else {
      setUserRole("customer");
      setIsLoggedIn(false);
      navigate("/login");
    }
  }, [user]);

  return (
    <div className="bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-100 min-h-screen">
      {/* Pass dynamic data to Navbar */}
      <Navbar  isLoggedIn={isLoggedIn} />

      {/* Main Routes */}
      <div className="container mx-auto px-4 py-6">
        <AppRoutes />
      </div>

      <Footer />
    </div>
  );
};

export default App;
