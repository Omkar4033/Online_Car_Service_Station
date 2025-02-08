import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Sidebar from "./MechanicSidebar";
import Loader from "../../../components/Loader";
import Pagination from "../../../components/Pagination";

const MechanicAcceptedJobs = () => {
  const darkMode = useSelector((state) => state.darkMode.isDarkMode);
  const mechanic = useSelector((state) => state.userData?.user);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [jobsPerPage] = useState(3);
  const [acceptedJobs, setAcceptedJobs] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAcceptedJobs = async () => {
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:8080/api/bookings/mechanic/${mechanic.userId}?status=ACCEPTED`);
        if (!response.ok) throw new Error("Failed to fetch accepted jobs");
        const data = await response.json();
        setAcceptedJobs(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchAcceptedJobs();
  }, [mechanic.userId]);

  const updateJobStatus = async (bookingId, status, customerPhoneNo) => {
    try {
      const response = await fetch(`http://localhost:8080/api/bookings/${bookingId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          status,
          mechanicId: mechanic.userId,
          customerPhoneNo,
        }),
      });
      if (!response.ok) throw new Error("Failed to update job status");
      setAcceptedJobs((prevJobs) => prevJobs.filter((job) => job.bookingId !== bookingId));
    } catch (error) {
      setError(error.message);
    }
  };

  const handleCompleteJob = (bookingId) => {
    navigate(`/mechanic/complete-job/${bookingId}`);
  };

  return (
    <div className={`min-h-screen flex ${darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-100 text-gray-800"}`}>
      <Sidebar />
      <main className="flex-1 p-6 space-y-8">
        <h2 className="text-2xl font-bold mb-4">Accepted Jobs</h2>
        {loading ? (
          <Loader />
        ) : error ? (
          <p className="text-gray-500">{error}</p>
        ) : acceptedJobs.length === 0 ? (
          <p className="text-center text-gray-500">No accepted jobs available.</p>
        ) : (
          <>
            <table className={`w-full text-left border-collapse ${darkMode ? "text-gray-300" : "text-gray-800"}`}>
              <thead>
                <tr className={`${darkMode ? "bg-gray-700" : "bg-gray-200"} text-sm font-semibold`}>
                  <th className="p-3">Booking ID</th>
                  <th className="p-3">Customer Name</th>
                  <th className="p-3">Car Details</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Actions</th>
                  <th className="p-3">Complete Order</th>
                </tr>
              </thead>
              <tbody>
                {acceptedJobs.slice((currentPage - 1) * jobsPerPage, currentPage * jobsPerPage).map((job, index) => (
                  <tr key={job.bookingId} className={`${darkMode ? (index % 2 === 0 ? "bg-gray-800" : "bg-gray-700") : (index % 2 === 0 ? "bg-white" : "bg-gray-100")}`}>
                    <td className="p-3">{job.bookingId}</td>
                    <td className="p-3">{job.user.name}</td>
                    <td className="p-3">{job.car.company} {job.car.model} ({job.car.fuelType})</td>
                    <td className="p-3">{job.bookingStatus}</td>
                    <td className="p-3">
                      <select
                        value={job.bookingStatus}
                        onChange={(e) => updateJobStatus(job.bookingId, e.target.value, job.user.phoneNo)}
                        className={`p-2 rounded-lg shadow-md transition focus:outline-none ${darkMode ? "bg-gray-800 text-gray-300 hover:bg-gray-700" : "bg-white text-gray-800 hover:bg-gray-200"}`}
                      >
                        <option value="ACCEPTED">Accepted</option>
                        <option value="PENDING">Reject</option>
                      </select>
                    </td>
                    <td className="p-3">
                      <button
                        onClick={() => handleCompleteJob(job.bookingId)}
                        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md transition"
                      >
                        Complete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <Pagination
              currentPage={currentPage}
              totalPages={Math.ceil(acceptedJobs.length / jobsPerPage)}
              onPageChange={setCurrentPage}
            />
          </>
        )}
      </main>
    </div>
  );
};

export default MechanicAcceptedJobs;
