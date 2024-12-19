import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const CustomerBookings = () => {
  const darkMode = useSelector((state) => state.darkMode.isDarkMode);

  // Dummy booking data (This can be fetched from an API)
  const [bookings, setBookings] = useState([
    {
      id: 1,
      service: "Oil Change",
      date: "2024-12-15",
      status: "Confirmed",
      price: 50,
    },
    {
      id: 2,
      service: "Tire Rotation",
      date: "2024-12-20",
      status: "Pending",
      price: 30,
    },
    {
      id: 3,
      service: "Brake Fluid Replacement",
      date: "2024-12-22",
      status: "Confirmed",
      price: 40,
    },
  ]);

  return (
    <div
      className={`min-h-screen flex ${
        darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-100 text-gray-800"
      }`}
    >
      

      {/* Main Content */}
      <main className="w-3/4 p-6">
        <h2 className="text-2xl font-semibold mb-8">Your Bookings</h2>

        {/* Booking List */}
        <div className="grid grid-cols-1 gap-4">
          {bookings.map((booking) => (
            <div
              key={booking.id}
              className={`p-4 rounded-lg shadow-md flex justify-between items-center ${
                darkMode ? "bg-gray-800" : "bg-white"
              }`}
            >
              <div className="flex flex-col">
                <h3 className="text-lg font-semibold">{booking.service}</h3>
                <p className="text-sm">{booking.date}</p>
                <p
                  className={`text-sm font-bold ${
                    booking.status === "Confirmed"
                      ? "text-green-500"
                      : booking.status === "Pending"
                      ? "text-yellow-500"
                      : "text-red-500"
                  }`}
                >
                  {booking.status}
                </p>
              </div>
              <p className="text-lg font-bold">${booking.price}</p>
              <Link
                to={`/customer/booking/${booking.id}`}
                className={`py-2 px-4 rounded-md ${
                  darkMode
                    ? "bg-yellow-500 text-gray-100 hover:bg-yellow-400"
                    : "bg-yellow-400 text-white hover:bg-yellow-500"
                }`}
              >
                View Details
              </Link>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default CustomerBookings;
