import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Sidebar from "./AdminSidebar"; // Adjust the import path as needed
import Loader from "../../../components/Loader";
import { Bar, Line } from "react-chartjs-2";
import "chart.js/auto";

const AdminReports = () => {
  const darkMode = useSelector((state) => state.darkMode.isDarkMode);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

 

  const bookingsData = {
    monthly: [12, 15, 20, 18, 24, 30, 28, 25, 22, 19, 16, 14],
    yearly: [200, 220, 230, 250, 280, 300, 320, 310, 290, 270, 260, 240],
  };

  const usersData = {
    monthly: [5, 8, 12, 15, 10, 20, 18, 22, 25, 30, 35, 40],
    yearly: [120, 150, 180, 200, 220, 250, 270, 290, 310, 330, 350, 370],
  };

  const servicesData = {
    monthly: [1000, 1200, 1500, 1400, 1600, 1700, 1800, 1900, 2000, 2100, 2200, 2300],
    yearly: [12000, 14000, 15000, 16000, 17000, 18000, 19000, 20000, 21000, 22000, 23000, 24000],
  };

  return (
    <div
      className={`min-h-screen flex overflow-hidden ${
        darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-100 text-gray-800"
      }`}
    >
      <Sidebar />
      <main className="flex-1 p-6 space-y-8 overflow-y-auto grid grid-cols-1 sm:grid-cols-2 gap-8">
        {/* Bookings Report */}
        <section className="h-[50vh]">
          <h2 className="text-2xl font-bold mb-4">
            Bookings Report
          </h2>
          <div className="h-full">
            <h3 className="text-lg font-semibold">
              Monthly
            </h3>
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
              options={{
                maintainAspectRatio: false,
                scales: {
                  y: {
                    ticks: {
                      color: darkMode ? "#E5E7EB" : "#1F2937", // Change tick color based on mode
                    },
                    grid: {
                      color: darkMode ? "#374151" : "#D1D5DB", // Grid line color adjustment
                    },
                  },
                  x: {
                    ticks: {
                      color: darkMode ? "#E5E7EB" : "#1F2937", // Change tick color based on mode
                    },
                    grid: {
                      color: darkMode ? "#374151" : "#D1D5DB", // Grid line color adjustment
                    },
                  },
                },
              }}
            />
          </div>
        </section>

        <section className="h-[50vh]">
          <h3 className="text-lg font-semibold">
            Yearly
          </h3>
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
            options={{
              maintainAspectRatio: false,
              scales: {
                y: {
                  ticks: {
                    color: darkMode ? "#E5E7EB" : "#1F2937", // Change tick color based on mode
                  },
                  grid: {
                    color: darkMode ? "#374151" : "#D1D5DB", // Grid line color adjustment
                  },
                },
                x: {
                  ticks: {
                    color: darkMode ? "#E5E7EB" : "#1F2937", // Change tick color based on mode
                  },
                  grid: {
                    color: darkMode ? "#374151" : "#D1D5DB", // Grid line color adjustment
                  },
                },
              },
            }}
          />
        </section>

        {/* Users Report */}
        <section className="h-[50vh]">
          <h2 className="text-2xl font-bold mb-4">
            Users Report
          </h2>
          <div className="h-full">
            <h3 className="text-lg font-semibold">
              Monthly
            </h3>
            <Bar
              data={{
                labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
                datasets: [
                  {
                    label: "Users",
                    data: usersData.monthly,
                    backgroundColor: darkMode ? "#D97706" : "#F59E0B",
                  },
                ],
              }}
              options={{
                maintainAspectRatio: false,
                scales: {
                  y: {
                    ticks: {
                      color: darkMode ? "#E5E7EB" : "#1F2937", // Change tick color based on mode
                    },
                    grid: {
                      color: darkMode ? "#374151" : "#D1D5DB", // Grid line color adjustment
                    },
                  },
                  x: {
                    ticks: {
                      color: darkMode ? "#E5E7EB" : "#1F2937", // Change tick color based on mode
                    },
                    grid: {
                      color: darkMode ? "#374151" : "#D1D5DB", // Grid line color adjustment
                    },
                  },
                },
              }}
            />
          </div>
        </section>

        <section className="h-[50vh]">
          <h3 className="text-lg font-semibold">
            Yearly
          </h3>
          <Line
            data={{
              labels: ["2012", "2013", "2014", "2015", "2016", "2017", "2018", "2019", "2020", "2021", "2022", "2023"],
              datasets: [
                {
                  label: "Users",
                  data: usersData.yearly,
                  borderColor: darkMode ? "#D97706" : "#F59E0B",
                  fill: false,
                },
              ],
            }}
            options={{
              maintainAspectRatio: false,
              scales: {
                y: {
                  ticks: {
                    color: darkMode ? "#E5E7EB" : "#1F2937", // Change tick color based on mode
                  },
                  grid: {
                    color: darkMode ? "#374151" : "#D1D5DB", // Grid line color adjustment
                  },
                },
                x: {
                  ticks: {
                    color: darkMode ? "#E5E7EB" : "#1F2937", // Change tick color based on mode
                  },
                  grid: {
                    color: darkMode ? "#374151" : "#D1D5DB", // Grid line color adjustment
                  },
                },
              },
            }}
          />
        </section>

        {/* Services Report */}
        <section className="h-[50vh]">
          <h2 className="text-2xl font-bold mb-4">
            Services Report
          </h2>
          <div className="h-full">
            <h3 className="text-lg font-semibold">
              Monthly
            </h3>
            <Bar
              data={{
                labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
                datasets: [
                  {
                    label: "Revenue ($)",
                    data: servicesData.monthly,
                    backgroundColor: darkMode ? "#10B981" : "#34D399",
                  },
                ],
              }}
              options={{
                maintainAspectRatio: false,
                scales: {
                  y: {
                    ticks: {
                      color: darkMode ? "#E5E7EB" : "#1F2937", // Change tick color based on mode
                    },
                    grid: {
                      color: darkMode ? "#374151" : "#D1D5DB", // Grid line color adjustment
                    },
                  },
                  x: {
                    ticks: {
                      color: darkMode ? "#E5E7EB" : "#1F2937", // Change tick color based on mode
                    },
                    grid: {
                      color: darkMode ? "#374151" : "#D1D5DB", // Grid line color adjustment
                    },
                  },
                },
              }}
            />
          </div>
        </section>

        <section className="h-[50vh]">
          <h3 className="text-lg font-semibold ">
            Yearly
          </h3>
          <Line
            data={{
              labels: ["2012", "2013", "2014", "2015", "2016", "2017", "2018", "2019", "2020", "2021", "2022", "2023"],
              datasets: [
                {
                  label: "Revenue ($)",
                  data: servicesData.yearly,
                  borderColor: darkMode ? "#10B981" : "#34D399",
                  fill: false,
                },
              ],
            }}
            options={{
              maintainAspectRatio: false,
              scales: {
                y: {
                  ticks: {
                    color: darkMode ? "#E5E7EB" : "#1F2937", // Change tick color based on mode
                  },
                  grid: {
                    color: darkMode ? "#374151" : "#D1D5DB", // Grid line color adjustment
                  },
                },
                x: {
                  ticks: {
                    color: darkMode ? "#E5E7EB" : "#1F2937", // Change tick color based on mode
                  },
                  grid: {
                    color: darkMode ? "#374151" : "#D1D5DB", // Grid line color adjustment
                  },
                },
              },
            }}
          />
        </section>
      </main>
    </div>
  );
};

export default AdminReports;
