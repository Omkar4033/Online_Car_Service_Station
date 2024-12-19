import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Sidebar from "./AdminSidebar"; // Adjust the import path as needed
import Loader from "../../../components/Loader";

const AdminFeedback = () => {
  const darkMode = useSelector((state) => state.darkMode.isDarkMode);
  const [loading, setLoading] = useState(true);
  const [feedback, setFeedback] = useState([]);

  useEffect(() => {
    // Simulate data fetch for feedback
    setTimeout(() => {
      setFeedback([
        { id: 1, user: "John Doe", comment: "Great service!", rating: 5 },
        { id: 2, user: "Jane Smith", comment: "Satisfactory experience.", rating: 4 },
        { id: 3, user: "Mike Johnson", comment: "Could be better.", rating: 3 },
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return <Loader />;
  }

  const handleResponse = (id) => {
    alert(`Responding to feedback ID: ${id}`);
  };

  return (
    <div
      className={`min-h-screen flex ${darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-100 text-gray-800"}`}
    >
      <Sidebar /> {/* Sidebar integration */}

      {/* Main Content */}
      <main className="flex-1 p-6 space-y-8">
        {/* Feedback Section */}
        <section>
          <h2 className="text-2xl font-bold mb-4">User Feedback</h2>
          <table
            className={`w-full text-left border-collapse ${darkMode ? "text-gray-300" : "text-gray-800"}`}
          >
            <thead>
              <tr
                className={`${darkMode ? "bg-gray-700" : "bg-gray-200"} text-sm font-semibold`}
              >
                <th className="p-3">User</th>
                <th className="p-3">Comment</th>
                <th className="p-3">Rating</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {feedback.map((fb, index) => (
                <tr
                  key={fb.id}
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
                  <td className="p-3">{fb.user}</td>
                  <td className="p-3">{fb.comment}</td>
                  <td className="p-3">{fb.rating}</td>
                  <td className="p-3">
                    <button
                      onClick={() => handleResponse(fb.id)}
                      className={`px-4 py-2 rounded-lg ${
                        darkMode ? "bg-yellow-400 text-gray-900" : "bg-yellow-300 text-gray-800"
                      } hover:bg-yellow-500 transition duration-300`}
                    >
                      Respond
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

export default AdminFeedback;
