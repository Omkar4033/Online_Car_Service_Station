import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Sidebar from "./AdminSidebar"; // Adjust the import path as needed
import Loader from "../../../components/Loader";
import { Bar, Line } from "react-chartjs-2";
import "chart.js/auto";

const AdminReports = () => {
  const darkMode = useSelector((state) => state.darkMode.isDarkMode);
  const [loading, setLoading] = useState(true);
  const [bookingsData, setBookingsData] = useState({ monthly: [], yearly: [] });
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const bookingsResponse = await fetch("http://localhost:8080/api/admin/bookings");
        
        if (!bookingsResponse.ok) {
          throw new Error("Failed to fetch data");
        }
        
        const bookings = await bookingsResponse.json();

        const monthlyBookings = new Array(12).fill(0);
        const yearlyBookings = new Array(12).fill(0);
        
        bookings.forEach((booking) => {
          const date = new Date(booking.bookingDate);
          monthlyBookings[date.getMonth()] += 1;
          yearlyBookings[date.getFullYear() - 2012] += 1;
        });

        setBookingsData({ monthly: monthlyBookings, yearly: yearlyBookings });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchReports();
  }, []);

  if (loading) return <Loader />;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className={`min-h-screen flex overflow-hidden ${darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-100 text-gray-800"}`}>
      <Sidebar />
      <main className="flex-1 p-6 space-y-8 overflow-y-auto grid grid-cols-1 sm:grid-cols-2 gap-8">
        {/* Bookings Report */}
        <section className="h-[50vh]">
          <h2 className="text-2xl font-bold mb-4">Bookings Report</h2>
          <Bar
            data={{
              labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
              datasets: [
                {
                  label: "Bookings",
                  data: bookingsData.monthly,
                  backgroundColor: darkMode ? "#4F46E5" : "#6366F1",
                },
              ],
            }}
            options={{ maintainAspectRatio: false }}
          />
        </section>

        <section className="h-[50vh]">
          <Line
            data={{
              labels: ["2012", "2013", "2014", "2015", "2016", "2017", "2018", "2019", "2020", "2021", "2022", "2023"],
              datasets: [
                {
                  label: "Bookings",
                  data: bookingsData.yearly,
                  borderColor: darkMode ? "#4F46E5" : "#6366F1",
                  fill: false,
                },
              ],
            }}
            options={{ maintainAspectRatio: false }}
          />
        </section>
      </main>
    </div>
  );
};

export default AdminReports;
