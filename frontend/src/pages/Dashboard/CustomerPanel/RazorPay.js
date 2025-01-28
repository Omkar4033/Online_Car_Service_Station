import React from "react";

const RazorpayPayment = () => {
  const handlePayment = async () => {
    try {
      // Call backend to create order and fetch order ID
      const response = await fetch("http://localhost:8080/api/payments/create-order", {
        method: "POST",
      });
      const data = await response.json();

      if (!data || !data.id) throw new Error("Order ID not received!");

      const options = {
        key: "YOUR_RAZORPAY_KEY", // Replace with your Razorpay key ID
        amount: data.amount,
        currency: data.currency,
        name: "Your Project Name",
        description: "Final Year Project Payment",
        order_id: data.id, // Order ID from Razorpay
        handler: function (response) {
          alert(`Payment successful! Payment ID: ${response.razorpay_payment_id}`);
        },
        prefill: {
          name: "John Doe", // Prefilled user info
          email: "johndoe@example.com",
          contact: "9999999999",
        },
        theme: {
          color: "#F37254",
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error("Payment initiation failed", error);
      alert("Error starting the payment process");
    }
  };

  return (
    <div className="text-center">
      <button
        onClick={handlePayment}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
      >
        Pay Now
      </button>
    </div>
  );
};

export default RazorpayPayment;
