import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Sidebar from "./MechanicSidebar";
import Loader from "../../../components/Loader";
import Pagination from "../../../components/Pagination";

const MechanicDashboard = () => {
  const darkMode = useSelector((state) => state.darkMode.isDarkMode);
  const mechanic = useSelector((state) => state.userData?.user); // Mechanic info from Redux

  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [jobs, setJobs] = useState([]); // Store jobs from backend
  const [error, setError] = useState(null);
  
  const jobsPerPage = 3;

  // Fetch mechanic's assigned jobs from backend
  useEffect(() => {
    if (!mechanic?.userId) return;

    const fetchJobs = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/bookings/mechanic/${mechanic.userId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch mechanic's jobs.");
        }
        const data = await response.json();
        console.log(data);
        setJobs(data); 
        setError(null);
      } catch (err) {
        setError(err.message);
        setJobs([]);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [mechanic?.userId]);

  // Calculate total amount
  const totalAmount = jobs.reduce((sum, job) => sum + (job.totalAmount || 0), 0);

  // Pagination Logic
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = jobs.slice(indexOfFirstJob, indexOfLastJob);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className={`min-h-screen flex ${darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-100 text-gray-800"}`}>
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 p-6 space-y-8">
        {/* Job Statistics */}
        <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <div className={`p-6 rounded-lg shadow-md ${darkMode ? "bg-gray-800" : "bg-white"}`}>
            <h2 className="text-lg font-semibold">Total Jobs Taken</h2>
            <p className="text-2xl font-bold">{jobs.length}</p>
          </div>
          <div className={`p-6 rounded-lg shadow-md ${darkMode ? "bg-gray-800" : "bg-white"}`}>
            <h2 className="text-lg font-semibold">Jobs Completed</h2>
            <p className="text-2xl font-bold">{jobs.filter(job => job.bookingStatus === "COMPLETED").length}</p>
          </div>
          <div className={`p-6 rounded-lg shadow-md ${darkMode ? "bg-gray-800" : "bg-white"}`}>
            <h2 className="text-lg font-semibold">Pending Jobs</h2>
            <p className="text-2xl font-bold">{jobs.filter(job => job.bookingStatus === "PENDING").length }</p>
          </div>
          <div className={`p-6 rounded-lg shadow-md ${darkMode ? "bg-gray-800" : "bg-white"}`}>
            <h2 className="text-lg font-semibold">Total Amount</h2>
            <p className="text-2xl font-bold">₹{totalAmount.toFixed(2)}</p>
          </div>
        </section>

        {/* Recent Jobs Table */}
        <section>
          <h2 className="text-2xl font-bold mb-4">Recent Jobs</h2>

          {loading ? (
            <div className="flex justify-center items-center h-40">
              <Loader />
            </div>
          ) : error ? (
            <div className="text-red-500 text-center">{error}</div>
          ) : jobs.length === 0 ? (
            <p className="text-center text-gray-500">No jobs assigned yet.</p>
          ) : (
            <table className={`w-full text-left border-collapse ${darkMode ? "text-gray-300" : "text-gray-800"}`}>
              <thead>
                <tr className={`${darkMode ? "bg-gray-700" : "bg-gray-200"} text-sm font-semibold`}>
                  <th className="p-3">Customer Name</th>
                  <th className="p-3">Service</th>
                  <th className="p-3">Booking Date</th>
                  <th className="p-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {currentJobs.map((job, index) => (
                  <tr
                    key={index}
                    className={`${darkMode ? (index % 2 === 0 ? "bg-gray-800" : "bg-gray-700") : (index % 2 === 0 ? "bg-white" : "bg-gray-100")} hover:bg-gray-300 dark:hover:bg-gray-700`}
                  >
                    <td className="p-3">{job.user?.name || "Unknown"}</td>
                    <td className="p-3">{job.services?.map(service => service.name).join(", ")}</td>
                    <td className="p-3">{job.bookingDate || "N/A"}</td>
                    <td className={`p-3 font-semibold`}>{job.bookingStatus}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {/* Pagination */}
          <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(jobs.length / jobsPerPage)}
            onPageChange={paginate}
            siblingCount={1}
            pageRangeDisplayed={5}
          />
        </section>
      </main>
    </div>
  );
};

export default MechanicDashboard;
