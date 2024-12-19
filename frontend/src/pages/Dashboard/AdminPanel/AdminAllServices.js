import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Sidebar from "./AdminSidebar"; // Adjust the import path as needed
import Loader from "../../../components/Loader";

const AdminAllService = () => {
  const darkMode = useSelector((state) => state.darkMode.isDarkMode);
  const initialServices = [
    { id: 1, name: "Oil Change", description: "Complete oil change service", price: "$50", status: "Available", icon: "fas fa-oil-can" },
    { id: 2, name: "Tire Rotation", description: "Tire rotation for vehicle safety", price: "$30", status: "Unavailable", icon: "fas fa-sync-alt" },
    { id: 3, name: "Brake Inspection", description: "Comprehensive brake inspection", price: "$40", status: "Available", icon: "fas fa-car-crash" },
    { id: 4, name: "Battery Replacement", description: "Replacement of car battery", price: "$80", status: "Available", icon: "fas fa-battery-full" },
  ];

  const [loading, setLoading] = useState(true);
  const [services, setServices] = useState(initialServices);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  const handleEditService = (id) => {
    const updatedServices = services.map((service) =>
      service.id === id
        ? { ...service, name: "Updated Service", price: "$120" }
        : service
    );
    setServices(updatedServices);
  };

  const handleDeleteService = (id) => {
    const filteredServices = services.filter((service) => service.id !== id);
    setServices(filteredServices);
  };

  if (loading) {
    return <Loader />;
  }

 

  return (
    <div
      className={`min-h-screen flex ${
        darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-100 text-gray-800"
      }`}
    >
      <Sidebar />

      <main className="flex-1 p-6 space-y-8">
        <section>
          <h2 className="text-2xl font-bold mb-4">All Services</h2>
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
                <th className="p-3">Service Name</th>
                <th className="p-3">Description</th>
                <th className="p-3">Price</th>
                <th className="p-3">Status</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {services.map((service, index) => (
                <tr
                  key={service.id}
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
                  <td className="p-3 flex items-center">
                    <i className={`${service.icon} mr-2`}></i> {/* Dynamic icon */}
                    {service.name}
                  </td>
                  <td className="p-3">{service.description}</td>
                  <td className="p-3">{service.price}</td>
                  <td className="p-3">{service.status}</td>
                  <td className="p-3 space-x-2">
                    <button
                      onClick={() => handleEditService(service.id)}
                      className={`px-2 py-1 rounded-xl shadow-lg transition-all duration-300 ${
                        darkMode
                          ? "bg-blue-500 text-white hover:bg-blue-400 hover:scale-105"
                          : "bg-blue-400 text-white hover:bg-blue-300 hover:scale-105"
                      }`}
                    >
                      <i className="fas fa-edit"></i> {/* Edit Icon Only */}
                    </button>
                    <button
                      onClick={() => handleDeleteService(service.id)}
                      className={`px-2 py-1 rounded-full transition-all duration-300 ${
                        darkMode
                          ? "bg-red-600 text-white hover:bg-red-500 hover:scale-105"
                          : "bg-red-500 text-white hover:bg-red-400 hover:scale-105"
                      }`}
                    >
                      <i className="fas fa-trash"></i> {/* Delete Icon Only */}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </main>
    </div>
  );
};

export default AdminAllService;
