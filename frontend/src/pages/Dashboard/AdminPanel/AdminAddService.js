import React, { useState } from "react";
import { useSelector } from "react-redux";
import Sidebar from "./AdminSidebar"; // Adjust the import path as needed

const AdminAddService = () => {
  const darkMode = useSelector((state) => state.darkMode.isDarkMode);

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    description: "",
    price: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted: ", formData);
    // Add your submission logic here
  };

  const menuItems = [
    { name: "Dashboard", path: "/admin/dashboard" },
    { name: "All Services", path: "/admin/all-services" },
    { name: "All Bookings", path: "/admin/all-bookings" },
    { name: "All Users", path: "/admin/all-users" },
    { name: "Add a Service", path: "/admin/add-service" },
    { name: "View Report", path: "/admin/view-report" },
    { name: "Response to Feedback", path: "/admin/feedback-response" },
  ];

  return (
    <div
      className={`min-h-screen flex ${
        darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-100 text-gray-800"
      }`}
    >
      <Sidebar menuItems={menuItems} />

      <main className="flex-1 p-6 space-y-8">
        <section className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold mb-6">Add a Service</h2>

          <form
            onSubmit={handleSubmit}
            className={`p-6 rounded-lg shadow-lg space-y-4 ${
              darkMode ? "bg-gray-800 text-gray-100" : "bg-white text-gray-800"
            }`}
          >
            <div>
              <label htmlFor="name" className="block font-medium mb-1">
                Enter Service Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full p-2 rounded border border-gray-300"
              />
            </div>

            <div>
              <label htmlFor="category" className="block font-medium mb-1">
                Enter Service Category
              </label>
              <input
                type="text"
                id="category"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="w-full p-2 rounded border border-gray-300"
              />
            </div>

            <div>
              <label htmlFor="description" className="block font-medium mb-1">
                Enter Service Description
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                className="w-full p-2 rounded border border-gray-300"
              />
            </div>

            <div>
              <label htmlFor="price" className="block font-medium mb-1">
                Enter Price
              </label>
              <input
                type="number"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                className="w-full p-2 rounded border border-gray-300"
              />
            </div>

            <button
              type="submit"
              className={`w-full py-2 rounded-lg text-white font-semibold ${
                darkMode ? "bg-blue-600 hover:bg-blue-500" : "bg-blue-500 hover:bg-blue-400"
              }`}
            >
              Add Service
            </button>
          </form>
        </section>
      </main>
    </div>
  );
};

export default AdminAddService;