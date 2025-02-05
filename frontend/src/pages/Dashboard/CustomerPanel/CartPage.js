import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { removeFromCart } from "../../../redux/actions/cartActions"; 
import { setBookingDetails } from "../../../redux/actions/bookingActions"; // Import booking action
import ProgressBar from "./ProgressBar"; 
import { FaTrashAlt } from "react-icons/fa"; 

const CartPage = () => {
  const darkMode = useSelector((state) => state.darkMode.isDarkMode);
  const cart = useSelector((state) => state.cart.items); 
  const userId=useSelector((state) => state.userData?.user?.userId)
  const dispatch = useDispatch();

  // Calculate the total price
  const totalAmount = cart.reduce((total, service) => total + service.price, 0);

  // Extract service IDs from the cart
  const serviceIds = cart.map(service => service.id);

  // Handle Next button click (store service IDs in booking state)
  const handleNext = () => {
    dispatch(setBookingDetails({ serviceIds,totalAmount,userId })); // Store selected service IDs
  };

  

  return (
    <div
      className={`min-h-screen flex flex-col ${
        darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-100 text-gray-800"
      }`}
    >
      {/* Main Content */}
      <main className="flex-grow w-full max-w-4xl mx-auto p-6">
        <ProgressBar currentStep="cart" darkMode={darkMode} />
        <h2 className="text-2xl font-semibold mb-6">Your Cart</h2>

        {/* Cart Items */}
        <div className="space-y-4">
          {cart.length === 0 ? (
            <p className="text-center text-lg">Your cart is empty. Start adding some services!</p>
          ) : (
            cart.map((service, id) => (
              <div
                key={id}
                className={`p-4 rounded-lg shadow-md flex justify-between items-center ${
                  darkMode ? "bg-gray-800" : "bg-white"
                }`}
              >
                {/* Service Details */}
                <div className="flex flex-col">
                  <h3 className="text-lg font-semibold">{service?.name}</h3>
                  <p className="text-sm">{service?.description}</p>
                  <p className="text-lg font-bold mt-2">₹{service?.price.toFixed(2)}</p>
                </div>

                {/* Remove Button */}
                <button
                  className={`p-2 rounded-md ${
                    darkMode
                      ? "bg-red-500 hover:bg-red-400"
                      : "bg-red-400 hover:bg-red-500"
                  }`}
                  onClick={() => dispatch(removeFromCart(service.id))}
                >
                  <FaTrashAlt className="text-white text-lg" />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Total Price and Checkout */}
        {cart.length > 0 && (
          <div className="flex justify-between items-center mt-8">
            <p className="text-xl font-bold">Total: ₹{totalAmount.toFixed(2)}</p>

            {/* Checkout Button */}
            <Link to="/user/select-car">
              <button
                className={`px-6 py-3 rounded-md font-semibold ${
                  darkMode
                    ? "bg-yellow-500 text-gray-900 hover:bg-yellow-400"
                    : "bg-yellow-400 text-white hover:bg-yellow-500"
                }`}
                onClick={handleNext} // Store service IDs when clicked
              >
                Next
              </button>
            </Link>
          </div>
        )}
      </main>
    </div>
  );
};

export default CartPage;
