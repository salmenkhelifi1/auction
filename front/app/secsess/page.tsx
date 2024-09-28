"use client";
import React from "react";

const seccess = ({ params }) => {
  // Convert params to a string if it's an object
  const paramsString =
    typeof params === "object" ? JSON.stringify(params) : params;

  return <div>seccess!!!! {paramsString}</div>;
};

export default seccess;
