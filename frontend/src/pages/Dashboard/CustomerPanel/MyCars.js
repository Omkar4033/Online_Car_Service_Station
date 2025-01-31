import React, { useState, useEffect } from 'react';
import { FaTrashAlt } from 'react-icons/fa';  // Importing delete icon from react-icons
import { useSelector } from 'react-redux';  // Importing useSelector to access the darkMode state
import AddCarDetails from './AddCarDetails'; // Import the AddCarDetails component
import axios from 'axios';

const MyCars = () => {
  const darkMode = useSelector((state) => state.darkMode.isDarkMode);
  const user = useSelector((state) => state.userData?.user);
  const [isAddingCar, setIsAddingCar] = useState(false);
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 
  
  
  function getCarDetails(user){
    if (user?.userId) {
      axios
        .get(`http://localhost:8080/api/cars/user/${user.userId}`)
        .then((response) => {
          setCars(response.data);  // Set the cars state with the response data
          setLoading(false);  // Stop loading after data is fetched
          console.log(response.data);  // Log the response for debugging
        })
        .catch((error) => {
          console.error('Error fetching cars:', error);
          setError('Failed to load cars. Please try again later.');
          setLoading(false);  // Stop loading in case of error
        });
    } else {
      setError('User not found or not logged in.');
      setLoading(false);
    }
  }
 
  useEffect(() => {
  
    getCarDetails(user);
    
  }, [user]);

 

 // Function to handle deleting a car
const handleDelete = (carId) => {
  // Make a request to delete the car from the backend (if applicable)
  axios.delete(`http://localhost:8080/api/cars/delete/${carId}`)
    .then((response) => {
      setCars(cars.filter(car => car.carId !== carId));
      console.log(`Car with id ${carId} deleted successfully.`);
    })
    .catch((error) => {
      console.error(`Error deleting car with id ${carId}:`, error);
    });
};


  return (
    <div className={`my-cars-container p-6 min-h-screen ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-800'}`}>
      <h2 className="text-xl font-bold mb-4">My Cars</h2>

      {/* Button to toggle adding car details */}
      {!isAddingCar && (
        <button
          onClick={() => setIsAddingCar(true)} // Show the form to add car details
          className={`mb-4 py-2 px-4 rounded-md font-semibold ${darkMode ? 'bg-yellow-300 text-black hover:bg-yellow-400' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
        >
          Add Car
        </button>
      )}

      {/* Render AddCarDetails Component when isAddingCar is true */}
      {isAddingCar ? (
        <AddCarDetails setIsAddingCar={setIsAddingCar} />
      ) : (
        // Displaying the list of cars
        <ul className="space-y-4">
          {loading ? (
            <p>Loading cars...</p>
          ) : error ? (
            <p>{error}</p>
          ) : cars.length === 0 ? (
            <p>No cars available.</p>
          ) : (
            cars.map((car) => (
              <li
                key={car.carId}
                className={`flex justify-between items-center p-4 rounded-lg shadow-md transition-all duration-300 transform hover:scale-105 ${darkMode ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-800'}`}
              >
                <div className="flex flex-col space-y-1">
                  <h3 className="font-semibold text-lg">
                    {` ${car.carId}. ${car.company} ${car.model}`}
                  </h3>
                  <span className="text-sm text-gray-500">{`${car.fuelType}, ${car.registration}`}</span>
                </div>
            
                {/* Delete Button */}
                <button
                  onClick={() => handleDelete(car.carId)}  // Using car.carId instead of car.id
                  className={`p-2 rounded-full ${darkMode ? 'bg-gray-700 hover:bg-red-600' : 'bg-gray-200 hover:bg-red-300'} transition-all duration-200`}
                  title="Delete car"
                >
                  <FaTrashAlt size={18} className="text-red-500" />
                </button>
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
};

export default MyCars;
