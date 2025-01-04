import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Sidebar from "./AdminSidebar";
import Loader from "../../../components/Loader";
import Pagination from "../../../components/Pagination"; // Assuming this is a reusable pagination component

const AdminDashboard = () => {
  const darkMode = useSelector((state) => state.darkMode.isDarkMode);
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const [bookingsPerPage] = useState(3); // Adjust the number of bookings per page

  const bookingStatus = [
    { title: "Total Bookings", value: 120 },
    { title: "Pending Bookings", value: 30 },
    { title: "Assigned Bookings", value: 70 },
    { title: "Total Amount", value: "$15,000" },
  ];

  const allRecentBookings = [
    ["John Doe", "Oil Change", "Completed"],
    ["Jane Smith", "Tire Rotation", "Pending"],
    ["Mike Johnson", "Brake Inspection", "Assigned"],
    ["Emily Davis", "Battery Replacement", "Completed"],
    ["Sarah Parker", "Air Filter Replacement", "Assigned"],
    ["George Clark", "Oil Change", "Pending"],
    ["Rachel Adams", "Tire Rotation", "Completed"],
    ["David Black", "Brake Inspection", "Completed"],
    // You can add more bookings here
  ];

  // Calculate the page numbers
  const indexOfLastBooking = currentPage * bookingsPerPage;
  const indexOfFirstBooking = indexOfLastBooking - bookingsPerPage;
  const currentBookings = allRecentBookings.slice(indexOfFirstBooking, indexOfLastBooking);

  // Change page function
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  useEffect(() => {
    // Simulate a loading delay
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`min-h-screen flex ${darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-100 text-gray-800"}`}>
      <Sidebar />
      <main className="flex-1 p-6 space-y-8">
        {/* Booking Status */}
        <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {bookingStatus.map((status, index) => (
            <div
              key={index}
              className={`p-6 rounded-lg shadow-md flex flex-col items-center ${darkMode ? "bg-gray-800" : "bg-white"}`}
            >
              <h2 className={`text-lg font-semibold ${darkMode ? "text-yellow-400" : "text-blue-600"}`}>
                {status.title}
              </h2>
              <p className="text-2xl font-bold mt-2">{status.value}</p>
            </div>
          ))}
        </section>

        {/* Recent Bookings */}
        <section>
          <h2 className="text-2xl font-bold mb-4">Recent Bookings</h2>
          <table className={`w-full text-left border-collapse ${darkMode ? "text-gray-300" : "text-gray-800"}`}>
            <thead>
              <tr className={`${darkMode ? "bg-gray-700" : "bg-gray-200"} text-sm font-semibold`}>
                <th className="p-3">Customer Name</th>
                <th className="p-3">Service</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>
            {loading ? (
              <div className="flex justify-center items-center h-40">
                <Loader />
              </div>
            ) : (
              <tbody>
                {currentBookings.map((booking, index) => (
                  <tr
                    key={index}
                    className={`${darkMode ? (index % 2 === 0 ? "bg-gray-800" : "bg-gray-700") : (index % 2 === 0 ? "bg-white" : "bg-gray-100")}`}
                  >
                    {booking.map((data, idx) => (
                      <td key={idx} className="p-3">
                        {data}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            )}
          </table>

          {/* Pagination Component */}
          <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(allRecentBookings.length / bookingsPerPage)}
            onPageChange={paginate}
            siblingCount={1} // Optional: Display previous/next sibling pages
            pageRangeDisplayed={5} // Total number of page buttons to display
          />
        </section>
      </main>
    </div>
  );
};

export default AdminDashboard;
