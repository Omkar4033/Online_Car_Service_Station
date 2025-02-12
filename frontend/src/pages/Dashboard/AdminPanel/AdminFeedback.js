import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Sidebar from "./AdminSidebar";
import Loader from "../../../components/Loader";

const AdminFeedback = () => {
  const darkMode = useSelector((state) => state.darkMode.isDarkMode);
  const [loading, setLoading] = useState(true);
  const [feedback, setFeedback] = useState([]);

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/feedback/all"); // Replace with your actual backend endpoint
        if (!response.ok) throw new Error("Failed to fetch feedback");
        
        const data = await response.json();
        setFeedback(data);
      } catch (error) {
        console.error("Error fetching feedback:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeedback();
  }, []);

  const handleResponse = (id) => {
    alert(`Responding to feedback ID: ${id}`);
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
          <h2 className="text-2xl font-bold mb-4">User Feedback</h2>
          {loading ? (
            <Loader />
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
                  <th className="p-3">Booking Id</th>
                  <th className="p-3">Comment</th>
                  <th className="p-3">Rating</th>  
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
                    <td className="p-3">{fb.bookingId}</td>
                    <td className="p-3">{fb.comment}</td>
                    <td className="p-3">{fb.rating}</td>
                   
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

export default AdminFeedback;
