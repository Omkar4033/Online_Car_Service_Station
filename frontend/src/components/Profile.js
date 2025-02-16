import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUserAlt, FaUserTie, FaShoppingCart, FaRegBookmark, FaCog, FaTachometerAlt, FaSignOutAlt, FaCar } from "react-icons/fa";
import { useSelector } from "react-redux";

const Profile = ({ isLoggedIn, darkMode, handleLogout }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const user = useSelector((state) => state.userData?.user);
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  useEffect(() => {
    if (isDropdownOpen) {
      const timer = setTimeout(() => {
        setIsDropdownOpen(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [isDropdownOpen]);

  const logout = () => {
    handleLogout();
    setIsDropdownOpen(false);
    navigate("/");
  };


  return (
    <div className="relative">
      <button
        className="bg-gray-300 dark:bg-gray-600 text-yellow-600 px-3 py-1 rounded-3xl hover:bg-gray-300 dark:hover:bg-gray-600 transition duration-200 ease-in-out"
        onClick={toggleDropdown}
      >
        {isLoggedIn ? (
          user?.name ? (
            <div className="text-3xl font-bold">{user.name.toUpperCase().charAt(0)}</div>
          ) : (
            darkMode ? <FaUserTie className="text-2xl" /> : <FaUserAlt className="text-2xl" />
          )
        ) : (
          <span>Login / Register</span>
        )}
      </button>

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
                <li className="hover:bg-gray-200 dark:hover:bg-gray-600">
                  <button onClick={logout} className="flex items-center px-4 py-2 text-red-500">
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