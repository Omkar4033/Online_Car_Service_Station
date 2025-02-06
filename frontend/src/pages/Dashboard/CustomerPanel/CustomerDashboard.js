import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FaCar, FaWrench, FaCalendarCheck, FaHistory } from "react-icons/fa";

const CustomerDashboard = () => {
  const darkMode = useSelector((state) => state.darkMode.isDarkMode);
  const user=useSelector((state) => state.userData?.user)
  console.log(user);

  // Simulated customer data
  const [customerData, setCustomerData] = useState({
    name: user.name,
    email: user.email,
    phone: user.phoneNo,
    carModel: "Toyota Camry",
    licensePlate: "ABC-1234",
    carYear: "2021",
    carFuelType: "Petrol",
  });

  // Service Data (Upcoming & Recent)
  const upcomingServices = [
    { name: "Oil Change", date: "Feb 10, 2025" },
    { name: "Tire Rotation", date: "Feb 15, 2025" },
  ];
  const recentServices = [
    { name: "Battery Replacement", date: "Jan 20, 2025" },
    { name: "Engine Diagnostics", date: "Jan 25, 2025" },
  ];

  useEffect(() => {
    // Fetch customer data from API (if needed)
  }, []);

  return (
    <div className={`min-h-screen flex ${darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-100 text-gray-900"}`}>
      {/* Sidebar */}
      <aside className={`w-1/4 p-6 ${darkMode ? "bg-gray-800" : "bg-white"} shadow-lg`}>
        <h2 className="text-xl font-semibold mb-6">Welcome, {customerData.name}</h2>

        {/* Upcoming Services */}
        <Section title="Upcoming Services">
          {upcomingServices.length ? (
            upcomingServices.map((service, index) => (
              <p key={index} className="text-sm border-b pb-2">
                {service.name} - <span className="text-blue-500">{service.date}</span>
              </p>
            ))
          ) : (
            <p className="text-sm text-gray-400">No upcoming services</p>
          )}
        </Section>

        {/* Recent Services */}
        <Section title="Recent Services">
          {recentServices.length ? (
            recentServices.map((service, index) => (
              <p key={index} className="text-sm border-b pb-2">
                {service.name} - <span className="text-green-500">{service.date}</span>
              </p>
            ))
          ) : (
            <p className="text-sm text-gray-400">No recent services</p>
          )}
        </Section>

        {/* Quick Actions */}
        <div className="mt-6">
        
          <Link to="/schedule" className="block bg-yellow-500 hover:bg-yellow-400 text-white text-center py-2 rounded-md">
            Book a Service
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="w-3/4 p-8">
        <h1 className="text-3xl font-semibold mb-6">Customer Dashboard</h1>

        {/* Customer Information */}
        <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold border-b pb-4">Your Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 text-sm">
            <p><strong>Name:</strong> {customerData.name}</p>
            <p><strong>Email:</strong> {customerData.email}</p>
            <p><strong>Phone:</strong> {customerData.phone}</p>
          </div>
        </div>

        {/* Car Information */}
        <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold border-b pb-4">Car Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 text-sm">
            <p><strong>Model:</strong> {customerData.carModel}</p>
            <p><strong>Year:</strong> {customerData.carYear}</p>
            <p><strong>Fuel Type:</strong> {customerData.carFuelType}</p>
            <p><strong>License Plate:</strong> {customerData.licensePlate}</p>
          </div>
        </div>

        {/* Service Status */}
        <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold border-b pb-4">Service Status</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
            <ServiceCard
              icon={<FaWrench className="text-blue-500 text-2xl" />}
              title="Booked Services"
              count={upcomingServices.length}
            />
            <ServiceCard
              icon={<FaCalendarCheck className="text-green-500 text-2xl" />}
              title="Completed Services"
              count={recentServices.length}
            />
            <ServiceCard
              icon={<FaHistory className="text-yellow-500 text-2xl" />}
              title="Service History"
              count={recentServices.length + upcomingServices.length}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

// Reusable Section Component
const Section = ({ title, children }) => (
  <div className="mb-6">
    <h3 className="text-md font-semibold border-b pb-2">{title}</h3>
    <div className="mt-2">{children}</div>
  </div>
);

// Reusable Service Status Card
const ServiceCard = ({ icon, title, count }) => (
  <div className="p-4 rounded-lg shadow-sm border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 transition hover:shadow-md flex flex-col items-center">
    {icon}
    <h3 className="text-md font-medium mt-3">{title}</h3>
    <p className="text-xl font-bold text-blue-600 dark:text-blue-400 mt-2">{count}</p>
  </div>
);

export default CustomerDashboard;
