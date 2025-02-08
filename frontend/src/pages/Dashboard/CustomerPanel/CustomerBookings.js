import React, { useState, useEffect } from "react";
import { FaTrashAlt } from "react-icons/fa";  // Importing delete icon from react-icons
import { Link } from "react-router-dom";  // Importing Link for navigation to booking details page
import { useSelector } from "react-redux";  // Importing useSelector to access the darkMode state
import axios from "axios";

const CustomerBookings = () => {
  const darkMode = useSelector((state) => state.darkMode.isDarkMode);
  const user=useSelector((state) => state.userData?.user);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  console.log(user.userId);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const userId = user?.userId;
        const response = await axios.get(
          `http://localhost:8080/api/bookings/user/${userId}`
        );
        setBookings(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch bookings. Please try again later.");
        setLoading(false);
      }
    };
    fetchBookings();
  }, []);

  // Function to handle deleting a booking
  const handleDelete = (bookingId) => {
    axios
      .delete(`http://localhost:8080/api/bookings/delete/${bookingId}`)
      .then(() => {
        setBookings(bookings.filter((booking) => booking.bookingId !== bookingId));
        console.log(`Booking with id ${bookingId} deleted successfully.`);
      })
      .catch((error) => {
        console.error(`Error deleting booking with id ${bookingId}:`, error);
      });
  };

  return (
    <div className={`customer-bookings-container p-6 min-h-screen ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-800'}`}>
      <h2 className="text-2xl font-bold mb-6">Your Bookings</h2>

      {/* Render list of bookings */}
      <ul className="space-y-6">
        {loading ? (
          <p>Loading bookings...</p>
        ) : error ? (
          <p>{error}</p>
        ) : bookings.length === 0 ? (
          <p>No bookings available.</p>
        ) : (
          bookings.map((booking) => (
            <li
              key={booking.bookingId}
              className={`flex justify-between items-center p-5 rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105 ${darkMode ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-800'}`}
            >
              <div className="flex flex-col space-y-2">
                <h3 className="font-semibold text-xl text-yellow-500">{booking.car.model}</h3>
                <p className="text-sm text-gray-500">{new Date(booking.bookingDate).toLocaleDateString()}</p>
                <p className="text-sm">
                  <span className="font-semibold">Car:</span> {booking.car.company} {booking.car.model} ({booking.car.fuelType})
                </p>
                <p className="text-sm">
                  <span className="font-semibold">Mechanic:</span> {booking.mechanicName || "Not assigned"}
                </p>
                <p className="text-sm">
                  <span className="font-semibold">Total Amount:</span> ₹{booking.totalAmount}
                </p>

                {/* Services Display (Grid Layout) */}
                <div className="border-t-2 pt-2">
                  <h4 className="text-md font-semibold text-gray-700 mb-2">Services Included:</h4>
                  <div className="grid grid-cols-2 gap-3">
                    {booking.services?.map((service, index) => (
                      <div
                        key={index}
                        className="p-2 border rounded-md bg-gray-200 text-xs text-gray-800 shadow-sm"
                      >
                        {service}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Booking Status */}
                <p
                  className={`text-sm font-bold ${booking.bookingStatus === "CONFIRMED"
                    ? "text-green-500"
                    : booking.bookingStatus === "PENDING"
                    ? "text-yellow-500"
                    : "text-red-500"
                    }`}
                >
                  Status: {booking.bookingStatus}
                </p>
              </div>

              {/* Action Buttons: Delete and View Details */}
              <div className="flex justify-between items-center">
               

                {/* View Details Button */}
                <Link
                  to={`/user/booking/${booking.bookingId}`}
                  className={`py-2 px-6 rounded-md ${darkMode ? 'bg-yellow-500 text-gray-100 hover:bg-yellow-400' : 'bg-yellow-400 text-white hover:bg-yellow-500'} transition-all duration-200`}
                >
                  View Details
                </Link>
              </div>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default CustomerBookings;
