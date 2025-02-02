import React from "react";
import { useLocation, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaTachometerAlt, FaCogs, FaClipboardList, FaUsers, FaPlusCircle, FaChartBar, FaComments } from "react-icons/fa"; // Importing icons from react-icons

const AdminSidebar = () => {
  const darkMode = useSelector((state) => state.darkMode.isDarkMode); // Get dark mode state
  const location = useLocation(); // Get current location

  // Updated menuItems with "All Mechanics" and "All Cars" added
  const menuItems = [
    { name: "Dashboard", path: "/admin/dashboard", icon: <FaTachometerAlt /> },
    { name: "All Services", path: "/admin/all-services", icon: <FaCogs /> },
    { name: "All Bookings", path: "/admin/all-bookings", icon: <FaClipboardList /> },
    { name: "All Users", path: "/admin/all-users", icon: <FaUsers /> },
    { name: "All Mechanics", path: "/admin/all-mechanics", icon: <FaUsers /> }, 
    { name: "All Cars", path: "/admin/all-cars", icon: <FaCogs /> }, 
    { name: "Add a Service", path: "/admin/add-service", icon: <FaPlusCircle /> },
    { name: "View Report", path: "/admin/view-report", icon: <FaChartBar /> },
    { name: "Response to Feedback", path: "/admin/feedback-response", icon: <FaComments /> },
   
  ];

  return (
    <aside className={`w-1/5 p-6 ${darkMode ? "bg-gray-800" : "bg-white"} shadow-lg`}>
      <h2 className="text-2xl font-bold mb-6">Admin Dashboard</h2>
      <ul className="space-y-4">
        {menuItems.map((item, index) => (
          <li
            key={index}
            className={`p-3 rounded-lg transition duration-300 flex items-center space-x-3 ${
              location.pathname === item.path
                ? darkMode
                  ? "bg-yellow-400 text-gray-900"
                  : "bg-yellow-300 text-gray-800"
                : "hover:bg-yellow-400 hover:text-gray-900"
            }`}
          >
            <span className="text-xl">{item.icon}</span> {/* Icon here */}
            <Link to={item.path} className="block">
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default AdminSidebar;
