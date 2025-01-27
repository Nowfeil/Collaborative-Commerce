import React from "react";
import Confetti from "react-confetti";

const OrderSuccess = () => {
  const [width, height] = [window.innerWidth, window.innerHeight];

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>🎉 Order Successful! 🎉</h1>
      <p>Thank you for your purchase.</p>
      <Confetti width={width} height={height} />
    </div>
  );
};

export default OrderSuccess;
