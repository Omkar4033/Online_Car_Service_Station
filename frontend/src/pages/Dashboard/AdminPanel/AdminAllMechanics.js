import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Sidebar from "./AdminSidebar";
import Loader from "../../../components/Loader";
import Pagination from "../../../components/Pagination";

const AdminAllMechanics = () => {
  const darkMode = useSelector((state) => state.darkMode.isDarkMode);

  const [loading, setLoading] = useState(true);
  const [mechanics, setMechanics] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [mechanicsPerPage] = useState(5);

  useEffect(() => {
    const fetchMechanics = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/admin/users");
        if (!response.ok) {
          throw new Error("Failed to fetch mechanics");
        }
        const data = await response.json();
        console.log(data);
        const filteredMechanics = data.filter(user => user.role === "MECHANIC");
        setMechanics(filteredMechanics);
      } catch (error) {
        console.error("Error fetching mechanics:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMechanics();
  }, []);

  const handleEditMechanic = (id) => {
    const updatedMechanics = mechanics.map((mechanic) =>
      mechanic.id === id ? { ...mechanic, name: "Updated Mechanic", status: "Inactive" } : mechanic
    );
    setMechanics(updatedMechanics);
  };

  const handleDeleteMechanic = (id) => {
    const filteredMechanics = mechanics.filter((mechanic) => mechanic.id !== id);
    setMechanics(filteredMechanics);
  };

  const indexOfLastMechanic = currentPage * mechanicsPerPage;
  const indexOfFirstMechanic = indexOfLastMechanic - mechanicsPerPage;
  const currentMechanics = mechanics.slice(indexOfFirstMechanic, indexOfLastMechanic);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className={`min-h-screen flex ${darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-100 text-gray-800"}`}>
      <Sidebar />

      <main className="flex-1 p-6 space-y-8">
        <section>
          <h2 className="text-2xl font-bold mb-4">All Mechanics</h2>

          <table className={`w-full text-left border-collapse ${darkMode ? "text-gray-300" : "text-gray-800"}`}>
            <thead>
              <tr className={`${darkMode ? "bg-gray-700" : "bg-gray-200"} text-sm font-semibold`}>
                <th className="p-3">Id</th>
                <th className="p-3">Name</th>
                <th className="p-3">Email</th>
                <th className="p-3">PhoneNo</th>
                <th className="p-3">Address</th>
                <th className="p-3">Status</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            {loading ? (
              <Loader />
            ) : (
              <tbody>
                {currentMechanics.map((mechanic, index) => (
                  <tr key={mechanic.id} className={`${darkMode ? (index % 2 === 0 ? "bg-gray-800" : "bg-gray-700") : (index % 2 === 0 ? "bg-white" : "bg-gray-100")}`}>
                    <td className="p-3">{mechanic.userId}</td>
                    <td className="p-3">{mechanic.name}</td>
                    <td className="p-3">{mechanic.email}</td>
                    <td className="p-3">{mechanic.phoneNo}</td>
                    <td className="p-3">{mechanic.address}</td>
                    <td className="p-3">{mechanic.status}</td>
                    <td className="p-3 space-x-2">
                      <button
                        onClick={() => handleEditMechanic(mechanic.id)}
                        className={`px-2 py-1 rounded-xl shadow-lg transition-all duration-300 ${darkMode ? "bg-blue-500 text-white hover:bg-blue-400 hover:scale-105" : "bg-blue-400 text-white hover:bg-blue-300 hover:scale-105"}`}
                      >
                        <i className="fas fa-edit"></i>
                      </button>
                      <button
                        onClick={() => handleDeleteMechanic(mechanic.id)}
                        className={`px-2 py-1 rounded-full transition-all duration-300 ${darkMode ? "bg-red-600 text-white hover:bg-red-500 hover:scale-105" : "bg-red-500 text-white hover:bg-red-400 hover:scale-105"}`}
                      >
                        <i className="fas fa-trash"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            )}
          </table>

          <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(mechanics.length / mechanicsPerPage)}
            onPageChange={paginate}
            siblingCount={1}
            pageRangeDisplayed={5}
          />
        </section>
      </main>
    </div>
  );
};

export default AdminAllMechanics;
