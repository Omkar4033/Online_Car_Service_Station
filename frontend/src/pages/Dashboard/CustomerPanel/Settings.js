import React, { useState } from "react";
import { useSelector } from "react-redux";

const Settings = () => {
  const darkMode = useSelector((state) => state.darkMode.isDarkMode); // Assuming Redux state for dark mode

  const [userData, setUserData] = useState({
    fullName: "John Doe",
    email: "johndoe@example.com",
    phone: "123-456-7890",
    address: "123 Main Street, Springfield",
  });

  const [vehicles, setVehicles] = useState([
    { id: 1, make: "Toyota", model: "Camry", year: "2019", registration: "ABC123" },
    { id: 2, make: "Honda", model: "Civic", year: "2020", registration: "XYZ789" },
  ]);

  const [newVehicle, setNewVehicle] = useState({
    make: "",
    model: "",
    year: "",
    registration: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleVehicleInputChange = (e) => {
    const { name, value } = e.target;
    setNewVehicle({ ...newVehicle, [name]: value });
  };

  
  const handleAddVehicle = () => {
    if (newVehicle.make && newVehicle.model && newVehicle.year && newVehicle.registration) {
      setVehicles([...vehicles, { ...newVehicle, id: vehicles.length + 1 }]);
      setNewVehicle({ make: "", model: "", year: "", registration: "" });
    } else {
      alert("Please fill in all vehicle details.");
    }
  };
  
  console.log(handleVehicleInputChange());
  console.log(handleAddVehicle());

  const handleSaveChanges = () => {
    alert("Profile updated successfully!");
  };

  return (
    <div
      className={`min-h-screen flex justify-center items-center p-4 ${
        darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-100 text-gray-800"
      }`}
    >
      <div
        className={`max-w-4xl w-full p-8 rounded-lg shadow-lg ${
          darkMode ? "bg-gray-800" : "bg-white"
        }`}
      >
        {/* Header */}
        <header className="text-center mb-8">
          <h1 className="text-3xl font-semibold">Profile Settings</h1>
          <p className="text-gray-500">Edit your personal details and manage vehicles</p>
        </header>

        {/* Profile Information Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-6">Profile Information</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium">Full Name</label>
              <input
                type="text"
                name="fullName"
                value={userData.fullName}
                onChange={handleInputChange}
                className={`w-full p-3 rounded-lg border ${
                  darkMode
                    ? "border-gray-700 bg-gray-700 text-white"
                    : "border-gray-300 bg-white text-gray-800"
                } shadow-sm focus:ring-2 focus:ring-blue-500`}
              />
            </div>
            {/* Email */}
            <div>
              <label className="block text-sm font-medium">Email</label>
              <input
                type="email"
                name="email"
                value={userData.email}
                onChange={handleInputChange}
                className={`w-full p-3 rounded-lg border ${
                  darkMode
                    ? "border-gray-700 bg-gray-700 text-white"
                    : "border-gray-300 bg-white text-gray-800"
                } shadow-sm focus:ring-2 focus:ring-blue-500`}
              />
            </div>
            {/* Phone */}
            <div>
              <label className="block text-sm font-medium">Phone</label>
              <input
                type="tel"
                name="phone"
                value={userData.phone}
                onChange={handleInputChange}
                className={`w-full p-3 rounded-lg border ${
                  darkMode
                    ? "border-gray-700 bg-gray-700 text-white"
                    : "border-gray-300 bg-white text-gray-800"
                } shadow-sm focus:ring-2 focus:ring-blue-500`}
              />
            </div>
            {/* Address */}
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium">Address</label>
              <textarea
                name="address"
                value={userData.address}
                onChange={handleInputChange}
                className={`w-full p-3 rounded-lg border ${
                  darkMode
                    ? "border-gray-700 bg-gray-700 text-white"
                    : "border-gray-300 bg-white text-gray-800"
                } shadow-sm focus:ring-2 focus:ring-blue-500`}
              />
            </div>
          </div>
        </div>

        {/* Vehicle Management Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-6">My Vehicles</h2>

          {/* Vehicle List */}
          <div className="mb-6 space-y-4">
            {vehicles.map((vehicle) => (
              <div
                key={vehicle.id}
                className={`${
                  darkMode ? "bg-gray-800 text-white" : "bg-gray-50 text-gray-800"
                } p-4 rounded-lg shadow-sm border flex justify-between items-center`}
              >
                <div>
                  <p className="text-lg font-semibold">{vehicle.make} {vehicle.model} ({vehicle.year})</p>
                  <p className="text-sm">Reg. Number: {vehicle.registration}</p>
                </div>
              </div>
            ))}
          </div>

         
        </div>

        {/* Save Changes Button */}
        <div className="text-center">
          <div
            onClick={handleSaveChanges}
            className={`w-full py-3 rounded-lg ${
              darkMode ? "bg-yellow-600 text-white" : "bg-yellow-600 text-white"
            } text-center cursor-pointer hover:bg-yellow-700 transition duration-200`}
          >
            Save Changes
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
