import React, { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaArrowLeft, FaUser, FaCar, FaTools, FaMapMarkerAlt, FaWrench, FaCalendarAlt, FaMoneyBillWave } from "react-icons/fa";

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
    <div className={`min-h-screen px-6 py-8 ${darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-900"}`}>
      <div className="max-w-screen-md mx-auto text-left">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 mb-6 text-gray-600 dark:text-gray-300 hover:text-gray-900">
          <FaArrowLeft /> Back
        </button>

        <h2 className="text-3xl font-bold border-b pb-3 mb-5">Booking Details</h2>

        {loading ? (
          <div className="text-center text-lg">Loading...</div>
        ) : error ? (
          <div className="text-red-500 text-center">{error}</div>
        ) : booking ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-4 text-lg">
            <p><FaCalendarAlt className="inline mr-2" /> <strong>Booking ID:</strong> {booking.bookingId}</p>
            <p><strong>Date:</strong> {new Date(booking.bookingDate).toLocaleDateString()}</p>
            <p><strong>Status:</strong> {booking.bookingStatus}</p>
            <p><FaMoneyBillWave className="inline mr-2" /> <strong>Total Amount:</strong> ₹{booking.totalAmount}</p>
            
            <h3 className="col-span-2 text-xl font-semibold mt-5 border-b pb-2">User Details</h3>
            <p><FaUser className="inline mr-2" /> <strong>Name:</strong> {booking.user.name}</p>
            <p><strong>Email:</strong> {booking.user.email}</p>
            <p><strong>Phone No:</strong> {booking.user.phoneNo || "N/A"}</p>
            <p><strong>Role:</strong> {booking.user.role}</p>
            
            <h3 className="col-span-2 text-xl font-semibold mt-5 border-b pb-2">Car Details</h3>
            <p><FaCar className="inline mr-2" /> <strong>Model:</strong> {booking.car.model}</p>
            <p><strong>Company:</strong> {booking.car.company}</p>
            <p><strong>Fuel Type:</strong> {booking.car.fuelType}</p>
            <p><strong>Reg. No.:</strong> {booking.car.registration}</p>
            
            <h3 className="col-span-2 text-xl font-semibold mt-5 border-b pb-2">Services</h3>
            <ul className="col-span-2 list-disc pl-6">
              {booking.services?.map((service, index) => (
                <li key={index}><FaTools className="inline mr-2" /> {service.name} - ₹{service.price}</li>
              ))}
            </ul>
            
            <h3 className="col-span-2 text-xl font-semibold mt-5 border-b pb-2">Address</h3>
            <p><FaMapMarkerAlt className="inline mr-2" /> <strong>Landmark:</strong> {booking.address.landMark}</p>
            <p><strong>City:</strong> {booking.address.city}</p>
            <p><strong>State:</strong> {booking.address.state}</p>
            <p><strong>Country:</strong> {booking.address.country}</p>
            <p><strong>Pin Code:</strong> {booking.address.pinCode}</p>
            <p><strong>Mobile:</strong> {booking.address.mobile}</p>
            
            <h3 className="col-span-2 text-xl font-semibold mt-5 border-b pb-2">Mechanic</h3>
            <p><FaWrench className="inline mr-2" /> <strong>Name:</strong> {booking.mechanic ? booking.mechanic.name : "Not assigned"}</p>
            <p><strong>Email:</strong> {booking.mechanic ? booking.mechanic.email : "N/A"}</p>
          
          </div>
        ) : (
          <p className="text-center text-lg">No booking found.</p>
        )}
      </div>
    </div>
  );
};

export default BookingDetails;
