"use client";
import React from "react";
import Strip from "../payement/stripe";
import Flouci from "../payement/flouci";

const payment = () => {
  return (
    <div>
      <Flouci />
      <Strip />
    </div>
  );
};

export default payment;
