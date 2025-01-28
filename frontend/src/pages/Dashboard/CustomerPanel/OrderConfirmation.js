import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ProgressBar from "./ProgressBar"; // Import the timeline component

const OrderConfirmationPage = () => {
  const darkMode = useSelector((state) => state.darkMode.isDarkMode);

  return (
    <div
      className={`min-h-screen flex flex-col ${
        darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-100 text-gray-800"
      }`}
    >

      {/* Main Content */}
      <main className="flex-grow w-full max-w-4xl mx-auto p-6">
      {/* Progress Bar */}
      <ProgressBar currentStep="order-confirmation" darkMode={darkMode} />


        <h2 className="text-3xl font-bold mb-4">Order Confirmation</h2>
        <div
          className={`p-6 border-2 rounded-lg ${
            darkMode ? "border-gray-700" : "border-gray-300"
          }`}
        >
          <h3 className="text-xl font-semibold mb-4">Your order has been successfully placed!</h3>
          <p className="text-lg mb-4">Thank you for your purchase. We are processing your order.</p>

          <p className="text-lg mb-6">You will receive a confirmation email shortly with the details of your order.</p>

          {/* Button to navigate back to home */}
          <Link to="/">
            <button
              className={`px-6 py-3 rounded-md font-semibold ${
                darkMode ? "bg-yellow-500 text-gray-100" : "bg-yellow-400 text-white"
              } hover:opacity-90`}
            >
              Return to Home
            </button>
          </Link>
        </div>
      </main>
    </div>
  );
};

export default OrderConfirmationPage;
