import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import AdminSidebar from "./AdminSidebar";

const AdminAddService = () => {
  const darkMode = useSelector((state) => state.darkMode.isDarkMode);

  const [formData, setFormData] = useState({
    name: "",
    categoryId: "",
    description: "",
    price: "",
  });

  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  // Fetch categories function
  const fetchCategories = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get("http://localhost:8080/api/categories");
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch categories on component mount
  useEffect(() => {
    fetchCategories();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage("");

    // Validate category selection
    if (!formData.categoryId) {
      setMessage("Please select a category.");
      setIsSubmitting(false);
      return;
    }

    const serviceData = {
      name: formData.name,
      description: formData.description,
      price: parseFloat(formData.price),
      categoryId: formData.categoryId, // Fix: Corrected category structure
    };
    console.log(serviceData);

    try {

      await axios.post("http://localhost:8080/api/admin/services/add", serviceData, {
        headers: { "Content-Type": "application/json" },
      });

      setMessage("Added the service.");
      setFormData({ name: "", categoryId: "", description: "", price: "" }); // Reset form

    } catch (error) {
      console.error("Error adding service:", error);
      setMessage("Error occurred while adding the service.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={`min-h-screen flex ${darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-100 text-gray-800"}`}>
      <AdminSidebar />

      <main className="flex-1 p-6 space-y-8">
        <section className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold mb-6">Add a Service</h2>

          {message && (
            <div className={`p-3 rounded ${message.includes("Added") ? "bg-green-500" : "bg-red-500"} text-white`}>
              {message}
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            className={`p-6 rounded-lg shadow-lg space-y-4 ${darkMode ? "bg-gray-800 text-gray-100" : "bg-white text-gray-800"}`}
          >
            <div>
              <label htmlFor="name" className="block font-medium mb-1">Enter Service Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className={`w-full p-3 rounded border ${darkMode ? "bg-gray-700 text-gray-100 border-gray-600 focus:ring-blue-500" : "bg-white text-gray-800 border-gray-300 focus:ring-blue-500"}`}
                placeholder="Enter Service Name"
              />
            </div>

            {/* Dropdown for Category */}
            <div>
              <label htmlFor="categoryId" className="block font-medium mb-1">Select Service Category</label>
              <select
                id="categoryId"
                name="categoryId"
                value={formData.categoryId}
                onChange={handleInputChange}
                required
                className={`w-full p-3 rounded border ${darkMode ? "bg-gray-700 text-gray-100 border-gray-600 focus:ring-blue-500" : "bg-white text-gray-800 border-gray-300 focus:ring-blue-500"}`}
              >
                <option value="">Select a Category</option>
                {categories.length > 0 ? (
                  categories.map((category) => (
                    <option key={category.categoryId} value={category.categoryId}>
                      {category.name}
                    </option>
                  ))
                ) : (
                  <option disabled>Loading categories...</option>
                )}
              </select>
            </div>

            <div>
              <label htmlFor="description" className="block font-medium mb-1">Enter Service Description</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                required
                className={`w-full p-3 rounded border ${darkMode ? "bg-gray-700 text-gray-100 border-gray-600 focus:ring-blue-500" : "bg-white text-gray-800 border-gray-300 focus:ring-blue-500"}`}
                placeholder="Enter Service Description"
              />
            </div>

            <div>
              <label htmlFor="price" className="block font-medium mb-1">Enter Price</label>
              <input
                type="number"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                required
                min="0"
                step="0.01"
                className={`w-full p-3 rounded border ${darkMode ? "bg-gray-700 text-gray-100 border-gray-600 focus:ring-blue-500" : "bg-white text-gray-800 border-gray-300 focus:ring-blue-500"}`}
                placeholder="Enter Price"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-2 rounded-lg text-white font-semibold ${darkMode ? "bg-blue-600 hover:bg-blue-500" : "bg-blue-500 hover:bg-blue-400"} ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              {isSubmitting ? "Adding..." : "Add Service"}
            </button>
          </form>
        </section>
      </main>
    </div>
  );
};

export default AdminAddService;
