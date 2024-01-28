"use client";
import React, { useState, useEffect } from "react";
import "./style/itemBid.css";
import { FaPlus, FaMinus } from "react-icons/fa";
import { store } from "react-notifications-component";
import Sound from "react-sound";
import AuctionTimer from "./auctionTimer";
import socket from "./bid/socket";
const ItemBid = ({ items }) => {
  const [quant, setQuant] = useState(
    items[0]?.bids.length > 0
      ? items[0]?.bids[items[0]?.bids.length - 1]?.bidAmount
      : items[0]?.price
  );
  const [errorMessage, setErrorMessage] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [newBidMessageVisible, setNewBidMessageVisible] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [playSound, setPlaySound] = useState(false);
  const soundUrl =
    "https://cdn.pixabay.com/download/audio/2021/08/04/audio_bb630cc098.mp3?filename=short-success-sound-glockenspiel-treasure-video-game-6346.mp3";

  const userId =
    typeof window !== "undefined" ? localStorage.getItem("userId") : null;

  useEffect(() => {
    // Function to handle new bids from others
    const handleNewBidFromOthers = (data) => {
      setNewBidMessageVisible(true);
      setQuant(data.bidAmount);
      setPlaySound(true);
    };

    // Function to leave the current room and join a new one
    const joinNewRoom = (newRoomId) => {
      socket.emit("leaveRoom", items[0]?.id);

      socket.emit("joinRoom", newRoomId);
    };

    // Join the initial room when the component mounts
    socket.emit("create", items[0]?.id);

    // Set up socket event listeners
    socket.on("placeBid", handleNewBidFromOthers);
    socket.on("notification", (bidData) => {
      setQuant(bidData);
      setNewBidMessageVisible(true);
      const hideTimeout = setTimeout(() => {
        setNewBidMessageVisible(false);
      }, 1000);

      return () => clearTimeout(hideTimeout);

      console.log("test socket from back");
    });
    socket.on("notification", (message) => {
      setNotifications((prevNotifications) => [...prevNotifications, message]);
    });
    // Clean up socket event listener on component unmount
    return () => {
      socket.off("notification", handleNewBidFromOthers);
      socket.off("placeBid", handleNewBidFromOthers);
    };
  }, [items]);

  useEffect(() => {
    if (isPopupVisible) {
      const hideTimeout = setTimeout(() => {
        setPopupVisible(false);
        setErrorMessage(false);
        setSuccessMessage("");
        setNewBidMessageVisible(false);
      }, 5000);
      setNewBidMessageVisible(false);

      return () => clearTimeout(hideTimeout);
    }
  }, [isPopupVisible]);
  const handlePopupClose = () => {
    setPopupVisible(false);
  };
  const adjustQuant = (amount) => {
    setQuant((prevQuant) => parseInt(prevQuant) + amount);
  };

  const handleInputChange = (e) => {
    setQuant(Number(e.target.value));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    // setNewBidMessageVisible(true);
    const itemId = items[0].id;

    // socket.emit("placeBid", {
    //   userId: localStorage.getItem("userId"),
    //   itemId: items[0].id,
    //   bidAmount: quant,
    // });

    try {
      const response = await fetch("http://localhost:5000/bid/placeBid", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: localStorage.getItem("userId"),
          itemId: items[0].id,
          bidAmount: quant,
        }),
      });

      if (!response.ok) {
        console.error("Failed to place bid");
        setErrorMessage(true);
        setPopupVisible(true);

        return;
      }

      const bidNotificationResponse = await fetch(
        `http://localhost:5000/bid/bidNotification/${items[0].id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (bidNotificationResponse.ok) {
        // If the response is successful, update the state with the bid data
        const bidData = await bidNotificationResponse.json();
        console.log("Bid notification response:", bidData);

        setQuant(bidData);
      } else {
        console.error("Failed to fetch bid notification");
      }
    } catch (error) {
      console.error("Error while handling bid submission:", error);
    }

    // Set up socket event listener for placedBid
    socket.on("placedBid", (data) => {
      setQuant(data.bidAmount);
    });

    setErrorMessage(false);
    setSuccessMessage("Bid submitted successfully!");
    setPopupVisible(true);
  };
  const formatDateTime = (dateString) => {
    return new Date(dateString).toLocaleString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
  };
  return (
    <div className="summary">
      {items.map((item) => (
        <div key={item.id}>
          {/* Render item details */}
          <p className="price">
            {/* Display starting bid */}
            <span className="auction-price">
              <span className="current">Starting bid:</span>
              <span className="current currentc ">
                <span className="text-red-500"> {item.price}£</span>
              </span>
            </span>
          </p>

          {/* Display auction time */}
          <div className="auction-time">
            Time left:{" "}
            <AuctionTimer startTime={item.timeStart} endTime={item.timeEnd} />
          </div>

          {/* Display auction end details */}
          <div className="auction">
            <p className="auction-end">
              Auction end: {formatDateTime(item.timeEnd)} <br />
              Timezone: UTC +2
            </p>

            {/* Bid form and quantity adjustment */}
            <div className="bidFlex mb-4">
              <form
                className="countdown_row  h-10 px-6 font-semibold"
                onSubmit={handleSubmit}
              >
                {/* Quantity adjustment buttons */}
                <div className="quantity buttons_added  ">
                  <div className="amount w-12">
                    <button
                      type="button"
                      className="minus"
                      onClick={() => adjustQuant(-5)}
                      disabled={quant === 0}
                    >
                      <FaMinus
                        size={25}
                        className="text-red-700 cursor-pointer"
                      />
                    </button>
                    <input
                      placeholder={
                        items[0]?.bids.length > 0
                          ? items[0]?.bids[items[0]?.bids.length - 1]?.bidAmount
                          : items[0]?.price
                      }
                      type="text"
                      value={quant}
                      onChange={handleInputChange}
                      className="priceinput"
                    />
                    <button
                      type="button"
                      className="plus"
                      onClick={() => adjustQuant(5)}
                    >
                      <FaPlus
                        size={25}
                        className="text-red-700 cursor-pointer"
                      />
                    </button>
                  </div>
                </div>

                {/* Bid button */}
                <div className="bid ml-24">
                  <button
                    onClick={() => setPlaySound(true)}
                    type="submit"
                    className="bg-red-500 text-white text-sm leading-6 font-bold py-2 px-4 rounded-lg hover:bg-red-700"
                  >
                    Bid
                  </button>
                </div>
              </form>

              <Sound
                url={soundUrl}
                playStatus={
                  playSound ? Sound.status.PLAYING : Sound.status.STOPPED
                }
                onFinishedPlaying={() => setPlaySound(false)}
              />
              {/* Display success and error messages */}
              <div className="flex justify-center items-center">
                {/* Display success message */}
                {successMessage && (
                  <div
                    className={`bg-green-500 border-t-4 border-green-700 rounded-b text-white px-4 py-3 shadow-md ${
                      isPopupVisible
                        ? "fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                        : "hidden"
                    }`}
                    role="alert"
                  >
                    <div className="flex">
                      <div className="py-1">
                        {/* Close button for success message */}
                        <svg
                          className="fill-current h-6 w-6 mr-4 cursor-pointer"
                          onClick={handlePopupClose}
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                        >
                          <path d="M6.7 6.7a1 1 0 011.4 0L10 8.6l1.9-1.9a1 1 0 111.4 1.4L11.4 10l1.9 1.9a1 1 0 01-1.4 1.4L10 11.4l-1.9 1.9a1 1 0 01-1.4-1.4L8.6 10 6.7 8.1a1 1 0 010-1.4z"></path>
                        </svg>
                      </div>
                      <div>
                        {/* Success message content */}
                        <p className="font-bold">Success!</p>
                        <p className="text-sm">
                          Your Bid has been sent successfully.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Display error message */}
                {errorMessage && (
                  <div
                    className={`bg-red-500 border-t-4 border-red-700 rounded-b text-white px-4 py-3 shadow-md ${
                      isPopupVisible
                        ? "fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                        : "hidden"
                    }`}
                    role="alert"
                  >
                    <div className="flex">
                      <div className="py-1">
                        {/* Close button for error message */}
                        <svg
                          className="fill-current h-6 w-6 cursor-pointer"
                          onClick={handlePopupClose}
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                        >
                          <path d="M6.7 6.7a1 1 0 011.4 0L10 8.6l1.9-1.9a1 1 0 111.4 1.4L11.4 10l1.9 1.9a1 1 0 01-1.4 1.4L10 11.4l-1.9 1.9a1 1 0 01-1.4-1.4L8.6 10 6.7 8.1a1 1 0 010-1.4z"></path>
                        </svg>
                      </div>
                      <div>
                        {/* Error message content */}
                        <p className="font-bold">Error!</p>
                        <p className="text-sm">
                          Your Bid could not be sent. Please try again later.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Display new bid message */}
              <div>
                {newBidMessageVisible && (
                  <div
                    className={`bg-blue-500 border-t-4 border-blue-700 rounded-b text-white px-4 py-3 shadow-md ${
                      newBidMessageVisible
                        ? "fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                        : "hidden"
                    }`}
                    role="alert"
                  >
                    <div className="flex">
                      <div className="py-1">
                        {/* Close button for new bid message */}
                        <svg
                          className="fill-current h-6 w-6 mr-4 cursor-pointer"
                          onClick={() => setNewBidMessageVisible(false)}
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                        >
                          <path d="M6.7 6.7a1 1 0 011.4 0L10 8.6l1.9-1.9a1 1 0 111.4 1.4L11.4 10l1.9 1.9a1 1 0 01-1.4 1.4L10 11.4l-1.9 1.9a1 1 0 01-1.4-1.4L8.6 10 6.7 8.1a1 1 0 010-1.4z"></path>
                        </svg>
                      </div>
                      <div>
                        {/* New bid message content */}
                        <p className="font-bold">New Bid!</p>
                        <p className="text-sm">
                          Someone placed a new bid on this item. With{" "}
                          {notifications[notifications.length - 1]}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Item metadata */}
          <div className="product_meta mb-4 ml-3">
            <p className="">Category:{item.category}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ItemBid;
