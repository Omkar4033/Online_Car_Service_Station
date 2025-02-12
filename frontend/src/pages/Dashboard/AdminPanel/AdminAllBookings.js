import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Sidebar from "./AdminSidebar";
import Loader from "../../../components/Loader";
import Pagination from "../../../components/Pagination";

const AdminAllBooking = () => {
  const darkMode = useSelector((state) => state.darkMode.isDarkMode);

  const [loading, setLoading] = useState(true);
  const [bookings, setBookings] = useState([]);
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [bookingsPerPage] = useState(5);
  const [selectedStatus, setSelectedStatus] = useState("PENDING");

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/admin/bookings");
      if (!response.ok) throw new Error("Failed to fetch bookings");
      const data = await response.json();

      const formattedBookings = data.map((booking) => ({
        id: booking.bookingId,
        serviceName: `${booking.car.company} ${booking.car.model}`,
        customerName: booking.user.name,
        date: new Date(booking.bookingDate).toLocaleDateString(),
        status: booking.bookingStatus,
        price: `$${booking.totalAmount.toFixed(2)}`,
        services: booking.services.map(service => service.name).join(", ") // Extract service names
      }));

      setBookings(formattedBookings);
      filterBookingsByStatus(formattedBookings, selectedStatus);
    } catch (error) {
      console.error("Error fetching bookings:", error);
    } finally {
      setLoading(false);
    }
  };

  const filterBookingsByStatus = (allBookings, status) => {
    const filtered = allBookings.filter((booking) => booking.status === status);
    setFilteredBookings(filtered);
    setCurrentPage(1);
  };

  const handleStatusChange = (status) => {
    setSelectedStatus(status);
    filterBookingsByStatus(bookings, status);
  };

  const indexOfLastBooking = currentPage * bookingsPerPage;
  const indexOfFirstBooking = indexOfLastBooking - bookingsPerPage;
  const currentBookings = filteredBookings.slice(indexOfFirstBooking, indexOfLastBooking);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className={`min-h-screen flex ${darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-100 text-gray-800"}`}>
      <Sidebar />

      <main className="flex-1 p-6 space-y-8">
        <section>
          <h2 className="text-2xl font-bold mb-4">All Bookings</h2>

          <div className="mb-4 flex space-x-4">
            {["PENDING", "ACCEPTED", "COMPLETED", "CANCELED"].map((status) => (
              <button
                key={status}
                onClick={() => handleStatusChange(status)}
                className={`px-4 py-2 rounded-xl rounded ${selectedStatus === status ? "bg-blue-600 text-white" : "bg-gray-300 text-black"}`}
              >
                {status}
              </button>
            ))}
          </div>

          {loading ? (
            <Loader />
          ) : (
            <>
              {filteredBookings.length > 0 ? (
                <table className={`w-full text-left border-collapse ${darkMode ? "text-gray-300" : "text-gray-800"}`}>
                  <thead>
                    <tr className={`${darkMode ? "bg-gray-700" : "bg-gray-200"} text-sm font-semibold`}>
                      <th className="p-3">Car Name</th>
                      <th className="p-3">Customer Name</th>
                      <th className="p-3">Date</th>
                      <th className="p-3">Status</th>
                      <th className="p-3">Price</th>
                      <th className="p-3">Services</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentBookings.map((booking, index) => (
                      <tr
                        key={booking.id}
                        className={`${darkMode ? (index % 2 === 0 ? "bg-gray-800" : "bg-gray-700") : (index % 2 === 0 ? "bg-white" : "bg-gray-100")}`}
                      >
                        <td className="p-3">{booking.serviceName}</td>
                        <td className="p-3">{booking.customerName}</td>
                        <td className="p-3">{booking.date}</td>
                        <td className="p-3">{booking.status}</td>
                        <td className="p-3">₹{booking.price}</td>
                        <td className="p-3">{booking.services}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p className="text-center text-gray-500">No bookings found for this status.</p>
              )}

              <Pagination currentPage={currentPage} totalPages={Math.ceil(filteredBookings.length / bookingsPerPage)} onPageChange={paginate} />
            </>
          )}
        </section>
      </main>
    </div>
  );
};

export default AdminAllBooking;
