import React, { useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

const AddCarDetails = ({ setIsAddingCar }) => {
  const darkMode = useSelector((state) => state.darkMode.isDarkMode);
  const user = useSelector((state) => state.userData?.user); 
  const [carDetails, setCarDetails] = useState({
    company: "",
    model: "",
    fuelType: "", 
    registration: "",
    userId: user?.userId || ""
  });

  

  const fuelTypes = ["Petrol", "Diesel", "Electric", "Hybrid", "CNG"]; 

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCarDetails({ ...carDetails, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { company, model, fuelType, registration, userId } = carDetails;


    try {
      // Sending the car details to the server
      const response = await axios.post(`http://localhost:8080/api/cars/add`, {
        company,
        model,
        fuelType,
        registration,
        userId,
      }, {
        headers: { "Content-Type": "application/json" }
      });

      console.log("Car details added successfully:", response.data);

      // Reset car details and close the form after successful submission
      setCarDetails({
        company: "",
        model: "",
        fuelType: "",
        registration: "",
        userId: userId,
      });
      setIsAddingCar(false);
      alert("Car details added successfully!");
    } catch (error) {
      console.error("Error adding car details:", error);
      alert("An error occurred while adding the car details.");
    }
  };

  return (
    <div
      className={`min-h-screen flex items-start justify-center ${darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-100 text-gray-800"}`}
    >
      <div
        className={`p-8 rounded-md shadow-lg w-full max-w-md ${darkMode ? "bg-gray-800" : "bg-white"}`}
        style={{ marginTop: "10px" }}
      >
        <h1 className="text-2xl font-bold text-center mb-6">Add Car Details</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Company</label>
            <input
              type="text"
              name="company"
              value={carDetails.company}
              onChange={handleInputChange}
              className={`w-full p-2 rounded-md border ${darkMode ? "border-gray-700 bg-gray-700 text-gray-100" : "border-gray-300"}`}
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
              className={`w-full p-2 rounded-md border ${darkMode ? "border-gray-700 bg-gray-700 text-gray-100" : "border-gray-300"}`}
              placeholder="e.g., Corolla"
            />
          </div>

          {/* Fuel Type Dropdown */}
          <div>
            <label className="block text-sm font-medium mb-1">Fuel Type</label>
            <select
              name="fuelType"
              value={carDetails.fuelType}
              onChange={handleInputChange}
              className={`w-full p-2 rounded-md border ${darkMode ? "border-gray-700 bg-gray-700 text-gray-100" : "border-gray-300"}`}
            >
              <option value="">Select Fuel Type</option>
              {fuelTypes.map((type, index) => (
                <option key={index} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Registration</label>
            <input
              type="text"
              name="registration"
              value={carDetails.registration}
              onChange={handleInputChange}
              className={`w-full p-2 rounded-md border ${darkMode ? "border-gray-700 bg-gray-700 text-gray-100" : "border-gray-300"}`}
              placeholder="e.g., ABC1234"
            />
          </div>

          <button
            type="submit"
            className={`w-full py-2 px-4 rounded-md font-semibold ${darkMode ? "bg-yellow-300 text-black hover:bg-yellow-400" : "bg-blue-500 text-white hover:bg-blue-600"}`}
          >
            Add Car
          </button>
        </form>

        {/* Back Button */}
        <div
          onClick={() => setIsAddingCar(false)}
          className={`w-full mt-4 py-2 px-4 rounded-md text-center cursor-pointer ${darkMode ? "bg-gray-600 text-white hover:bg-gray-500" : "bg-gray-200 text-gray-800 hover:bg-gray-300"}`}
        >
          Go Back
        </div>
      </div>
    </div>
  );
};

export default AddCarDetails;
