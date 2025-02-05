import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ProgressBar from "./ProgressBar";
import StripeCheckout from "./StripeCheckout";

const PaymentPage = () => {
  const darkMode = useSelector((state) => state.darkMode.isDarkMode);
  const cart = useSelector((state) => state.cart.items);
  const booking = useSelector((state) => state.booking);
  const navigate = useNavigate();

  // Calculate the total amount, ensuring cart is not empty
  const totalAmount = cart.reduce((total, service) => total + service.price, 0);

  console.log(JSON.stringify(booking));  // For debugging, make sure booking data is correct

  return (
    <div
      className={`min-h-screen flex flex-col items-center p-6 sm:p-8 lg:p-12 ${
        darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-100 text-gray-800"
      }`}
    >
      <div className="w-full max-w-4xl space-y-8">
        <ProgressBar currentStep="payment" darkMode={darkMode} />

        <div
          className={`p-6 border rounded-lg shadow-lg ${
            darkMode ? "border-gray-700 bg-gray-800" : "border-gray-300 bg-white"
          }`}
        >
          <h2 className="text-2xl font-bold mb-6 text-center">Payment Details</h2>
          {/* Pass the correct props to StripeCheckout */}
          <StripeCheckout amount={totalAmount}  />
        </div>
      </div>

      <div className="flex justify-between items-center mt-6 space-x-4 w-full max-w-2xl">
        <button
          onClick={() => navigate("/user/contact-info")}
          className="px-6 py-3 rounded-md font-semibold bg-gray-600 text-white hover:bg-gray-500 transition-all"
        >
          Back to Contact
        </button>

        <div className="px-6 py-3 rounded-md font-semibold text-white text-lg">
          Total: ₹{totalAmount.toFixed(2)}
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
