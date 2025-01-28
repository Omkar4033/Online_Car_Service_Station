import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import ProgressBar from "./ProgressBar"; // Import the progress bar component

const PaymentPage = () => {
  const darkMode = useSelector((state) => state.darkMode.isDarkMode);
  const cart = useSelector((state) => state.cart.items); // Access the cart from Redux state
  const dispatch = useDispatch();

  // Calculate the total price
  const totalPrice = cart.reduce((total, service) => total + service.price, 0);

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

    // First, create an order on your backend to get the order_id
    fetch("http://localhost:8080/razorpay/order", {
      method: "POST",
      body: JSON.stringify({ amount: totalPrice }),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((orderData) => {
        const { id, currency } = orderData;

        const options = {
          key: "your_razorpay_key_id", // Replace with your Razorpay Key ID
          amount: totalPrice * 100, // Amount in paise
          currency: currency,
          order_id: id,
          name: "wheely",
          description: "Payment for your order",
          handler: function (response) {
            console.log("Payment successful:", response);
            // Optionally, confirm the payment with Razorpay API on the server-side
            navigate("/user/order-confirmation"); // Redirect to order confirmation page
          },
          prefill: {
            name: contactDetails.name,
            email: contactDetails.email,
            contact: contactDetails.phone,
          },
          theme: {
            color: "#F37254",
          },
        };

        const rzp = new window.Razorpay(options);
        rzp.open(); // Open Razorpay Payment Modal
      })
      .catch((error) => console.error("Error creating order:", error));
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

          <div className="flex justify-between items-center mt-6 space-x-4">
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

            {/* Total Price Button */}
            <button
              className={`px-6 py-3 rounded-md font-semibold ${
                darkMode
                  ? "bg-green-600 text-gray-100 hover:bg-blue-500"
                  : "bg-green-500 text-white"
              } hover:opacity-90`}
            >
              Total: ₹{totalPrice}
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
