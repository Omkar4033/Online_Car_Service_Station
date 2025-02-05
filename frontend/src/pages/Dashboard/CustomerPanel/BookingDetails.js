import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom"; // For accessing bookingId from the URL
import axios from "axios";

const BookingDetails = () => {
  const { bookingId } = useParams(); // Get the bookingId from the URL
  const darkMode = useSelector((state) => state.darkMode.isDarkMode);
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookingDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/bookings/${bookingId}`);
        setBooking(response.data);
      } catch (err) {
        setError("Failed to fetch booking details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchBookingDetails();
  }, [bookingId]);

  return (
    <div
      className={`min-h-screen flex ${darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-100 text-gray-800"}`}
    >
      <main className="w-full p-8 space-y-8">
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : booking ? (
          <div className="flex flex-col space-y-6">
            {/* Booking Header */}
            <h2 className="text-3xl font-semibold text-center">Booking Details</h2>
            
            {/* Car Info */}
            <div className="flex flex-col space-y-2">
              <h3 className="text-xl font-semibold">Car Details</h3>
              <p className="text-lg">Model: {booking.car.model}</p>
              <p className="text-lg">Company: {booking.car.company}</p>
              <p className="text-lg">Fuel Type: {booking.car.fuelType}</p>
              <p className="text-lg">Registration Number: {booking.car.registrationNumber}</p>
            </div>

            {/* Services */}
            <div className="flex flex-col space-y-2">
              <h3 className="text-xl font-semibold">Services</h3>
              <ul className="list-disc pl-6 text-lg">
                {booking.services?.map((service, index) => (
                  <li key={index} className="text-lg">{service.name}</li>
                ))}
              </ul>
            </div>

            {/* Address */}
            <div className="flex flex-col space-y-2">
              <h3 className="text-xl font-semibold">Address</h3>
              <p className="text-lg">{`${booking.address.landMark}, ${booking.address.city}, ${booking.address.state}, ${booking.address.country}`}</p>
            </div>

            {/* Mechanic */}
            <div className="flex flex-col space-y-2">
              <h3 className="text-xl font-semibold">Mechanic</h3>
              <p className="text-lg">{booking.mechanic ? booking.mechanic.name : "Not assigned"}</p>
            </div>

            {/* Booking Status */}
            <div className="flex flex-col space-y-2">
              <h3 className="text-xl font-semibold">Booking Status</h3>
              <p className={`text-lg font-bold ${booking.bookingStatus === "CONFIRMED" ? "text-green-500" : booking.bookingStatus === "PENDING" ? "text-yellow-500" : "text-red-500"}`}>
                {booking.bookingStatus}
              </p>
            </div>

            {/* Total Amount */}
            <div className="flex flex-col space-y-2">
              <h3 className="text-xl font-semibold">Total Amount</h3>
              <p className="text-lg">${booking.totalAmount}</p>
            </div>
          </div>
        ) : (
          <p>No booking found.</p>
        )}
      </main>
    </div>
  );
};

export default BookingDetails;
