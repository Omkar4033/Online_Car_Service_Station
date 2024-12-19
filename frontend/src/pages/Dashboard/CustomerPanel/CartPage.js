import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";  // Import Link from react-router-dom

const CartPage = () => {
  const darkMode = useSelector((state) => state.darkMode.isDarkMode);
  const [cart, setCart] = React.useState([]);

  // Function to remove a service from the cart
  const removeFromCart = (serviceId) => {
    setCart(cart.filter((item) => item.id !== serviceId));
  };

  // Calculate the total price
  const totalPrice = cart.reduce((total, service) => total + service.price, 0);

  return (
    <div
      className={`min-h-screen flex ${
        darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-100 text-gray-800"
      }`}
    >
      {/* Main Content */}
      <main className="w-3/4 p-6">
        <h2 className="text-2xl font-bold mb-4">Your Cart</h2>

        {/* Cart Items */}
        <div className="space-y-4">
          {cart.length === 0 ? (
            <p className="text-center text-lg">Your cart is empty.</p>
          ) : (
            cart.map((service) => (
              <div
                key={service.id}
                className={`p-4 rounded-lg shadow-md flex justify-between items-center ${
                  darkMode ? "bg-gray-800" : "bg-white"
                }`}
              >
                <div className="flex flex-col">
                  <h3 className="text-lg font-semibold">{service.name}</h3>
                  <p className="text-sm">{service.description}</p>
                  <p className="text-lg font-bold mt-2">${service.price}</p>
                </div>
                <button
                  className={`px-4 py-2 rounded-md text-white ${
                    darkMode ? "bg-red-500 hover:bg-red-400" : "bg-red-400 hover:bg-red-500"
                  }`}
                  onClick={() => removeFromCart(service.id)}
                >
                  Remove
                </button>
              </div>
            ))
          )}
        </div>

        {/* Total Price */}
        <div className="flex justify-between items-center mt-8">
          <p className="text-xl font-bold">Total: ${totalPrice}</p>

          {/* Checkout Button with Link */}
          <Link to="/user/payment">  {/* Link to checkout page */}
            <button
              className={`px-6 py-3 rounded-md font-semibold ${
                darkMode ? "bg-yellow-500 text-gray-100" : "bg-yellow-400 text-white"
              }`}
            >
              Checkout
            </button>
          </Link>
        </div>
      </main>
    </div>
  );
};

export default CartPage;
