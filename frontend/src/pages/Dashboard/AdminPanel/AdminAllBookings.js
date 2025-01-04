import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Sidebar from "./AdminSidebar"; // Adjust the import path as needed
import Loader from "../../../components/Loader";
import Pagination from "../../../components/Pagination"; // Adjust the import path

const AdminAllBooking = () => {
  const darkMode = useSelector((state) => state.darkMode.isDarkMode);

  const initialBookings = [
    {
      id: 1,
      serviceName: "Oil Change",
      customerName: "John Doe",
      date: "2024-12-01",
      status: "Scheduled",
      price: "$50",
    },
    {
      id: 2,
      serviceName: "Tire Rotation",
      customerName: "Jane Smith",
      date: "2024-12-02",
      status: "Completed",
      price: "$30",
    },
    {
      id: 3,
      serviceName: "Brake Inspection",
      customerName: "Sam Wilson",
      date: "2024-12-03",
      status: "In Progress",
      price: "$40",
    },
    {
      id: 4,
      serviceName: "Battery Replacement",
      customerName: "Emily Davis",
      date: "2024-12-04",
      status: "Scheduled",
      price: "$80",
    },
    {
      id: 5,
      serviceName: "Wheel Alignment",
      customerName: "Michael Johnson",
      date: "2024-12-05",
      status: "Completed",
      price: "$60",
    },
    // Add more sample bookings to test pagination
    {
      id: 6,
      serviceName: "Oil Change",
      customerName: "Anna Lee",
      date: "2024-12-06",
      status: "Scheduled",
      price: "$50",
    },
    {
      id: 7,
      serviceName: "Tire Rotation",
      customerName: "Kevin Smith",
      date: "2024-12-07",
      status: "In Progress",
      price: "$30",
    },
    // More bookings as needed...
  ];

  const [loading, setLoading] = useState(true);
  const [bookings, setBookings] = useState(initialBookings);
  const [currentPage, setCurrentPage] = useState(1);
  const [bookingsPerPage] = useState(5); // Number of bookings per page

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleEditBooking = (id) => {
    const updatedBookings = bookings.map((booking) =>
      booking.id === id ? { ...booking, status: "Completed" } : booking
    );
    setBookings(updatedBookings);
  };

  const handleDeleteBooking = (id) => {
    const filteredBookings = bookings.filter((booking) => booking.id !== id);
    setBookings(filteredBookings);
  };

  // Get current bookings based on the current page
  const indexOfLastBooking = currentPage * bookingsPerPage;
  const indexOfFirstBooking = indexOfLastBooking - bookingsPerPage;
  const currentBookings = bookings.slice(indexOfFirstBooking, indexOfLastBooking);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div
      className={`min-h-screen flex ${darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-100 text-gray-800"}`}
    >
      <Sidebar />

      <main className="flex-1 p-6 space-y-8">
        <section>
          <h2 className="text-2xl font-bold mb-4">All Bookings</h2>
          <table
            className={`w-full text-left border-collapse ${
              darkMode ? "text-gray-300" : "text-gray-800"
            }`}
          >
            <thead>
              <tr
                className={`${
                  darkMode ? "bg-gray-700" : "bg-gray-200"
                } text-sm font-semibold`}
              >
                <th className="p-3">Service Name</th>
                <th className="p-3">Customer Name</th>
                <th className="p-3">Date</th>
                <th className="p-3">Status</th>
                <th className="p-3">Price</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            {loading ? (
              <Loader />
            ) : (
              <tbody>
                {currentBookings.map((booking, index) => (
                  <tr
                    key={booking.id}
                    className={`${
                      darkMode
                        ? index % 2 === 0
                          ? "bg-gray-800"
                          : "bg-gray-700"
                        : index % 2 === 0
                        ? "bg-white"
                        : "bg-gray-100"
                    }`}
                  >
                    <td className="p-3">{booking.serviceName}</td>
                    <td className="p-3">{booking.customerName}</td>
                    <td className="p-3">{booking.date}</td>
                    <td className="p-3">{booking.status}</td>
                    <td className="p-3">{booking.price}</td>
                    <td className="p-3 space-x-2">
                      <button
                        onClick={() => handleEditBooking(booking.id)}
                        className={`px-2 py-1 rounded-xl shadow-lg transition-all duration-300 ${
                          darkMode
                            ? "bg-blue-500 text-white hover:bg-blue-400 hover:scale-105"
                            : "bg-blue-400 text-white hover:bg-blue-300 hover:scale-105"
                        }`}
                      >
                        <i className="fas fa-edit"></i>
                      </button>
                      <button
                        onClick={() => handleDeleteBooking(booking.id)}
                        className={`px-2 py-1 rounded-full transition-all duration-300 ${
                          darkMode
                            ? "bg-red-600 text-white hover:bg-red-500 hover:scale-105"
                            : "bg-red-500 text-white hover:bg-red-400 hover:scale-105"
                        }`}
                      >
                        <i className="fas fa-trash"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            )}
          </table>

          {/* Pagination Component */}
          <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(bookings.length / bookingsPerPage)}
            onPageChange={paginate}
            siblingCount={1} // Optional: Display previous/next sibling pages
            pageRangeDisplayed={5} // Total number of page buttons to display
          />
        </section>
      </main>
    </div>
  );
};

export default AdminAllBooking;
