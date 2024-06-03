import React, { useState } from "react";
import PaymentMethod from "./PaymentMethod";
import OnlineCheckOut from "./OnlineCheckout";

const CheckoutPage = () => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");

  const handlePaymentMethodChange = (method) => {
    setSelectedPaymentMethod(method);
  };

  return (
    <div>
      <h1>Checkout Page</h1>
      <PaymentMethod paymentMethodCallback={handlePaymentMethodChange} />
      <OnlineCheckOut paymentMethod={selectedPaymentMethod} />
    </div>
  );
};

export default CheckoutPage;
