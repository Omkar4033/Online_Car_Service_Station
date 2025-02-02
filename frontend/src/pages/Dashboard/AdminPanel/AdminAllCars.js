import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Sidebar from "./AdminSidebar";
import Loader from "../../../components/Loader";
import Pagination from "../../../components/Pagination"; // Import the pagination component

const AdminAllCars = () => {
  const darkMode = useSelector((state) => state.darkMode.isDarkMode);
  const userId = useSelector((state) => state.userData?.user.userId); // Get user ID from Redux state
  const [loading, setLoading] = useState(true);
  const [cars, setCars] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const carsPerPage = 8; // Number of items per page

  useEffect(() => {
    if (!userId) return; // Prevent fetching if userId is not available

    const fetchCars = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/admin/cars/${userId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch cars");
        }
        const data = await response.json();
        setCars(data);
      } catch (error) {
        console.error("Error fetching cars:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, [userId]);

  // Pagination logic
  const totalPages = Math.ceil(cars.length / carsPerPage);
  const indexOfLastCar = currentPage * carsPerPage;
  const indexOfFirstCar = indexOfLastCar - carsPerPage;
  const currentCars = cars.slice(indexOfFirstCar, indexOfLastCar);

  return (
    <div className={`min-h-screen flex ${darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-100 text-gray-800"}`}>
      <Sidebar />
      <main className="flex-1 p-6 space-y-8">
        <section>
          <h2 className="text-2xl font-bold mb-4">All Cars</h2>
          <table className={`w-full text-left border-collapse ${darkMode ? "text-gray-300" : "text-gray-800"}`}>
            <thead>
              <tr className={`${darkMode ? "bg-gray-700" : "bg-gray-200"} text-sm font-semibold`}>
                <th className="p-3">Car Company</th>
                <th className="p-3">Car Id</th>
                <th className="p-3">Model</th>
                <th className="p-3">Fuel Type</th>
                <th className="p-3">Registration</th>
              </tr>
            </thead>
            {loading ? (
              <Loader />
            ) : (
              <tbody>
                {currentCars.map((car, index) => (
                  <tr key={car.id} className={`${darkMode ? (index % 2 === 0 ? "bg-gray-800" : "bg-gray-700") : (index % 2 === 0 ? "bg-white" : "bg-gray-100")}`}>
                    <td className="p-3">{car.company}</td>
                    <td className="p-3">{car.carId}</td>
                    <td className="p-3">{car.model}</td>
                    <td className="p-3">{car.fuelType}</td>
                    <td className="p-3">{car.registration}</td>
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

export default AdminAllCars;
