import React, { useState } from 'react';
import { FaTrashAlt } from 'react-icons/fa';  // Importing delete icon from react-icons
import { useSelector } from 'react-redux';  // Importing useSelector to access the darkMode state
import AddCarDetails from './AddCarDetails'; // Import the AddCarDetails component

const MyCars = () => {
  const darkMode = useSelector((state) => state.darkMode.isDarkMode);

  // State to manage the list of cars
  const [cars, setCars] = useState([
    { id: 1, make: 'Toyota', model: 'Corolla', year: 2020 },
    { id: 2, make: 'Honda', model: 'Civic', year: 2022 },
    { id: 3, make: 'Ford', model: 'Mustang', year: 2021 },
  ]);

  // State to manage whether we are adding a car
  const [isAddingCar, setIsAddingCar] = useState(false);

  // Function to handle deleting a car
  const handleDelete = (id) => {
    setCars(cars.filter(car => car.id !== id));  // Remove car with the given id
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
          {cars.length === 0 ? (
            <p>No cars available.</p>
          ) : (
            cars.map((car) => (
              <li key={car.id} className={`flex justify-between items-center p-4 rounded-lg shadow-md ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
                <div>
                  <h3 className="font-semibold">{`${car.year} ${car.make} ${car.model}`}</h3>
                </div>
                {/* Delete Button */}
                <button
                  onClick={() => handleDelete(car.id)}  // Calling the delete function on click
                  className={`text-red-500 hover:text-red-700 ${darkMode ? 'hover:text-red-400' : ''}`}
                >
                  <FaTrashAlt size={20} />  {/* Delete icon */}
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
