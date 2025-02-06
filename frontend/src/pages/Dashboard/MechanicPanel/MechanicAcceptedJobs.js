import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Sidebar from "./MechanicSidebar";
import Loader from "../../../components/Loader";
import Pagination from "../../../components/Pagination";

// Function to fetch accepted jobs (moved outside the component)
const fetchAcceptedJobs = async (mechanic, setAcceptedJobs, setLoading, setError) => {
  try {
    const response = await fetch(
      `http://localhost:8080/api/bookings/mechanic/${mechanic.userId}?status=ACCEPTED`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch accepted jobs");
    }
    const data = await response.json();
    setAcceptedJobs(data);
    setError(null); // Clear any previous error messages
  } catch (error) {
    setError(error.message);
  } finally {
    setLoading(false);
  }
};

const MechanicAcceptedJobs = () => {
  const darkMode = useSelector((state) => state.darkMode.isDarkMode);
  const mechanic = useSelector((state) => state.userData?.user);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [jobsPerPage] = useState(3);
  const [acceptedJobs, setAcceptedJobs] = useState([]);
  const [error, setError] = useState(null);

  // Fetch jobs when mechanic.userId changes
  useEffect(() => {
    setLoading(true);
    fetchAcceptedJobs(mechanic, setAcceptedJobs, setLoading, setError);
  }, [mechanic.userId]);

  // Pagination logic
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = acceptedJobs.slice(indexOfFirstJob, indexOfLastJob);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Update job status
  const updateJobStatus = async (bookingId, status) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/bookings/${bookingId}/${mechanic.userId}`,
        {
          method: "Patch",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status }),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to update job status");
      }
      // Re-fetch jobs after updating status
      fetchAcceptedJobs(mechanic, setAcceptedJobs, setLoading, setError);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div
      className={`min-h-screen flex ${darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-100 text-gray-800"}`}
    >
      <Sidebar />
      <main className="flex-1 p-6 space-y-8">
        <section>
          <h2 className="text-2xl font-bold mb-4">Accepted Jobs</h2>
          {loading ? (
            <div className="flex justify-center items-center h-40">
              <Loader />
            </div>
          ) : error ? (
            <p className="text-gray-500">{error}</p>
          ) : acceptedJobs.length === 0 ? (
            <p className="text-center text-gray-500">No accepted jobs available.</p>
          ) : (
            <>
              <table
                className={`w-full text-left border-collapse ${darkMode ? "text-gray-300" : "text-gray-800"}`}
              >
                <thead>
                  <tr className={`${darkMode ? "bg-gray-700" : "bg-gray-200"} text-sm font-semibold`}>
                    <th className="p-3">Booking ID</th>
                    <th className="p-3">Customer Name</th>
                    <th className="p-3">Car Details</th>
                    <th className="p-3">Status</th>
                    <th className="p-3">Total Amount</th>
                    <th className="p-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentJobs.map((job, index) => (
                    <tr
                      key={job.bookingId}
                      className={`${darkMode
                        ? index % 2 === 0
                          ? "bg-gray-800"
                          : "bg-gray-700"
                        : index % 2 === 0
                        ? "bg-white"
                        : "bg-gray-100"}`}
                    >
                      <td className="p-3">{job.bookingId}</td>
                      <td className="p-3">{job.user.name}</td>
                      <td className="p-3">
                        {job.car.company} {job.car.model} ({job.car.fuelType})
                      </td>
                      <td className="p-3">{job.bookingStatus}</td>
                      <td className="p-3">${job.totalAmount.toFixed(2)}</td>
                      <td className="p-3">
                        <select
                          value={job.bookingStatus}
                          onChange={(e) => updateJobStatus(job.bookingId, e.target.value)}
                          className={`p-2 rounded-lg shadow-md transition focus:outline-none ${
                            darkMode
                              ? "bg-gray-800 text-gray-300 hover:bg-gray-700"
                              : "bg-white text-gray-800 hover:bg-gray-200"
                          }`}
                        >
                          <option value="ACCEPTED">Accepted</option>
                          <option value="PENDING">Pending</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <Pagination
                currentPage={currentPage}
                totalPages={Math.ceil(acceptedJobs.length / jobsPerPage)}
                onPageChange={paginate}
                siblingCount={1}
                pageRangeDisplayed={5}
              />
            </>
          )}
        </section>
      </main>
    </div>
  );
};

export default MechanicAcceptedJobs;
