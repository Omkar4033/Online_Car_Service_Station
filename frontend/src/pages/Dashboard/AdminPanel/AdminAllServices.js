import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Sidebar from "./AdminSidebar";
import Loader from "../../../components/Loader";
import Pagination from "../../../components/Pagination"; // Import the pagination component

const AdminAllService = () => {
  const darkMode = useSelector((state) => state.darkMode.isDarkMode);
  const [loading, setLoading] = useState(true);
  const [services, setServices] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const servicesPerPage = 8; // Number of items per page

  // Fetch services from backend
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/services");
        if (!response.ok) {
          throw new Error("Failed to fetch services");
        }
        const data = await response.json();
        setServices(data);
        console.log(services);
      } catch (error) {
        console.error("Error fetching services:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  const handleEditService = async (id) => {
    const updatedServices = services.map((service) =>
      service.id === id ? { ...service, name: "Updated Service", price: "$120" } : service
    );
    setServices(updatedServices);
  };

  const handleDeleteService = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/api/services/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete service");
      }
      setServices(services.filter((service) => service.id !== id));
    } catch (error) {
      console.error("Error deleting service:", error);
    }
  };

  // Calculate total pages
  const totalPages = Math.ceil(services.length / servicesPerPage);

  // Get current services for the page
  const indexOfLastService = currentPage * servicesPerPage;
  const indexOfFirstService = indexOfLastService - servicesPerPage;
  const currentServices = services.slice(indexOfFirstService, indexOfLastService);

  return (
    <div className={`min-h-screen flex ${darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-100 text-gray-800"}`}>
      <Sidebar />
      <main className="flex-1 p-6 space-y-8">
        <section>
          <h2 className="text-2xl font-bold mb-4">All Services</h2>
          <table className={`w-full text-left border-collapse ${darkMode ? "text-gray-300" : "text-gray-800"}`}>
            <thead>
              <tr className={`${darkMode ? "bg-gray-700" : "bg-gray-200"} text-sm font-semibold`}>
                <th className="p-3">Service Name</th>
                <th className="p-3">Description</th>
                <th className="p-3">Price</th>
                <th className="p-3">Category</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            {loading ? (
              <Loader />
            ) : (
              <tbody>
                {currentServices.map((service, index) => (
                  <tr key={index} className={`${darkMode ? (index % 2 === 0 ? "bg-gray-800" : "bg-gray-700") : (index % 2 === 0 ? "bg-white" : "bg-gray-100")}`}>
                    <td className="p-3 flex items-center">
                      <i className={`fas fa-cog mr-2`}></i>
                      {service.name}
                    </td>
                    <td className="p-3">{service.description}</td>
                    <td className="p-3">₹{service.price}</td>
                    <td className="p-3">{service.category.name}</td>
                    <td className="p-3 space-x-2">
                      <button onClick={() => handleEditService(service.id)} className={`px-2 py-1 rounded-xl shadow-lg transition-all duration-300 ${darkMode ? "bg-blue-500 text-white" : "bg-blue-400 text-white"}`}>
                        <i className="fas fa-edit"></i>
                      </button>
                      <button onClick={() => handleDeleteService(service.id)} className={`px-2 py-1 rounded-full transition-all duration-300 ${darkMode ? "bg-red-600 text-white" : "bg-red-500 text-white"}`}>
                        <i className="fas fa-trash"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            )}
          </table>

          {/* Pagination Component */}
          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
        </section>
      </main>
    </div>
  );
};

export default AdminAllService;
