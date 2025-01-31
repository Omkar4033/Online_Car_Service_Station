import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Sidebar from "./AdminSidebar"; // Adjust the import path as needed
import Loader from "../../../components/Loader"; // Import the Loader component
import Pagination from "../../../components/Pagination"; // Import the Pagination component

const AdminAllUsers = () => {
  const darkMode = useSelector((state) => state.darkMode.isDarkMode);

  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(5); // Number of users per page

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/admin/users");
        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleEditUser = (id) => {
    const updatedUsers = users.map((user) =>
      user.id === id ? { ...user, name: "Updated User", status: "Inactive" } : user
    );
    setUsers(updatedUsers);
  };

  const handleDeleteUser = (id) => {
    const filteredUsers = users.filter((user) => user.id !== id);
    setUsers(filteredUsers);
  };

  // Get current users based on the current page
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div
      className={`min-h-screen flex ${darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-100 text-gray-800"}`}
    >
      <Sidebar />

      <main className="flex-1 p-6 space-y-8">
        <section>
          <h2 className="text-2xl font-bold mb-4">All Users</h2>

          {/* Loader: Only show while loading is true */}
          <table
            className={`w-full text-left border-collapse ${darkMode ? "text-gray-300" : "text-gray-800"}`}
          >
            <thead>
              <tr
                className={`${
                  darkMode ? "bg-gray-700" : "bg-gray-200"
                } text-sm font-semibold`}
              >
                <th className="p-3">Id</th>
                <th className="p-3">Name</th>
                <th className="p-3">Email</th>
                <th className="p-3">Phone</th>
                <th className="p-3">Address</th>
                <th className="p-3">Status</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            {loading ? (
              <Loader />
            ) : (
              <tbody>
                {currentUsers.map((user, index) => (
                  <tr
                    key={user.id}
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
                   
                    <td className="p-3">{user.userId}</td>
                    <td className="p-3">{user.name}</td>
                    <td className="p-3">{user.email}</td>
                    <td className="p-3">{user.phoneNo}</td>
                    <td className="p-3">{user.address}</td>
                    <td className="p-3">{user.status}</td>
                    <td className="p-3 space-x-2">
                      <button
                        onClick={() => handleEditUser(user.id)}
                        className={`px-2 py-1 rounded-xl shadow-lg transition-all duration-300 ${
                          darkMode
                            ? "bg-blue-500 text-white hover:bg-blue-400 hover:scale-105"
                            : "bg-blue-400 text-white hover:bg-blue-300 hover:scale-105"
                        }`}
                      >
                        <i className="fas fa-edit"></i>
                      </button>
                      <button
                        onClick={() => handleDeleteUser(user.id)}
                        className={`px-2 py-1 rounded-full transition-all duration-300 ${
                          darkMode
                            ? "bg-red-600 text-white hover:bg-red-500 hover:scale-105"
                            : "bg-red-500 text-white hover:bg-red-400 hover:scale-105"
                        }`}
                      >
                        <i className="fas fa-trash"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            )}
          </table>

          {/* Pagination Component */}
          <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(users.length / usersPerPage)}
            onPageChange={paginate}
            siblingCount={1} // Optional: Display previous/next sibling pages
            pageRangeDisplayed={5} // Total number of page buttons to display
          />
        </section>
      </main>
    </div>
  );
};

export default AdminAllUsers;
