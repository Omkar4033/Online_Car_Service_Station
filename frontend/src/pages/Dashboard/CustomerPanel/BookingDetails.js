import React, { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaCar, FaTools, FaMapMarkerAlt, FaUserCog, FaCalendarCheck, FaMoneyBillWave } from "react-icons/fa";

const BookingDetails = () => {
  const { bookingId } = useParams();
  const darkMode = useSelector((state) => state.darkMode.isDarkMode);
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchBookingDetails = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:8080/api/bookings/${bookingId}`);
      setBooking(response.data);
    } catch (err) {
      setError("Failed to fetch booking details. Please try again later.");
    } finally {
      setLoading(false);
    }
  }, [bookingId]);

  useEffect(() => {
    fetchBookingDetails();
  }, [fetchBookingDetails]);

  return (
    <div className={`min-h-screen px-6 py-10 ${darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-100 text-gray-900"}`}>
      {/* Back Button */}
      <div className="max-w-screen-lg mx-auto flex items-center justify-between">
        <button
          onClick={() => navigate(-1)}
          className={`px-4 py-2 rounded-md text-white font-medium transition duration-300 ${darkMode ? "bg-gray-700 hover:bg-gray-600" : "bg-blue-600 hover:bg-blue-500"}`}
        >
          ← Back
        </button>
        <h2 className="text-3xl font-bold text-center flex-1">Booking Details</h2>
      </div>

      {loading ? (
        <div className="text-center text-lg mt-6">
          <p>Loading...</p>
        </div>
      ) : error ? (
        <div className="text-red-500 text-center mt-6">
          <p>{error}</p>
          <button
            onClick={fetchBookingDetails}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md transition hover:bg-blue-600"
          >
            Retry
          </button>
        </div>
      ) : booking ? (
        <div className="space-y-6 max-w-screen-lg mx-auto mt-6">
          {/* Booking Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <DetailCard
              icon={<FaCar className="text-blue-500 text-2xl" />}
              title="Car Details"
              content={
                <>
                  <p><strong>Model:</strong> {booking.car.model}</p>
                  <p><strong>Company:</strong> {booking.car.company}</p>
                  <p><strong>Fuel Type:</strong> {booking.car.fuelType}</p>
                  <p><strong>Reg. No.:</strong> {booking.car.registrationNumber}</p>
                </>
              }
            />

            <DetailCard
              icon={<FaTools className="text-yellow-500 text-2xl" />}
              title="Services"
              content={
                <ul className="mt-2 space-y-1">
                  {booking.services?.map((service, index) => (
                    <li key={index} className="bg-gray-200 dark:bg-gray-700 p-2 rounded-md text-sm">{service.name}</li>
                  ))}
                </ul>
              }
            />

            <DetailCard
              icon={<FaMapMarkerAlt className="text-red-500 text-2xl" />}
              title="Address"
              content={<p>{`${booking.address.landMark}, ${booking.address.city}, ${booking.address.state}, ${booking.address.country}`}</p>}
            />

            <DetailCard
              icon={<FaUserCog className="text-green-500 text-2xl" />}
              title="Mechanic"
              content={<p>{booking.mechanic ? booking.mechanic.name : "Not assigned"}</p>}
            />

            <DetailCard
              icon={<FaCalendarCheck className="text-indigo-500 text-2xl" />}
              title="Booking Status"
              content={
                <p className={`font-semibold text-lg ${booking.bookingStatus === "CONFIRMED" ? "text-green-500" : booking.bookingStatus === "PENDING" ? "text-yellow-500" : "text-red-500"}`}>
                  {booking.bookingStatus}
                </p>
              }
            />

            <DetailCard
              icon={<FaMoneyBillWave className="text-green-500 text-2xl" />}
              title="Total Amount"
              content={<p className="font-semibold text-lg">₹{booking.totalAmount}</p>}
            />
          </div>
        </div>
      ) : (
        <p className="text-center text-lg mt-6">No booking found.</p>
      )}
    </div>
  );
};

// Reusable Detail Card Component
const DetailCard = ({ icon, title, content }) => (
  <div className="p-4 rounded-lg shadow-sm border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 transition hover:shadow-md">
    <div className="flex items-center gap-3 mb-3">
      {icon}
      <h3 className="text-md font-medium">{title}</h3>
    </div>
    <div className="text-sm">{content}</div>
  </div>
);

export default BookingDetails;
