import React, { useState } from "react";
import { useSelector } from "react-redux";
import Sidebar from "./MechanicSidebar";

const MechanicFeedback = () => {
  const darkMode = useSelector((state) => state.darkMode.isDarkMode);
  const [feedback, setFeedback] = useState("");
  const [bookingId, setBookingId] = useState("");
  const [ratings, setRatings] = useState(1);

  const handleFeedbackChange = (e) => setFeedback(e.target.value);
  const handleBookingIdChange = (e) => setBookingId(e.target.value);
  const handleRatingsChange = (e) => setRatings(e.target.value);

  const handleSubmit = () => {
    alert("Feedback submitted!");
  };

  return (
    <div
      className={`min-h-screen flex ${darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-100 text-gray-800"}`}
    >
      <Sidebar />
      <main className="flex-1 p-6 space-y-8">
        <section>
          <h2 className="text-2xl font-semibold mb-6">Submit Your Feedback</h2>
          <form
            onSubmit={(e) => e.preventDefault()}
            className={`rounded-lg shadow-lg p-8 space-y-6 ${
              darkMode ? "bg-gray-800 text-gray-200" : "bg-white text-gray-800"
            }`}
          >
            {/* Booking ID Input */}
            <div>
              <label className="block text-sm font-medium">Booking ID</label>
              <input
                type="text"
                className={`w-full p-3 border rounded-md focus:outline-none focus:ring ${
                  darkMode
                    ? "bg-gray-700 text-gray-200 border-gray-600"
                    : "bg-white text-gray-800 border-gray-300"
                }`}
                value={bookingId}
                onChange={handleBookingIdChange}
                placeholder="Enter Booking ID"
              />
            </div>

            {/* Ratings Input */}
            <div>
              <label className="block text-sm font-medium">Ratings</label>
              <div className="flex space-x-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRatings(star)}
                    className={`${
                      star <= ratings
                        ? "text-yellow-500"
                        : "text-gray-400"
                    } text-xl focus:outline-none hover:text-yellow-500`}
                  >
                    ★
                  </button>
                ))}
              </div>
            </div>

            {/* Feedback Textarea */}
            <div>
              <label className="block text-sm font-medium">Feedback</label>
              <textarea
                className={`w-full p-3 border rounded-md focus:outline-none focus:ring ${
                  darkMode
                    ? "bg-gray-700 text-gray-200 border-gray-600"
                    : "bg-white text-gray-800 border-gray-300"
                }`}
                rows="6"
                value={feedback}
                onChange={handleFeedbackChange}
                placeholder="Provide your feedback..."
              />
            </div>

            {/* Submit Button */}
            <div>
              <button
                onClick={handleSubmit}
                className={`w-full py-3 rounded-md text-white hover:bg-blue-700 focus:outline-none focus:ring ${
                  darkMode ? "bg-blue-600" : "bg-blue-600"
                }`}
              >
                Submit Feedback
              </button>
            </div>
          </form>
        </section>
      </main>
    </div>
  );
};

export default MechanicFeedback;
