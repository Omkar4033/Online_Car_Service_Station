import React from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import ProgressBar from "./ProgressBar"; // Import the progress bar component

const PaymentPage = () => {
  const darkMode = useSelector((state) => state.darkMode.isDarkMode);
  const [paymentDetails, setPaymentDetails] = React.useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    nameOnCard: "",
  });

  const navigate = useNavigate();
  const contactDetails = JSON.parse(localStorage.getItem("contactDetails")) || {};

  // Function to handle input changes for payment details
  const handlePaymentChange = (e) => {
    const { name, value } = e.target;
    setPaymentDetails({ ...paymentDetails, [name]: value });
  };

  const handlePayment = () => {
    console.log("Contact details: ", contactDetails);
    console.log("Processing payment with details: ", paymentDetails);
    // Add payment logic here
    navigate("/user/order-confirmation"); // Redirect to order confirmation page
  };

  const handleBack = () => {
    navigate("/user/contact-info"); // Navigate back to the contact info page
  };

  return (
    <div
      className={`min-h-screen flex flex-col items-center p-6 ${
        darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-100 text-gray-800"
      }`}
    >

      <div className="w-full max-w-4xl space-y-6">
        {/* Progress Bar */}
        <ProgressBar currentStep="payment" darkMode={darkMode} />

        <div
          className={`p-4 border-2 rounded-lg ${
            darkMode ? "border-gray-700" : "border-gray-300"
          }`}
        >
          <h2 className="text-2xl font-bold mb-4">Payment Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="col-span-2 mb-4">
              <label className="block text-sm font-medium mb-1">Card Number</label>
              <input
                type="text"
                name="cardNumber"
                value={paymentDetails.cardNumber}
                onChange={handlePaymentChange}
                className={`w-full px-3 py-2 rounded-md border ${
                  darkMode
                    ? "bg-gray-700 border-gray-600 text-gray-100"
                    : "bg-gray-100 border-gray-300 text-gray-800"
                }`}
                placeholder="Enter your card number"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Expiry Date</label>
              <input
                type="text"
                name="expiryDate"
                value={paymentDetails.expiryDate}
                onChange={handlePaymentChange}
                className={`w-full px-3 py-2 rounded-md border ${
                  darkMode
                    ? "bg-gray-700 border-gray-600 text-gray-100"
                    : "bg-gray-100 border-gray-300 text-gray-800"
                }`}
                placeholder="MM/YY"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">CVV</label>
              <input
                type="text"
                name="cvv"
                value={paymentDetails.cvv}
                onChange={handlePaymentChange}
                className={`w-full px-3 py-2 rounded-md border ${
                  darkMode
                    ? "bg-gray-700 border-gray-600 text-gray-100"
                    : "bg-gray-100 border-gray-300 text-gray-800"
                }`}
                placeholder="Enter CVV"
              />
            </div>
            <div className="col-span-2 mb-4">
              <label className="block text-sm font-medium mb-1">Name on Card</label>
              <input
                type="text"
                name="nameOnCard"
                value={paymentDetails.nameOnCard}
                onChange={handlePaymentChange}
                className={`w-full px-3 py-2 rounded-md border ${
                  darkMode
                    ? "bg-gray-700 border-gray-600 text-gray-100"
                    : "bg-gray-100 border-gray-300 text-gray-800"
                }`}
                placeholder="Enter the name on your card"
              />
            </div>
          </div>

          <div className="flex justify-between mt-6">
            {/* Back Button */}
            <button
              onClick={handleBack}
              className={`px-6 py-3 rounded-md font-semibold ${
                darkMode
                  ? "bg-gray-700 text-gray-100 hover:bg-gray-600"
                  : "bg-gray-200 text-gray-800 hover:bg-gray-300"
              }`}
            >
              Back to Contact
            </button>

            {/* Pay Button */}
            <button
              onClick={handlePayment}
              className={`px-6 py-3 rounded-md font-semibold ${
                darkMode
                  ? "bg-yellow-500 text-gray-100"
                  : "bg-yellow-400 text-white"
              } hover:opacity-90`}
            >
              Pay
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
