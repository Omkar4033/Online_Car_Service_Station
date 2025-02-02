import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FaCarSide } from "react-icons/fa";
import axios from "axios";
import ProgressBar from "./ProgressBar";
import { Link } from "react-router-dom";

const SelectCar = () => {
  const darkMode = useSelector((state) => state.darkMode.isDarkMode);
  const user = useSelector((state) => state.userData?.user);
  const dispatch = useDispatch();

  const [cars, setCars] = useState([]);
  const [selectedCar, setSelectedCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCars = async () => {
      if (user?.userId) {
        try {
          const response = await axios.get(
            `http://localhost:8080/api/cars/user/${user.userId}`
          );
          setCars(response.data);
        } catch (err) {
          console.error("Error fetching cars:", err);
          setError("Failed to load cars. Please try again later.");
        } finally {
          setLoading(false);
        }
      } else {
        setError("User not found or not logged in.");
        setLoading(false);
      }
    };

    fetchCars();
  }, [user]);

  const handleSelectCar = (car) => {
    setSelectedCar(car);
  };

  return (
    <div
      className={`min-h-screen flex flex-col ${
        darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-800"
      }`}
    >
      {/* Main Content */}
      <main className="flex-grow w-full max-w-4xl mx-auto p-6">
        {/* Progress Bar */}
        <ProgressBar currentStep="select-car" darkMode={darkMode} />
        <h2 className="text-2xl font-bold mb-4">Select Your Car</h2>

        {loading && <p>Loading cars...</p>}
        {error && <p>{error}</p>}
        {!loading && !error && cars.length === 0 && (
          <p>No cars available. Please add a car first.</p>
        )}

        <div className="space-y-4">
          {cars.map((car) => (
            <div
              key={car.carId}
              className={`flex items-center justify-between p-4 rounded-lg shadow-md cursor-pointer transition-transform transform hover:scale-105 ${
                selectedCar?.carId === car.carId
                  ? darkMode
                    ? "bg-blue-700 text-white"
                    : "bg-blue-300 text-black"
                  : darkMode
                  ? "bg-gray-800"
                  : "bg-white"
              }`}
              onClick={() => handleSelectCar(car)}
            >
              <div className="flex items-center space-x-4">
                <FaCarSide size={24} />
                <div>
                  <h3 className="text-lg font-semibold">{`${car.company} ${car.model}`}</h3>
                  <p className="text-sm text-gray-500">{`${car.fuelType}, ${car.registration}`}</p>
                </div>
              </div>

              {selectedCar?.carId === car.carId && (
                <span className="px-3 py-1 bg-blue-500 text-white rounded-full text-xs">
                  Selected
                </span>
              )}
            </div>
          ))}
        </div>

        

        <div className="flex justify-between mt-8">
          <Link to="/user/cart">
            <button
              className={`px-6 py-3 rounded-md font-semibold ${
                darkMode
                  ? "bg-gray-500 text-gray-900 hover:bg-gray-400"
                  : "bg-gray-300 text-white hover:bg-gray-400"
              }`}
            >
              Back
            </button>
          </Link>

          <Link to="/user/contact-info">
            <button
              className={`px-6 py-3 rounded-md font-semibold ${
                darkMode
                  ? "bg-yellow-500 text-gray-900 hover:bg-yellow-400"
                  : "bg-yellow-400 text-white hover:bg-yellow-500"
              }`}
            >
              Next
            </button>
          </Link>
        </div>
      </main>
    </div>
  );
};

export default SelectCar;
