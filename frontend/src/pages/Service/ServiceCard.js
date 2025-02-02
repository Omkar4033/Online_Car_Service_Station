import React from 'react';


const ServiceCard = ({ service, darkMode, addToCartHandler }) => {
  return (
    <div
      className={`p-4 rounded-lg shadow-md flex flex-col justify-between ${
        darkMode ? 'bg-gray-800' : 'bg-white'

      } transition-all duration-300 transform hover:scale-105`}
    >
      <h2 className="text-lg font-semibold">{service.name}</h2>
      <p className="text-sm">{service.description}</p>
      <p className="text-lg font-bold mt-2">₹{service.price.toFixed(2)}</p>
      <button
        className={`mt-4 py-2 px-4 rounded shadow ${
          darkMode
            ? 'bg-yellow-300 text-gray-900 hover:bg-yellow-300' // Bright yellow with dark text for dark mode
            : 'bg-blue-400 text-grey-900 hover:bg-blue-400' // Softer blue color for light mode
        }`}
        onClick={() => addToCartHandler(service)}
      >
        Add to Cart
      </button>
     
    </div>
  );
};

export default ServiceCard;
