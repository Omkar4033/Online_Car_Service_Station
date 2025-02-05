import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

const StripeCheckout = ({amount}) => {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm amount={amount} /> {/* Replace 500 with your dynamic amount */}
    </Elements>
  );
};

export default StripeCheckout;
