import React, { useState } from "react";
import { useSelector } from "react-redux";
import Sidebar from "./MechanicSidebar";

const MechanicUpdateJobStatus = () => {
  const darkMode = useSelector((state) => state.darkMode.isDarkMode);
  const [status, setStatus] = useState("Completed");
  const [bookingId, setBookingId] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [mechanicId, setMechanicId] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleStatusChange = (e) => setStatus(e.target.value);
  const handleBookingIdChange = (e) => setBookingId(e.target.value);
  const handleCustomerEmailChange = (e) => setCustomerEmail(e.target.value);
  const handleMechanicIdChange = (e) => setMechanicId(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!bookingId || !customerEmail || !mechanicId) {
      setError("All fields are required.");
      return;
    }
    try {
      const response = await fetch(
        "http://localhost:8080/api/bookings/update-status",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            bookingId,
            customerEmail,
            mechanicId,
            status: "Completed", // Set status to completed
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update the job status.");
      }

      const data = await response.json();
      setMessage(data.message || "Job status updated successfully.");
      setError("");
    } catch (error) {
      setError(error.message);
      setMessage("");
    }
  };

  return (
    <div
      className={`min-h-screen flex ${darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-100 text-gray-800"}`}
    >
      <Sidebar />
      <main className="flex-1 p-6 space-y-8">
        <section>
          <h2 className="text-3xl font-semibold mb-6">Update Job Status</h2>
          <form
            onSubmit={handleSubmit}
            className={`rounded-lg shadow-lg p-8 space-y-6 ${
              darkMode ? "bg-gray-800 text-gray-200" : "bg-white text-gray-800"
            }`}
          >
            {/* Booking ID */}
            <div>
              <label className="block text-sm font-medium">Booking ID</label>
              <input
                type="text"
                name="bookingId"
                value={bookingId}
                onChange={handleBookingIdChange}
                required
                className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring ${
                  darkMode
                    ? "bg-gray-700 text-gray-200 border-gray-600"
                    : "bg-white text-gray-800 border-gray-300"
                }`}
              />
            </div>

            {/* Customer Email */}
            <div>
              <label className="block text-sm font-medium">Customer Email</label>
              <input
                type="email"
                name="customerEmail"
                value={customerEmail}
                onChange={handleCustomerEmailChange}
                required
                className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring ${
                  darkMode
                    ? "bg-gray-700 text-gray-200 border-gray-600"
                    : "bg-white text-gray-800 border-gray-300"
                }`}
              />
            </div>

            {/* Mechanic ID */}
            <div>
              <label className="block text-sm font-medium">Mechanic ID</label>
              <input
                type="text"
                name="mechanicId"
                value={mechanicId}
                onChange={handleMechanicIdChange}
                required
                className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring ${
                  darkMode
                    ? "bg-gray-700 text-gray-200 border-gray-600"
                    : "bg-white text-gray-800 border-gray-300"
                }`}
              />
            </div>

            {/* Job Status */}
            <div>
              <label className="block text-sm font-medium">Job Status</label>
              <select
                name="status"
                value={status}
                onChange={handleStatusChange}
                className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring ${
                  darkMode
                    ? "bg-gray-700 text-gray-200 border-gray-600"
                    : "bg-white text-gray-800 border-gray-300"
                }`}
              >
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                className={`w-full py-3 rounded-md text-white hover:bg-indigo-700 focus:outline-none focus:ring ${
                  darkMode ? "bg-indigo-600" : "bg-indigo-600"
                }`}
              >
                Update Status
              </button>
            </div>
          </form>
          {/* Error and Success Messages */}
          {error && (
            <div
              className={`${
                darkMode ? "bg-red-800 text-red-100" : "bg-red-100 text-red-700"
              } mt-4 px-4 py-3 rounded-md`}
            >
              {error}
            </div>
          )}
          {message && (
            <div
              className={`${
                darkMode ? "bg-green-800 text-green-100" : "bg-green-100 text-green-700"
              } mt-4 px-4 py-3 rounded-md`}
            >
              {message}
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default MechanicUpdateJobStatus;
