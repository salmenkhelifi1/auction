"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaCircleArrowLeft, FaCircleArrowRight } from "react-icons/fa6";
import "./style/auctionHistory.css";
function AuctionHistory({ items }) {
  const [data, setData] = useState([]);
  const [visibleItems, setVisibleItems] = useState(10);
  const [bids, setBids] = useState([]);
  const [page, setPages] = useState(1);
  useEffect(() => {
    fetchData();
  }, [items, visibleItems, page]);
  const fetchData = async () => {
    try {
      const requests = items
        .slice(0, visibleItems)
        .map((item) =>
          axios.get(`http://localhost:5000/Seller/profile/${items.seller.id}`)
        );

      const responses = await Promise.all(requests);
      const responseData = responses.map((response) => response.data);
      setData(responseData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [items, visibleItems]);

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
  useEffect(() => {
    axios
      .get(
        `http://localhost:5000/bid/fetch-items/BidsByItems/${items[0].id}?page=${page}`
      )
      .then((r) => setBids((prev) => [...prev, ...r.data]))
      .catch((err) => console.log(err));
  }, [page]);

  const handleLoadMore = () => {
    // Increment the page when the "Load More" button is clicked
    setPages(page + 1);
    setBids([]);
  };

  const handleLoadBack = () => {
    if (page > 1) {
      // Decrement the page when the "Back" button is clicked (if not on the first page)
      setPages((prevPage) => prevPage - 1);
      // Clear the existing bids to display the previous page's bids
      setBids([]);
    }
  };
  return (
    <>
      <table>
        <tbody>
          <tr>
            <th>Auction started</th>
            <td>{formatDateTime(items[0].timeStart)}</td>
            <td>{items.price} £</td>
          </tr>
          {bids.map((el, index) => (
            <tr key={index}>
              <th>
                {el?.Client.name} {el?.Client.lastName}
              </th>
              <td>{formatDateTime(el.updatedAt)}</td>

              <td>{bids[index]?.bidAmount}$</td>
            </tr>
          ))}
          <tr>
            <th>Auction End</th>
            <td>{formatDateTime(items[0].timeEnd)}</td>
            <td>
              {new Date(items[0].timeEnd) > new Date()
                ? "still not finished"
                : items.length > 0
                ? items[0].bids[items[0].bids.length - 1].bidAmount
                : "No bids yet"}
            </td>
          </tr>
        </tbody>
      </table>
      <div>
        <div className="flex justify-end mr-10 mt-5">
          {bids && (
            <button
              onClick={handleLoadBack}
              className="rounded-full bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 p-8 ransition duration-500 ease-in-out"
            >
              <FaCircleArrowLeft />
            </button>
          )}
          {bids.length > 0 && (
            <button
              className="rounded-full bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 p-8 ransition duration-500 ease-in-out"
              onClick={handleLoadMore}
            >
              <FaCircleArrowRight />
            </button>
          )}
        </div>
      </div>
    </>
  );
}

export default AuctionHistory;
