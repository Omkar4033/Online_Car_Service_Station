import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom"; // Import Link from react-router-dom

const PaymentPage = () => {
  const darkMode = useSelector((state) => state.darkMode.isDarkMode);
  const [contactDetails, setContactDetails] = React.useState({
    firstName: "",
    lastName: "",
    mobile: "",
    bookingDate: "",
    address: "",
    city: "",
    pinCode: "",
    state: "",
    country: "",
  });
  const [paymentDetails, setPaymentDetails] = React.useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    nameOnCard: "",
  });

  // Function to handle input changes for contact details
  const handleContactChange = (e) => {
    const { name, value } = e.target;
    setContactDetails({ ...contactDetails, [name]: value });
  };

  // Function to handle input changes for payment details
  const handlePaymentChange = (e) => {
    const { name, value } = e.target;
    setPaymentDetails({ ...paymentDetails, [name]: value });
  };

  // Function to handle payment submission
  const handlePayment = () => {
    console.log("Processing payment with details: ", paymentDetails);
    console.log("Contact details: ", contactDetails);
    // Implement payment processing logic here
  };

  return (
    <div
      className={`min-h-screen flex justify-center items-center p-6 ${
        darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-100 text-gray-800"
      }`}
    >
      <div className="w-full max-w-6xl space-y-6">
        {/* Contact Information Section */}
        <div
          className={`p-4 border-2 rounded-lg ${
            darkMode ? "border-gray-700" : "border-gray-300"
          }`}
        >
          <h2 className="text-2xl font-bold mb-4">Contact Information</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.keys(contactDetails).map((key) => (
              <div className="mb-4" key={key}>
                <label className="block text-sm font-medium mb-1">
                  {key.replace(/([A-Z])/g, " $1").replace(/^./, (str) =>
                    str.toUpperCase()
                  )}
                </label>
                <input
                  type="text"
                  name={key}
                  value={contactDetails[key]}
                  onChange={handleContactChange}
                  className={`w-full px-3 py-2 rounded-md border ${
                    darkMode
                      ? "bg-gray-700 border-gray-600 text-gray-100"
                      : "bg-gray-100 border-gray-300 text-gray-800"
                  }`}
                  placeholder={`Enter your ${key}`}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Payment Section */}
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

          <div className="flex justify-center mt-6">
            <button
              onClick={handlePayment}
              className={`px-6 py-3 rounded-md font-semibold w-full ${
                darkMode
                  ? "bg-yellow-500 text-gray-100"
                  : "bg-yellow-400 text-white"
              } hover:opacity-90`}
            >
              Pay
            </button>
          </div>

          <div className="flex justify-center mt-4">
            <Link to="/user/cart">
              <button
                className={`px-6 py-2 rounded-md font-medium ${
                  darkMode
                    ? "bg-gray-700 text-gray-100 hover:bg-gray-600"
                    : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                }`}
              >
                Back to Cart
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
