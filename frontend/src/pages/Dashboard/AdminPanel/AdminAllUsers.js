import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Sidebar from "./AdminSidebar"; // Adjust the import path as needed
import Loader from "../../../components/Loader"; // Import the Loader component

const AdminAllUsers = () => {
  const darkMode = useSelector((state) => state.darkMode.isDarkMode);

  const initialUsers = [
    { id: 1, name: "John Doe", email: "john@example.com", role: "Admin", status: "Active" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", role: "User", status: "Inactive" },
    { id: 3, name: "Sam Wilson", email: "sam@example.com", role: "Moderator", status: "Active" },
    { id: 4, name: "Emily Davis", email: "emily@example.com", role: "User", status: "Active" },
  ];

  const [loading, setLoading] = useState(true); // State to handle loading
  const [users, setUsers] = useState(initialUsers);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false); // Simulating async data fetching
    }, 1000); // Mimicking a loading time of 1 second
  }, []);

  const handleEditUser = (id) => {
    const updatedUsers = users.map((user) =>
      user.id === id
        ? { ...user, status: user.status === "Active" ? "Inactive" : "Active" }
        : user
    );
    setUsers(updatedUsers);
  };

  const handleDeleteUser = (id) => {
    const filteredUsers = users.filter((user) => user.id !== id);
    setUsers(filteredUsers);
  };

  return (
    <div
      className={`min-h-screen flex ${
        darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-100 text-gray-800"
      }`}
    >
      <Sidebar />

      <main className="flex-1 p-6 space-y-8">
        <section>
          <h2 className="text-2xl font-bold mb-4">All Users</h2>

          {/* Loader: Only show while loading is true */}
          {loading ? (
            <Loader loading={loading} />
          ) : (
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
                  <th className="p-3">Name</th>
                  <th className="p-3">Email</th>
                  <th className="p-3">Role</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
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
                    <td className="p-3">{user.role}</td>
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
                        <i className="fas fa-edit"></i> {/* Edit Icon Only */}
                      </button>
                      <button
                        onClick={() => handleDeleteUser(user.id)}
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
          )}
        </section>
      </main>
    </div>
  );
};

export default AdminAllUsers;
