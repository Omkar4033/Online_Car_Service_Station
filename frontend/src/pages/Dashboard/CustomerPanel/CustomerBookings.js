import React, { useState, useEffect } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";

const CustomerBookings = () => {
  const darkMode = useSelector((state) => state.darkMode.isDarkMode);
  const user = useSelector((state) => state.userData?.user);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const userId = user?.userId;
        const response = await axios.get(`http://localhost:8080/api/bookings/user/${userId}`);
        const formattedBookings = response.data.map((booking) => ({
          ...booking,
          services: booking.services.map((service) => service.name).join(", ")
        }));
        setBookings(formattedBookings);
      } catch (err) {
        setError("Failed to fetch bookings. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, [user]);

  const handleDelete = (bookingId) => {
    axios.delete(`http://localhost:8080/api/bookings/delete/${bookingId}`)
      .then(() => {
        setBookings(bookings.filter((booking) => booking.bookingId !== bookingId));
      })
      .catch((error) => {
        console.error(`Error deleting booking with id ${bookingId}:`, error);
      });
  };

  return (
    <div className={`customer-bookings-container p-6 min-h-screen ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-800'}`}>
      <h2 className="text-3xl font-extrabold mb-8 text-center border-b pb-2">Your Bookings</h2>
      <ul className="space-y-6">
        {loading ? (
          <p className="text-center text-lg">Loading bookings...</p>
        ) : error ? (
          <p className="text-center text-lg text-red-500">{error}</p>
        ) : bookings.length === 0 ? (
          <p className="text-center text-lg text-gray-500">No bookings available.</p>
        ) : (
          bookings.map((booking) => (
            <li
              key={booking.bookingId}
              className={`p-4 rounded-lg shadow-xl transition-all duration-300 transform hover:scale-105 ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}`}
            >
              <div className="grid grid-cols-2 gap-4">
                <p className="text-md"><span className="font-semibold">Car:</span> {booking.car.company} {booking.car.model} ({booking.car.fuelType})</p>
                <p className="text-md"><span className="font-semibold">Date:</span> {new Date(booking.bookingDate).toLocaleDateString()}</p>
                <p className="text-md"><span className="font-semibold">Mechanic:</span> {booking?.mechanic?.name || "Not assigned"}</p>
                <p className="text-md"><span className="font-semibold">Total Amount:</span> ₹{booking.totalAmount}</p>
                <p className="text-md col-span-2"><span className="font-semibold">Services:</span> {booking.services}</p>
                <p className={`text-md font-bold col-span-2 ${booking.bookingStatus === "COMPLETED" ? "text-green-500" : booking.bookingStatus === "ACCEPTED" ? "text-yellow-500" : "text-red-500"}`}>
                  Status: {booking.bookingStatus}
                </p>
              </div>
              <div className="flex justify-between items-center mt-4">
                <button onClick={() => handleDelete(booking.bookingId)} className="text-red-500 hover:text-red-700 flex items-center gap-2">
                  
                </button>
                <Link to={`/user/booking/${booking.bookingId}`} className={`py-2 px-6 mr-4 rounded-lg font-semibold transition-all duration-200 ${darkMode ? 'bg-yellow-500 text-gray-900 hover:bg-yellow-400' : 'bg-yellow-400 text-white hover:bg-yellow-500'}`}>View Details</Link>
              </div>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default CustomerBookings;
