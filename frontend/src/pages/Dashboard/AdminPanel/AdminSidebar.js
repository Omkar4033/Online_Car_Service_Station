import React from "react";
import { useLocation, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaTachometerAlt, FaCogs, FaClipboardList, FaUsers, FaPlusCircle, FaChartBar, FaComments } from "react-icons/fa"; 

const AdminSidebar = () => {
  const darkMode = useSelector((state) => state.darkMode.isDarkMode);
  const location = useLocation();

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
    <aside className={`w-1/5 h-screen p-6 shadow-lg ${darkMode ? "bg-gray-800 text-gray-100" : "bg-white text-gray-800"}`}>
      <h2 className="text-2xl font-bold mb-6">Admin Dashboard</h2>
      <hr />
      
      {/* Scrollable menu list */}
      <ul className="space-y-4 mt-2 overflow-y-auto max-h-[85vh] scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-300">
        {menuItems.map((item, index) => (
          <li
            key={index}
            className={`p-3 rounded-lg transition duration-300 flex items-center space-x-2 ${
              location.pathname === item.path
                ? darkMode
                  ? "bg-yellow-400 text-gray-900"
                  : "bg-yellow-300 text-gray-800"
                : "hover:bg-gray-400 hover:text-gray-900"
            }`}
          >
            <span className="text-xl">{item.icon}</span>
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
