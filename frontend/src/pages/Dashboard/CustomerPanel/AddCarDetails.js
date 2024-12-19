import React, { useState } from "react";
import { useSelector } from "react-redux";

const AddCarDetails = ({ setIsAddingCar }) => {
  const darkMode = useSelector((state) => state.darkMode.isDarkMode);
  const [carDetails, setCarDetails] = useState({
    make: "",
    model: "",
    year: "",
    registration: "",
  });

  // const [successMessage, setSuccessMessage] = useState("");

  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCarDetails({ ...carDetails, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { make, model, year, registration } = carDetails;

    if (!make || !model || !year || !registration) {
      alert("All fields are required!");
      return;
    }

   // setSuccessMessage("Car details added successfully!");
    setCarDetails({ make: "", model: "", year: "", registration: "" });
  
  };

  return (
    <div
      className={`min-h-screen flex items-start justify-center ${
        darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-100 text-gray-800"
      }`}
    >
      <div
        className={`p-8 rounded-md shadow-lg w-full max-w-md ${
          darkMode ? "bg-gray-800" : "bg-white"
        }`}
        style={{ marginTop: "10px" }} // Adjust the top margin to move the form upwards
      >
        <h1 className="text-2xl font-bold text-center mb-6">Add Car Details</h1>

        {/* {successMessage && (
          <div
            className={`p-3 rounded-md mb-4 ${
              darkMode
                ? "bg-green-700 text-green-100"
                : "bg-green-100 text-green-700"
            }`}
          >
            {successMessage}
          </div>
        )} */}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Make</label>
            <input
              type="text"
              name="make"
              value={carDetails.make}
              onChange={handleInputChange}
              className={`w-full p-2 rounded-md border ${
                darkMode
                  ? "border-gray-700 bg-gray-700 text-gray-100"
                  : "border-gray-300"
              }`}
              placeholder="e.g., Toyota"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Model</label>
            <input
              type="text"
              name="model"
              value={carDetails.model}
              onChange={handleInputChange}
              className={`w-full p-2 rounded-md border ${
                darkMode
                  ? "border-gray-700 bg-gray-700 text-gray-100"
                  : "border-gray-300"
              }`}
              placeholder="e.g., Corolla"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Year</label>
            <input
              type="number"
              name="year"
              value={carDetails.year}
              onChange={handleInputChange}
              className={`w-full p-2 rounded-md border ${
                darkMode
                  ? "border-gray-700 bg-gray-700 text-gray-100"
                  : "border-gray-300"
              }`}
              placeholder="e.g., 2021"
              min="1900"
              max={new Date().getFullYear()}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Registration
            </label>
            <input
              type="text"
              name="registration"
              value={carDetails.registration}
              onChange={handleInputChange}
              className={`w-full p-2 rounded-md border ${
                darkMode
                  ? "border-gray-700 bg-gray-700 text-gray-100"
                  : "border-gray-300"
              }`}
              placeholder="e.g., ABC1234"
            />
          </div>

          <button
            type="submit"
            className={`w-full py-2 px-4 rounded-md font-semibold ${
              darkMode
                ? "bg-yellow-300 text-black hover:bg-yellow-400"
                : "bg-blue-500 text-white hover:bg-blue-600"
            }`}
          >
            Add Car
          </button>
        </form>

        {/* Back Button */}
        <div
          onClick={() => setIsAddingCar(false)}
          className={`w-full mt-4 py-2 px-4 rounded-md text-center cursor-pointer ${
            darkMode
              ? "bg-gray-600 text-white hover:bg-gray-500"
              : "bg-gray-200 text-gray-800 hover:bg-gray-300"
          }`}
        >
          Go Back
        </div>
      </div>
    </div>
  );
};

export default AddCarDetails;
