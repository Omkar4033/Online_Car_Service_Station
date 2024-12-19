import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Profile from "../../../components/Profile"; // Import Profile component

const CustomerDashboard = () => {
  const darkMode = useSelector((state) => state.darkMode.isDarkMode);

  // Sample upcoming and recent services
  const upcomingServices = [
    "Oil Change",
    "Brake Fluid Replacement",
    "Tire Rotation",
  ];
  const recentServices = [
    "Battery Replacement",
    "Interior Cleaning",
    "Engine Diagnostics",
  ];

  // State for managing customer data
  const [customerData, setCustomerData] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    carModel: "Toyota Camry",
    licensePlate: "ABC1234",
  });

  useEffect(() => {
    // Here you can fetch customer data from an API or use static data
  }, []);

  return (
    <div
      className={`min-h-screen flex ${
        darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-100 text-gray-800"
      }`}
    >
      {/* Sidebar */}
      <aside className={`w-1/4 p-4 ${darkMode ? "bg-gray-800" : "bg-white"} shadow-lg`}>
        <div className="flex items-center justify-center border-dashed border-2 p-6 rounded-lg">
          <Profile isLoggedIn={true} darkMode={darkMode} />
        </div>
        <div className="mt-8">
          <h2 className="font-bold mb-4">Upcoming Services</h2>
          <ul className="space-y-2">
            {upcomingServices.map((service, index) => (
              <li key={index}>{service}</li>
            ))}
          </ul>
        </div>
        <div className="mt-8">
          <h2 className="font-bold mb-4">Recent Services</h2>
          <ul className="space-y-2">
            {recentServices.map((service, index) => (
              <li key={index}>{service}</li>
            ))}
          </ul>
        </div>
      </aside>

      {/* Main Content */}
      <main className="w-3/4 p-6">
        <h1 className="text-3xl font-semibold mb-6">Customer Dashboard</h1>
        <div className="mb-8">
          <h2 className="text-xl font-semibold">Your Information</h2>
          <div className="space-y-2">
            <p><strong>Name:</strong> {customerData.name}</p>
            <p><strong>Email:</strong> {customerData.email}</p>
            <p><strong>Car Model:</strong> {customerData.carModel}</p>
            <p><strong>License Plate:</strong> {customerData.licensePlate}</p>
          </div>
        </div>

        {/* Service Booking */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Book a Service</h2>
          <ul className="space-y-2">
            <li>
              <Link
                to="/services"
                className="bg-yellow-400 hover:bg-yellow-500 text-white py-2 px-4 rounded"
              >
                View Available Services
              </Link>
            </li>
            <li>
              <Link
                to="/schedule"
                className="bg-yellow-400 hover:bg-yellow-500 text-white py-2 px-4 rounded"
              >
                Schedule a Service
              </Link>
            </li>
          </ul>
        </div>
      </main>
    </div>
  );
};

export default CustomerDashboard;
