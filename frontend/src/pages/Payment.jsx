import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Payment = () => {
  const navigate = useNavigate();
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [name, setName] = useState("");

  const handlePayment = async () => {
    if (!cardNumber || !expiry || !cvv || !name) {
      alert("Please fill in all details!");
      return;
    }

    try {
      // Simulate a payment API call
      const response = await axios.post("http://localhost:1000/api/v1/place-order", {
        cardNumber,
        expiry,
        cvv,
        name,
      });

      alert(response.data.message);
      navigate("/profile/orderHistory"); // Redirect after payment success
    } catch (error) {
      console.error("Payment Failed", error);
      alert("Payment Failed. Try again.");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-900 text-white">
      <div className="bg-gray-800 p-8 rounded-md w-96">
        <h1 className="text-2xl font-semibold mb-4">Payment Details</h1>
        
        <input
          type="text"
          placeholder="Cardholder Name"
          className="w-full p-2 mb-2 rounded bg-gray-700"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Card Number"
          className="w-full p-2 mb-2 rounded bg-gray-700"
          value={cardNumber}
          onChange={(e) => setCardNumber(e.target.value)}
        />
        <input
          type="text"
          placeholder="Expiry Date (MM/YY)"
          className="w-full p-2 mb-2 rounded bg-gray-700"
          value={expiry}
          onChange={(e) => setExpiry(e.target.value)}
        />
        <input
          type="password"
          placeholder="CVV"
          className="w-full p-2 mb-2 rounded bg-gray-700"
          value={cvv}
          onChange={(e) => setCvv(e.target.value)}
        />

        <button
          className="w-full bg-green-500 py-2 rounded text-lg font-semibold mt-4"
          onClick={handlePayment}
        >
          Pay Now
        </button>
      </div>
    </div>
  );
};

export default Payment;
