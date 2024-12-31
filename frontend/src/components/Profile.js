import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUserAlt, FaUserTie, FaShoppingCart, FaRegBookmark, FaCog, FaTachometerAlt, FaSignOutAlt, FaCar } from "react-icons/fa";

const Profile = ({ isLoggedIn, darkMode, handleLogout }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate(); // Use navigate to redirect after logout

  // Toggle the dropdown menu
  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  // Close the dropdown after 5 seconds if it was opened
  useEffect(() => {
    if (isDropdownOpen) {
      const timer = setTimeout(() => {
        setIsDropdownOpen(false); // Close the dropdown after 5 seconds
      }, 5000);

      return () => clearTimeout(timer); // Clear timeout if the dropdown is closed before 5 seconds
    }
  }, [isDropdownOpen]);

  // Handle logout
  const logout = () => {
    handleLogout(); // Call the passed handleLogout function (e.g., Redux action or state update)
    setIsDropdownOpen(false); // Close dropdown
    navigate("/"); // Redirect to the homepage or login page after logout
  };

  return (
    <div className="relative">
      <button
        className="bg-gray-200 dark:bg-gray-700 text-blue-600 px-3 py-1 rounded hover:bg-gray-300 dark:hover:bg-gray-600 transition duration-200 ease-in-out"
        onClick={toggleDropdown}
      >
        {isLoggedIn ? (
          darkMode ? (
            <FaUserTie className="text-2xl" /> // User icon for dark mode
          ) : (
            <FaUserAlt className="text-2xl" /> // User icon for light mode
          )
        ) : (
          <span>Login / Register</span>
        )}
      </button>

      {/* Dropdown menu */}
      {isDropdownOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg shadow-lg z-50">
          <ul className="text-gray-800 dark:text-gray-100">
            {isLoggedIn ? (
              <>
                <li className="hover:bg-gray-200 dark:hover:bg-gray-600">
                  <Link to="/user/dashboard" className="flex items-center px-4 py-2">
                    <FaTachometerAlt className="mr-2" /> Dashboard
                  </Link>
                </li>
                <li className="hover:bg-gray-200 dark:hover:bg-gray-600">
                  <Link to="/user/cart" className="flex items-center px-4 py-2">
                    <FaShoppingCart className="mr-2" /> Cart
                  </Link>
                </li>
                <li className="hover:bg-gray-200 dark:hover:bg-gray-600">
                  <Link to="/user/bookings" className="flex items-center px-4 py-2">
                    <FaRegBookmark className="mr-2" /> Bookings
                  </Link>
                </li>

                {/* New "My Cars" Dropdown Item */}
                <li className="hover:bg-gray-200 dark:hover:bg-gray-600">
                  <Link to="/user/my-cars" className="flex items-center px-4 py-2">
                    <FaCar className="mr-2" /> My Cars
                  </Link>
                </li>
                
                <li className="hover:bg-gray-200 dark:hover:bg-gray-600">
                  <Link to="/user/settings" className="flex items-center px-4 py-2">
                    <FaCog className="mr-2" /> Settings
                  </Link>
                </li>

                {/* Logout option with FaSignOutAlt icon */}
                <li className="hover:bg-gray-200 dark:hover:bg-gray-600">
                  <button
                    onClick={logout} // Call the logout function
                    className="flex items-center px-4 py-2 text-red-500"
                  >
                    <FaSignOutAlt className="mr-2" /> Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="hover:bg-gray-200 dark:hover:bg-gray-600">
                  <Link to="/login" className="flex items-center px-4 py-2">
                    <FaUserAlt className="mr-2" /> Login
                  </Link>
                </li>
                <li className="hover:bg-gray-200 dark:hover:bg-gray-600">
                  <Link to="/register" className="flex items-center px-4 py-2">
                    <FaUserTie className="mr-2" /> Register
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Profile;
