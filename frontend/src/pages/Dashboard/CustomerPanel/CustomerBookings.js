import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";

const CustomerBookings = () => {
  const darkMode = useSelector((state) => state.darkMode.isDarkMode);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const userId = 1; // Replace with actual user ID from authentication
        const response = await axios.get(
          `http://localhost:8080/api/bookings/user/${userId}`
        );
        setBookings(response.data);
      } catch (err) {
        setError("Failed to fetch bookings. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, []);

  return (
    <div
      className={`min-h-screen flex ${
        darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-100 text-gray-800"
      }`}
    >
      <main className="flex flex-wrap w-full p-8 space-y-8">
        <h2 className="w-full text-3xl font-semibold mb-6">Your Bookings</h2>

        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : bookings.length === 0 ? (
          <p>No bookings found.</p>
        ) : (
          bookings.map((booking) => (
            <div
              key={booking.bookingId}
              className={`flex flex-col w-full lg:w-1/3 p-6 rounded-lg shadow-lg ${
                darkMode ? "bg-gray-800" : "bg-white"
              } transition-all`}
            >
              <div className="flex flex-col space-y-4">
                <h3 className="text-xl font-semibold text-yellow-500">
                  Service: {booking.car.model}
                </h3>
                <p className="text-sm">
                  Date: {new Date(booking.bookingDate).toLocaleDateString()}
                </p>
                <p className="text-sm">
                  Car: {booking.car.company} {booking.car.model} (
                  {booking.car.fuelType})
                </p>
                <p className="text-sm">
                  Address:{" "}
                  {`${booking.address.landMark}, ${booking.address.city}, ${booking.address.state}, ${booking.address.country}`}
                </p>
                <p className="text-sm">
                  Mechanic: {booking.mechanicName || "Not assigned"}
                </p>
                <p className="text-sm">Total Amount: ${booking.totalAmount}</p>

                {/* Services Display */}
                <div className="border-t pt-2">
                  <h4 className="text-md font-semibold">Services Included:</h4>
                  <ul className="list-disc pl-5 text-sm">
                    {booking.services?.map((service, index) => (
                      <li key={index}>{service}</li>
                    ))}
                  </ul>
                </div>

                {/* Booking Status */}
                <p
                  className={`text-sm font-bold ${
                    booking.bookingStatus === "CONFIRMED"
                      ? "text-green-500"
                      : booking.bookingStatus === "PENDING"
                      ? "text-yellow-500"
                      : "text-red-500"
                  }`}
                >
                  Status: {booking.bookingStatus}
                </p>
              </div>

              {/* View Details Button */}
              <Link
                to={`/user/booking/${booking.bookingId}`}
                className={`mt-2 py-2 px-4 rounded-md inline-block ${
                  darkMode
                    ? "bg-yellow-500 text-gray-100 hover:bg-yellow-400"
                    : "bg-yellow-400 text-white hover:bg-yellow-500"
                }`}
              >
                View Details
              </Link>
            </div>
          ))
        )}
      </main>
    </div>
  );
};

export default CustomerBookings;
