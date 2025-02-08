import React from "react";
import { useLocation, Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaTachometerAlt, FaCogs, FaClipboardList, FaWrench, FaComments, FaCheckCircle } from "react-icons/fa";

const MechanicSidebar = () => {
  const darkMode = useSelector((state) => state.darkMode.isDarkMode);
  const location = useLocation();
  const { bookingId } = useParams(); 
  console.log(bookingId);

  const menuItems = [
    { name: "Dashboard", path: "/mechanic/dashboard", icon: <FaTachometerAlt /> },
    { name: "Pending Jobs", path: "/mechanic/pending-jobs", icon: <FaClipboardList /> },
    { name: "Accepted Jobs", path: "/mechanic/accepted-jobs", icon: <FaCheckCircle /> },
    { name: "Job History", path: "/mechanic/job-history", icon: <FaCogs /> },
    {
      name: "Complete Job",
      path: bookingId ? `/mechanic/complete-job/${bookingId}` : "/mechanic/complete-job",
      icon: <FaWrench />,
    },
    { name: "Feedback", path: "/mechanic/feedback", icon: <FaComments /> },
  ];

  return (
    <aside className={`w-1/5 p-6 ${darkMode ? "bg-gray-800" : "bg-white"} shadow-lg`}>
      <h2 className="text-2xl font-bold mb-6">Mechanic Dashboard</h2>
      <hr />
      <ul className="space-y-4 mt-4">
        {menuItems.map((item, index) => (
          <li
            key={index}
            className={`p-3 rounded-lg transition duration-300 flex items-center space-x-3 ${
              location.pathname.includes(item.path)
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

export default MechanicSidebar;
