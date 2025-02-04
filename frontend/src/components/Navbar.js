import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toggleDarkMode } from "../redux/reducers/darkModeReducer"; // Redux action
import { MdLightMode, MdDarkMode } from "react-icons/md";
import Profile from "./Profile"; // Import Profile component
import { userLogout } from "../redux/actions/userActions"; // Import the user logout action

const Navbar = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const darkMode = useSelector((state) => state.darkMode.isDarkMode);

  // Get the user data from Redux state to check if the user is logged in
  const user = useSelector((state) => state.userData.user);

  // Retrieve the userRole from Redux state
  const userRole = user?.role;

  // Logout function
  const handleLogout = () => {
    dispatch(userLogout()); 
  };

  return (
    <nav className={`bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-100 shadow-lg`}>
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo Section */}
        <Link to="/" className="flex items-center space-x-2 text-xl font-bold hover:text-gray-200">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" className="text-3xl">
            <circle cx="50" cy="50" r="40" stroke="currentColor" fill="none" />
            <circle cx="50" cy="50" r="15" stroke="currentColor" fill="none" />
            <path d="M30 20 L40 30 L35 35 L20 40 L25 25 Z" stroke="currentColor" fill="none" />
            <path
              d="M50 10 L55 20 M70 20 L65 30 M80 50 L70 50 M65 70 L70 80 M50 90 L55 80 M30 70 L35 80 M20 50 L30 50 M35 30 L30 20"
              stroke="currentColor"
            />
          </svg>
          <span className="text-3xl mt-1 font-mono font-bold">Wheely</span>
        </Link>

        {/* Navigation Links */}
        <ul className="flex space-x-6  flex-grow justify-center">
          <li>
            <Link
              to="/"
              className={`hover:text-black dark:hover:text-gray-200 transition duration-200 ease-in-out transform hover:scale-110 hover:brightness-110 ${location.pathname === "/" ? "border-b-2 border-solid border-blue-400 font-semibold" : ""}`}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/services"
              className={`hover:text-black dark:hover:text-gray-200 transition duration-200 ease-in-out transform hover:scale-110 hover:brightness-110 ${location.pathname === "/services" ? "border-b-2 border-solid border-blue-400 font-semibold" : ""}`}
            >
              Services
            </Link>
          </li>
          {userRole === "CUSTOMER" && (
            <li>
              <Link
                to="/dashboard/customer"
                className={`hover:text-black dark:hover:text-gray-200 transition duration-200 ease-in-out transform hover:scale-110 hover:brightness-110 ${location.pathname === "/dashboard/customer" ? "border-b-2 border-solid border-blue-400 font-semibold" : ""}`}
              >
                Dashboard
              </Link>
            </li>
          )}
          {userRole === "ADMIN" && (
            <li>
              <Link
                to="/admin/dashboard"
                className={`hover:text-black dark:hover:text-gray-200 transition duration-200 ease-in-out transform hover:scale-110 hover:brightness-110 ${location.pathname === "/admin/dashboard" ? "border-b-2 border-solid border-blue-400 font-semibold" : ""}`}
              >
                Admin Dashboard
              </Link>
            </li>
          )}
          {userRole === "MECHANIC" && (
            <li>
              <Link
                to="/mechanic/dashboard"
                className={`hover:text-black dark:hover:text-gray-200 transition duration-200 ease-in-out transform hover:scale-110 hover:brightness-110 ${location.pathname === "/dashboard/mechanic" ? "border-b-2 border-solid border-blue-400 font-semibold" : ""}`}
              >
                Mechanic Dashboard
              </Link>
            </li>
          )}
          <li>
            <Link
              to="/about"
              className={`hover:text-black dark:hover:text-gray-200 transition duration-200 ease-in-out transform hover:scale-110 hover:brightness-110 ${location.pathname === "/about" ? "border-b-2 border-solid border-blue-400 font-semibold" : ""}`}
            >
              About Us
            </Link>
          </li>
          <li>
            <Link
              to="/contact"
              className={`hover:text-black dark:hover:text-gray-200 transition duration-200 ease-in-out transform hover:scale-110 hover:brightness-110 ${location.pathname === "/contact" ? "border-b-2 border-solid border-blue-400 font-semibold" : ""}`}
            >
              Contact Us
            </Link>
          </li>
        </ul>

        {/* Right Section */}
        <div className="flex space-x-4 items-center">
          {/* Dark Mode Toggle */}
          <button
            onClick={() => dispatch(toggleDarkMode())}
            className="px-3 py-1  transition duration-200 ease-in-out transform "
          >
            {darkMode ? (
              <MdLightMode className="h-8 w-8 " />
            ) : (
              <MdDarkMode className="h-8 w-8" />
            )}
          </button>

          {/* Profile / Login */}
          <Profile isLoggedIn={!!user} darkMode={darkMode} handleLogout={handleLogout} />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
