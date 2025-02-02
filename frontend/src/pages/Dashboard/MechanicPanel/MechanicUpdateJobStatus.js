import React, { useState } from "react";
import { useSelector } from "react-redux";
import Sidebar from "./MechanicSidebar";

const MechanicUpdateJobStatus = () => {
  const darkMode = useSelector((state) => state.darkMode.isDarkMode);
  const [status, setStatus] = useState("Pending");

  const handleStatusChange = (e) => setStatus(e.target.value);

  return (
    <div className={`min-h-screen flex ${darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-100 text-gray-800"}`}>
      <Sidebar />
      <main className="flex-1 p-6 space-y-8">
        <section>
          <h2 className="text-2xl font-bold mb-4">Update Job Status</h2>
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <label htmlFor="status" className="text-lg">Job Status:</label>
              <select id="status" value={status} onChange={handleStatusChange} className="p-2 border rounded-lg">
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default MechanicUpdateJobStatus;
