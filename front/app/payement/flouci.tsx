"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";

const Payment = () => {
  const [form, setForm] = useState({});
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const onsubmit = (e) => {
    e.preventDefault();
    console.log("clicked");
    axios
      .post("http://localhost:5000/flousi/pay", 1200)
      .then((res) => {
        console.log("eee");
        const { result } = res.data;
        if (isClient) {
          window.location.href = result.link;
        }
      })
      .catch((err) => console.log(err));
  };

  console.log(form);

  return (
    <div>
      <div className="p-4">
        <h2>Amount</h2>
        <form className="m-4">
          <input
            type="text"
            name="amount"
            className="form-control"
            onChange={handleChange}
          />
          <button className="btn btn-primary mt-4" onClick={onsubmit}>
            Submit and continue
          </button>
        </form>
      </div>
    </div>
  );
};

export default Payment;
