import React, { useState, useEffect } from "react";
import ReactLoading from "react-loading";
import { useSelector } from "react-redux";

const Loader = () => {
  // Access dark mode from Redux state
  const darkMode = useSelector((state) => state.darkMode.isDarkMode);

  // State to manage visibility of the loader after delay
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Set a delay of 500ms
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 500);

    // Cleanup the timer when the component unmounts
    return () => clearTimeout(timer);
  }, []);

  // Render the loader only after the delay
  return isVisible ? (
    <div
      className={`fixed inset-0 flex items-center justify-center z-50`}
    >
      <div className="flex flex-col items-center space-y-4">
        {/* Loader Animation */}
        <ReactLoading
          type="bars" // You can change type to a different loader style
          color={darkMode ? "#ffffff" : "#000000"}
          height={80}   // Here, control the size according to your design
          width={80}    // This is where the size of the loader can change
        />
        {/* Loading Text */}
        <p
          className={`${
            darkMode ? "text-gray-300" : "text-gray-600"
          } text-lg font-medium`}
        >
          Loading, please wait...
        </p>
      </div>
    </div>
  ) : null;
};

export default Loader;
