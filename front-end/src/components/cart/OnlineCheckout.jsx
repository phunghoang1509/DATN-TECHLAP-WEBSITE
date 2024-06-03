import React, { useEffect } from "react";

const OnlineCheckOut = ({ paymentMethod }) => {
  useEffect(() => {
    console.log("Selected Payment Method:", paymentMethod);
  }, [paymentMethod]);

  return (
    <div>
      <h1>Online CheckOut Page</h1>
      <p>Selected Payment Method: {paymentMethod}</p>
    </div>
  );
};

export default OnlineCheckOut;
