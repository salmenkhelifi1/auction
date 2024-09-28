"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import "../payement/chek.css";

const stripePromise = loadStripe(
  "pk_test_51Oa23kFgyHOf8MRLCpOxilmegVe8iPiOSt91sLXtveMRE8zLgyVOFofgKCUKNsRTzirOhr0psYY3aBqh89GML3Ep006HA3dFsH"
);

const Payment = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleClick = async () => {
    try {
      setIsLoading(true);
      if (!isClient) return;

      const membership = localStorage.getItem("membership");

      const response = await axios.post(
        "http://localhost:5000/create-checkout-session",
        {
          id:
            parseInt(membership) > 60
              ? parseInt(membership) === 590
                ? "item4"
                : "item3"
              : parseInt(membership) === 59
              ? "item2"
              : "item1", // Replace with the actual item ID
          quantity: 5,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status !== 200) {
        throw new Error(
          response.data.error || "Failed to create checkout session"
        );
      }

      const { sessionId } = response.data;

      const stripe = await stripePromise; // Use await to wait for the promise
      const { error } = await stripe.redirectToCheckout({
        sessionId: sessionId,
      });

      if (error) {
        throw new Error(error.message || "Failed to redirect to checkout");
      }
    } catch (error) {
      console.error("Checkout failed:", error.message || error);
    } finally {
      setIsLoading(false);
    }
  };

  const memb = isClient ? localStorage.getItem("memb") : null;
  const membe = isClient ? localStorage.getItem("membe") : null;
  const date = isClient ? localStorage.getItem("date") : null;

  return (
    <div>
      <div
        className="w-full h-screen"
        style={{
          backgroundImage:
            "url('https://vojislavd.com/ta-template-demo/assets/img/coming-soon.jpg')",
        }}
      >
        <div className="w-full h-screen flex flex-col items-center justify-between bg-black bg-opacity-70 py-8">
          <div className="flex-1 flex flex-col items-center justify-center">
            <div className="bg-white bg-opacity-10 px-4 py-2 rounded-xl flex items-center justify-center text-cyan-100 space-x-2 lg:space-x-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 lg:h-8 xl:h-10 w-6 lg:w-8 xl:w-10"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
                ></path>
              </svg>
              <span className="text-xl lg:text-2xl xl:text-3xl font-bold">
                WELCOM TO MEMBERSHIP PAYMENT{" "}
              </span>
            </div>

            <h5 className=" text-6xl lg:text-7xl xl:text-8xl text-gray-200 tracking-wider font-bold font-serif mt-12 text-center">
              {memb} subscribe for 1 {date}
            </h5>

            <div className="flex flex-col items-center space-y-4 mt-24">
              <p className="text-gray-300 uppercase text-sm">
                Notify me when it's ready
              </p>
              <form className="w-full flex items-center">
                <div>
                  <div className="container">
                    <div className="left-side">
                      <div className="card">
                        <div className="card-line"></div>
                        <div className="buttons"></div>
                      </div>
                      <div className="post">
                        <div className="post-line"></div>
                        <div className="screen">
                          <button
                            className="dollar"
                            onClick={handleClick}
                            disabled={isLoading}
                          >
                            {" "}
                            {isLoading ? "wait..." : "$"}
                          </button>
                        </div>
                        <div className="numbers"></div>
                        <div className="numbers-line2"></div>
                      </div>
                    </div>
                    <div className="right-side">
                      <div className="new">New Transaction</div>

                      <svg
                        viewBox="0 0 451.846 451.847"
                        height="512"
                        width="512"
                        xmlns="http://www.w3.org/2000/svg"
                        className="arrow"
                      >
                        <path
                          fill="#cfcfcf"
                          data-old_color="#000000"
                          className="active-path"
                          data-original="#000000"
                          d="M345.441 248.292L151.154 442.573c-12.359 12.365-32.397 12.365-44.75 0-12.354-12.354-12.354-32.391 0-44.744L278.318 225.92 106.409 54.017c-12.354-12.359-12.354-32.394 0-44.748 12.354-12.359 32.391-12.359 44.75 0l194.287 194.284c6.177 6.18 9.262 14.271 9.262 22.366 0 8.099-3.091 16.196-9.267 22.373z"
                        ></path>
                      </svg>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
