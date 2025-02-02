import React, { useState } from "react";
import { useSelector } from "react-redux";
import Sidebar from "./MechanicSidebar";

const MechanicFeedback = () => {
  const darkMode = useSelector((state) => state.darkMode.isDarkMode);
  const [feedback, setFeedback] = useState("");

  const handleFeedbackChange = (e) => setFeedback(e.target.value);

  const handleSubmit = () => {
    alert("Feedback submitted!");
  };

  return (
    <div className={`min-h-screen flex ${darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-100 text-gray-800"}`}>
      <Sidebar />
      <main className="flex-1 p-6 space-y-8">
        <section>
          <h2 className="text-2xl font-bold mb-4">Feedback</h2>
          <textarea
            className="w-full p-4 border rounded-lg"
            rows="6"
            value={feedback}
            onChange={handleFeedbackChange}
            placeholder="Provide your feedback..."
          />
          <button
            onClick={handleSubmit}
            className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg"
          >
            Submit Feedback
          </button>
        </section>
      </main>
    </div>
  );
};

export default MechanicFeedback;
