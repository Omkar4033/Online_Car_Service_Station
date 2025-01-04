import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Sidebar from "./AdminSidebar"; // Adjust the import path as needed
import Loader from "../../../components/Loader"; // Import the Loader component
import Pagination from "../../../components/Pagination"; // Import the Pagination component

const AdminAllUsers = () => {
  const darkMode = useSelector((state) => state.darkMode.isDarkMode);

  const initialUsers = [
    { id: 1, name: "John Doe", email: "john@example.com", phone: "1234567890", address: "123 Main St", status: "Active" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", phone: "9876543210", address: "456 Elm St", status: "Inactive" },
    { id: 3, name: "Mike Johnson", email: "mike@example.com", phone: "2345678901", address: "789 Oak St", status: "Active" },
    { id: 4, name: "Sarah Williams", email: "sarah@example.com", phone: "3456789012", address: "101 Pine St", status: "Active" },
    { id: 5, name: "David Brown", email: "david@example.com", phone: "4567890123", address: "202 Maple St", status: "Inactive" },
    { id: 6, name: "Laura Green", email: "laura@example.com", phone: "5678901234", address: "303 Birch St", status: "Active" },
    { id: 7, name: "James King", email: "james@example.com", phone: "6789012345", address: "404 Oak St", status: "Active" },
    { id: 8, name: "Emily Clark", email: "emily@example.com", phone: "7890123456", address: "505 Cedar St", status: "Inactive" },
    // Add more sample users for pagination testing
  ];

  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState(initialUsers);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(5); // Number of users per page

  useEffect(() => {
    setTimeout(() => {
      setLoading(false); // Simulating async data fetching
    }, 1000); // Mimicking loading time
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
                    <td className="p-3">{user.name}</td>
                    <td className="p-3">{user.email}</td>
                    <td className="p-3">{user.phone}</td>
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
