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

  const [formError, setFormError] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleVehicleInputChange = (e) => {
    const { name, value } = e.target;
    setNewVehicle({ ...newVehicle, [name]: value });
  };

  const handleAddVehicle = () => {
    if (!newVehicle.make || !newVehicle.model || !newVehicle.year || !newVehicle.registration) {
      setFormError("Please fill in all fields to add a vehicle.");
      return;
    }
    setFormError("");
    setVehicles([...vehicles, { ...newVehicle, id: vehicles.length + 1 }]);
    setNewVehicle({ make: "", model: "", year: "", registration: "" });
  };

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
        <header className="text-center mb-8">
          <h1 className="text-3xl font-semibold">Profile Settings</h1>
          <p className="text-gray-500">Edit your personal details and manage vehicles</p>
        </header>

        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-6">Profile Information</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {["fullName", "email", "phone", "address"].map((field) => (
              <div key={field}>
                <label className="block text-sm font-medium capitalize">{field}</label>
                <input
                  type={field === "email" ? "email" : field === "phone" ? "tel" : "text"}
                  name={field}
                  value={userData[field]}
                  onChange={handleInputChange}
                  className={`w-full p-3 rounded-lg border ${
                    darkMode
                      ? "border-gray-700 bg-gray-700 text-white"
                      : "border-gray-300 bg-white text-gray-800"
                  } shadow-sm focus:ring-2 focus:ring-blue-500`}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-6">My Vehicles</h2>
          <div className="mb-6 space-y-4">
            {vehicles.map((vehicle) => (
              <div
                key={vehicle.id}
                className={`${
                  darkMode ? "bg-gray-800 text-white" : "bg-gray-50 text-gray-800"
                } p-4 rounded-lg shadow-sm border`}
              >
                <p className="text-lg font-semibold">
                  {vehicle.make} {vehicle.model} ({vehicle.year})
                </p>
                <p className="text-sm">Reg. Number: {vehicle.registration}</p>
              </div>
            ))}
          </div>

          <h3 className="text-xl font-semibold mb-4">Add New Vehicle</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {["make", "model", "year", "registration"].map((field) => (
              <div key={field}>
                <label className="block text-sm font-medium capitalize">{field}</label>
                <input
                  type="text"
                  name={field}
                  value={newVehicle[field]}
                  onChange={handleVehicleInputChange}
                  className={`w-full p-3 rounded-lg border ${
                    darkMode
                      ? "border-gray-700 bg-gray-700 text-white"
                      : "border-gray-300 bg-white text-gray-800"
                  } shadow-sm focus:ring-2 focus:ring-blue-500`}
                />
              </div>
            ))}
          </div>
          {formError && <p className="text-red-500 mt-2">{formError}</p>}
          <button
            onClick={handleAddVehicle}
            className="w-full mt-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Add Vehicle
          </button>
        </div>

        <div className="text-center">
          <button
            onClick={handleSaveChanges}
            className={`w-full py-3 rounded-lg ${
              darkMode ? "bg-yellow-600" : "bg-blue-600"
            } text-white hover:bg-yellow-700`}
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
