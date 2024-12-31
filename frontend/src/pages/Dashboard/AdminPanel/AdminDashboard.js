import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Sidebar from "./AdminSidebar"; // Adjust the import path as needed
import Loader from "../../../components/Loader";

const AdminDashboard = () => {
  const darkMode = useSelector((state) => state.darkMode.isDarkMode);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate a loading delay
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

 
  const bookingStatus = [
    { title: "Total Bookings", value: 120 },
    { title: "Pending Bookings", value: 30 },
    { title: "Assigned Bookings", value: 70 },
    { title: "Total Amount", value: "$15,000" },
  ];

  const recentBookings = [
    ["John Doe", "Oil Change", "Completed"],
    ["Jane Smith", "Tire Rotation", "Pending"],
    ["Mike Johnson", "Brake Inspection", "Assigned"],
    ["Emily Davis", "Battery Replacement", "Completed"],
  ];

  return (
    <div
      className={`min-h-screen flex ${
        darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-100 text-gray-800"
      }`}
    >
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 p-6 space-y-8">
        {/* Booking Status */}
        <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {bookingStatus.map((status, index) => (
            <div
              key={index}
              className={`p-6 rounded-lg shadow-md flex flex-col items-center ${
                darkMode ? "bg-gray-800" : "bg-white"
              }`}
            >
              <h2
                className={`text-lg font-semibold ${
                  darkMode ? "text-yellow-400" : "text-blue-600"
                }`}
              >
                {status.title}
              </h2>
              <p className="text-2xl font-bold mt-2">{status.value}</p>
            </div>
          ))}
        </section>

        {/* Recent Bookings */}
        <section>
          <h2 className="text-2xl font-bold mb-4">Recent Bookings</h2>
          <table
            className={`w-full text-left border-collapse ${
              darkMode ? "text-gray-300" : "text-gray-800"
            }`}
          >
            <thead>
              <tr
                className={`${
                  darkMode ? "bg-gray-700" : "bg-gray-200"
                } text-sm font-semibold`}
              >
                <th className="p-3">Customer Name</th>
                <th className="p-3">Service</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {recentBookings.map((booking, index) => (
                <tr
                  key={index}
                  className={`${
                    darkMode
                      ? index % 2 === 0
                        ? "bg-gray-800"
                        : "bg-gray-700"
                      : index % 2 === 0
                      ? "bg-white"
                      : "bg-gray-100"
                  }`}
                >
                  {booking.map((data, idx) => (
                    <td key={idx} className="p-3">
                      {typeof data === "object" ? JSON.stringify(data) : data}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </main>
    </div>
  );
};

export default AdminDashboard;
