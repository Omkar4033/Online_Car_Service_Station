import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Sidebar from "./AdminSidebar";
import Loader from "../../../components/Loader";
import Pagination from "../../../components/Pagination";

const AdminDashboard = () => {
  const darkMode = useSelector((state) => state.darkMode.isDarkMode);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState(null);
  const bookingsPerPage = 3;

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/admin/bookings");
        if (!response.ok) {
          throw new Error("Failed to fetch bookings.");
        }
        const data = await response.json();
        setBookings(data);
        console.log(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, []);

  const bookingStats = {
    total: bookings.length,
    pending: bookings.filter(b => b.bookingStatus === "PENDING").length,
    assigned: bookings.filter(b => b.bookingStatus === "ACCEPTED").length,
    completed: bookings.filter(b => b.bookingStatus === "COMPLETED").length,
    rejected: bookings.filter(b => b.bookingStatus === "REJECTED").length,
    totalAmount: bookings.reduce((sum, b) => sum + (b.totalAmount || 0), 0)
  };

  const indexOfLastBooking = currentPage * bookingsPerPage;
  const indexOfFirstBooking = indexOfLastBooking - bookingsPerPage;
  const currentBookings = bookings.slice(indexOfFirstBooking, indexOfLastBooking);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className={`min-h-screen flex ${darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-100 text-gray-800"}`}>
      <Sidebar />
      <main className="flex-1 p-6 space-y-8">
        <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <div className={`p-6 rounded-lg shadow-md text-center ${darkMode ? "bg-gray-800" : "bg-white"}`}>
            <h2 className="text-lg font-semibold">Total Bookings</h2>
            <p className="text-2xl font-bold mt-2">{bookingStats.total}</p>
          </div>
          <div className={`p-6 rounded-lg shadow-md text-center ${darkMode ? "bg-gray-800" : "bg-white"}`}>
            <h2 className="text-lg font-semibold">Pending Bookings</h2>
            <p className="text-2xl font-bold mt-2">{bookingStats.pending}</p>
          </div>
          <div className={`p-6 rounded-lg shadow-md text-center ${darkMode ? "bg-gray-800" : "bg-white"}`}>
            <h2 className="text-lg font-semibold">Accepted Bookings</h2>
            <p className="text-2xl font-bold mt-2">{bookingStats.assigned}</p>
          </div>
          <div className={`p-6 rounded-lg shadow-md text-center ${darkMode ? "bg-gray-800" : "bg-white"}`}>
            <h2 className="text-lg font-semibold">Completed Bookings</h2>
            <p className="text-2xl font-bold mt-2">{bookingStats.completed}</p>
          </div>
          <div className={`p-6 rounded-lg shadow-md text-center ${darkMode ? "bg-gray-800" : "bg-white"}`}>
            <h2 className="text-lg font-semibold">Rejected Orders</h2>
            <p className="text-2xl font-bold mt-2">{bookingStats.rejected}</p>
          </div>
          <div className={`p-6 rounded-lg shadow-md text-center ${darkMode ? "bg-gray-800" : "bg-white"}`}>
            <h2 className="text-lg font-semibold">Total Amount</h2>
            <p className="text-2xl font-bold mt-2">₹{bookingStats.totalAmount.toFixed(2)}</p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Recent Bookings</h2>
          {loading ? (
            <Loader />
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse shadow-md rounded-lg overflow-hidden">
                <thead>
                  <tr className="bg-gray-200 dark:bg-gray-700 text-sm font-semibold">
                    <th className="p-4">Customer Name</th>
                    <th className="p-4">Service</th>
                    <th className="p-4">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {currentBookings.map((booking, index) => (
                    <tr key={index} className={`${index % 2 === 0 ? "bg-white dark:bg-gray-800" : "bg-gray-100 dark:bg-gray-700"} hover:bg-gray-300 dark:hover:bg-gray-600`}>
                      <td className="p-4">{booking.user?.name || "Unknown"}</td>
                      <td className="p-4">{booking.services?.map(s => s.name).join(", ")}</td>
                      <td className="p-4 font-semibold">{booking.bookingStatus}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          <Pagination currentPage={currentPage} totalPages={Math.ceil(bookings.length / bookingsPerPage)} onPageChange={paginate} />
        </section>
      </main>
    </div>
  );
};

export default AdminDashboard;
