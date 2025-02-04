import React from "react";

const CustomerSideBar = ({ darkMode, setIsAddingCar }) => {
  return (
    <aside className={`w-1/5 p-4 ${darkMode ? "bg-gray-800" : "bg-grey-200"} shadow-lg`}>
      <div
        className={`flex items-center justify-center border-dashed border-2 p-6 rounded-lg ${
          darkMode ? "border-gray-600" : "border-black"
        }`}
      >
        <button className="text-lg font-semibold" onClick={() => setIsAddingCar(true)}>
          + Add Car
        </button>
      </div>
      <div
        className={`mt-8 p-4 rounded-lg shadow-md ${darkMode ? "bg-blue-500 text-gray-100" : "bg-yellow-200"}`}
      >
        <h3 className="text-xl font-bold">Advertisement</h3>
        <p className="text-sm">Special Offer! Get 20% off on your first service!</p>
        <button className="mt-2 py-1 px-4 bg-yellow-300 text-black rounded-md hover:bg-yellow-400">
          Learn More
        </button>
      </div>
    </aside>
  );
};

export default CustomerSideBar;
