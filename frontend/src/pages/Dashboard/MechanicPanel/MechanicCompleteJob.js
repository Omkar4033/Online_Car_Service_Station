import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Sidebar from "./MechanicSidebar";

const MechanicCompleteJob = () => {
  const darkMode = useSelector((state) => state.darkMode.isDarkMode);
  const { bookingId } = useParams();
  const mechanic = useSelector((state) => state.userData?.user); // Get mechanic from Redux

  const [customerPhone, setCustomerPhone] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // Handle input change
  const handleInputChange = (e) => {
    setCustomerPhone(e.target.value);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate inputs
    if (!bookingId || !customerPhone || !mechanic?.userId) {
      setError("All fields are required.");
      return;
    }
    if (!/^\d{10}$/.test(customerPhone)) {
      setError("Enter a valid 10-digit phone number.");
      return;
    }

    try {
      const response = await fetch(`http://localhost:8080/api/bookings/${bookingId}/complete`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mechanicId: mechanic.userId,
          customerPhoneNo: customerPhone, // Ensure field name matches backend DTO
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to update the job status.");
      }

      setMessage(data.message || "Job status updated successfully.");
      setError("");
      setCustomerPhone(""); // Reset input after successful completion
    } catch (err) {
      setError(err.message);
      setMessage("");
    }
  };

  return (
    <div className={`min-h-screen flex ${darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-100 text-gray-800"}`}>
      <Sidebar />
      <main className="flex-1 p-6 space-y-8">
        <section>
          <h2 className="text-3xl font-semibold mb-6">Complete Job</h2>
          <form
            onSubmit={handleSubmit}
            className={`rounded-lg shadow-lg p-8 space-y-6 ${darkMode ? "bg-gray-800 text-gray-200" : "bg-white text-gray-800"}`}
          >
            {/* Booking ID (Read-only) */}
            <div>
              <label className="block text-sm font-medium">Booking ID</label>
              <input
                type="text"
                value={bookingId}
                readOnly
                className={`w-full px-4 py-3 border rounded-md cursor-not-allowed ${
                  darkMode ? "bg-gray-700 text-gray-200 border-gray-600" : "bg-gray-200 text-gray-800 border-gray-300"
                }`}
              />
            </div>

            {/* Customer Phone Number */}
            <div>
              <label className="block text-sm font-medium">Customer Phone</label>
              <input
                type="tel"
                value={customerPhone}
                onChange={handleInputChange}
                required
                pattern="[0-9]{10}" // Ensures only 10-digit phone numbers
                title="Enter a valid 10-digit phone number"
                className={`w-full px-4 py-3 border rounded-md ${
                  darkMode ? "bg-gray-700 text-gray-200 border-gray-600" : "bg-white text-gray-800 border-gray-300"
                }`}
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className={`w-full py-3 rounded-md text-white hover:bg-indigo-700 transition ${
                darkMode ? "bg-indigo-600" : "bg-indigo-600"
              }`}
            >
              Complete Job
            </button>
          </form>

          {/* Error & Success Messages */}
          {error && (
            <div className={`mt-4 px-4 py-3 rounded-md ${darkMode ? "bg-red-800 text-red-100" : "bg-red-100 text-red-700"}`}>
              {error}
            </div>
          )}
          {message && (
            <div className={`mt-4 px-4 py-3 rounded-md ${darkMode ? "bg-green-800 text-green-100" : "bg-green-100 text-green-700"}`}>
              {message}
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default MechanicCompleteJob;
