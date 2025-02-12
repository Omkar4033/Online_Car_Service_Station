import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import AdminSidebar from "./AdminSidebar";

const AdminUpdateService = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const darkMode = useSelector((state) => state.darkMode.isDarkMode);

  const [formData, setFormData] = useState({
    name: "",
    categoryId: "",
    description: "",
    price: "",
  });

  const [categories, setCategories] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/categories");
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    const fetchServiceDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/services/${id}`);
        setFormData(response.data);
      } catch (error) {
        console.error("Error fetching service details:", error);
      }
    };

    fetchCategories();
    fetchServiceDetails();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage("");

    try {
      await axios.put(`http://localhost:8080/api/admin/services/update/${id}`, formData, {
        headers: { "Content-Type": "application/json" },
      });

      setMessage("Service updated successfully!");
      setTimeout(() => navigate("/admin/all-services"), 1500);
    } catch (error) {
      console.error("Error updating service:", error);
      setMessage("Error updating service.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={`min-h-screen flex ${darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-100 text-gray-800"}`}>
      <AdminSidebar />

      <main className="flex-1 p-6 space-y-8">
        <section className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold mb-6">Update Service</h2>

          <button
            onClick={() => navigate(-1)}
            className="mb-4 py-2 px-4 rounded-lg bg-gray-500 text-white font-semibold hover:bg-gray-600 transition-all"
          >
            Back
          </button>

          {message && (
            <div className={`p-3 rounded ${message.includes("success") ? "bg-green-500" : "bg-red-500"} text-white`}>
              {message}
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            className={`p-6 rounded-lg shadow-lg space-y-6 ${darkMode ? "bg-gray-800 text-gray-100" : "bg-white text-gray-800"}`}
          >
            <div>
              <label className="block font-medium mb-1">Service Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="w-full p-3 rounded-lg border border-gray-400 text-lg focus:ring-2 focus:ring-blue-500 focus:outline-none bg-gray-50 text-gray-900"
              />
            </div>

            <div>
              <label className="block font-medium mb-1">Category</label>
              <select
                name="categoryId"
                value={formData.categoryId}
                onChange={handleInputChange}
                required
                className="w-full p-3 rounded-lg border border-gray-400 text-lg focus:ring-2 focus:ring-blue-500 focus:outline-none bg-gray-50 text-gray-900"
              >
                <option value="">Select a Category</option>
                {categories.map((category) => (
                  <option key={category.categoryId} value={category.categoryId}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-medium mb-1">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                required
                className="w-full p-3 rounded-lg border border-gray-400 text-lg focus:ring-2 focus:ring-blue-500 focus:outline-none bg-gray-50 text-gray-900"
              />
            </div>

            <div>
              <label className="block font-medium mb-1">Price</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                required
                className="w-full p-3 rounded-lg border border-gray-400 text-lg focus:ring-2 focus:ring-blue-500 focus:outline-none bg-gray-50 text-gray-900"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 rounded-lg bg-blue-500 text-white font-semibold text-lg hover:bg-blue-600 disabled:bg-blue-300 transition-all"
            >
              {isSubmitting ? "Updating..." : "Update Service"}
            </button>
          </form>
        </section>
      </main>
    </div>
  );
};

export default AdminUpdateService;
