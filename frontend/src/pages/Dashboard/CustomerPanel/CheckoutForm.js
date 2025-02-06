import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { clearCart } from "../../../redux/actions/cartActions";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

const CheckoutForm = ({ amount, darkMode }) => {
  const stripe = useStripe();
  const elements = useElements();
  const bookingData = useSelector((state) => state.booking);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Ensure that Stripe and Elements are ready before allowing the form to submit
  const isStripeReady = stripe && elements;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const bookingResponse = await fetch(
        "http://localhost:8080/api/bookings/save",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(bookingData),
        }
      );

      const response = await fetch(
        "http://localhost:8080/api/payment/create-payment-intent",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ amount }),
        }
      );

      if (!response.ok) throw new Error("Failed to create payment intent");

      const data = await response.json();
      const clientSecret = data.clientSecret;

      if (!clientSecret) {
        throw new Error("Payment failed: Missing client secret.");
      }

      const { error, paymentIntent } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card: elements.getElement(CardElement),
          },
        }
      );
      console.log("before sending request - ");
      console.log(JSON.stringify(bookingData));

      dispatch(clearCart());
      alert("Booking saved successfully!");

      // Navigate to the confirmation page after successful payment and booking
    } catch (error) {
      console.log(error);
    } finally {
      navigate("/user/confirmation");
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`mt-6 p-6 rounded-lg shadow-lg space-y-6 border-2 ${
        darkMode
          ? "bg-gray-900 text-gray-100 border-gray-700"
          : "bg-gray-100 text-gray-800 border-gray-300"
      }`}
    >
      <div>
        <h2 className="text-xl font-bold">Pay with Card</h2>
        <div className="flex flex-col space-y-4">
          <label className="text-sm font-semibold">Card Details</label>
          <div
            className={`p-3 border rounded-lg ${
              darkMode
                ? "bg-gray-700 border-gray-600"
                : "bg-white border-gray-300"
            }`}
          >
            <CardElement options={{ style: { base: { fontSize: "16px" } } }} />
          </div>
        </div>
        <button
          type="submit"
          disabled={!isStripeReady || loading}
          className="w-full px-6 py-4 mt-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700"
        >
          {loading ? "Processing..." : `Pay ₹${amount}`}
        </button>
      </div>
    </form>
  );
};

export default CheckoutForm;
