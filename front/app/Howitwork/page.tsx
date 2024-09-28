"use client";
import React, { FC, useCallback } from "react";
import "./HowItWork.css";
import Navbar from "../home/navbar";
const Howitwork: FC = () => {
  const onHeaderContainer1Click = useCallback(() => {}, []);
  const divStyle = {
    backgroundImage:
      "url(https://autobid.modeltheme.com/wp-content/uploads/2023/11/autobid-hiw-banner-v2.jpg?id=7264)",
    backgroundSize: "cover",
    backgroundPosition: "center",
    color: "#fff",
    textAlign: "center" as "center",
    padding: "230px",
  };
  return (
    <div>
      <div className="abou">
        <Navbar />
        <div style={divStyle}>
          <h1 className="lemon-regular ">How It Works</h1>
          <h2 className="fugaz-one-regular ">
            DISCOVER, BID, AND WIN – YOUR GATEWAY TO EXCEPTIONAL AUCTION
            EXPERIENCES!
          </h2>
        </div>
        <div className="our-story-paren">
          <p className="p1">How It Works</p>
          <div className="our-stor">Registration And Account</div>

          <div className="launced-in-2015-exclusive-is-paren">
            <div className="launced-in-201">{`Discover a seamless Registration and Account experience at Autobid, where we seamlessly blend innovative technology with a hassle-free process, ensuring you embark on your car-buying journey with confidence.

Effortless Registration: Simply fill in your details, and you’re ready to dive into our world of vehicles.
Real-Time Updates: Is. Receive updates on your bids, auction status, and exclusive offers.
Personalized Account: Save your favorite vehicles, track your bidding history, and set custom alerts for upcoming auctions.
Secure Profile Management: Your personal information and transactions are safeguarded, allowing you to bid confidently in a secure environment. `}</div>
          </div>
          <div className="side-imag">
            <img
              className="portrait-two-african-females-h-ico"
              src="https://autobid.modeltheme.com/wp-content/uploads/2023/11/autobid-how-it-works-2.jpg"
              alt="about"
            />
          </div>
          <div className="gray-box">
            <div className="our-story-paren">
              <p className="p">How It Works</p>
              <div className="our-store">Browse And Select A Vehicle</div>
              <div className="launced-in-2015-exclusive-is-paren">
                <div className="launced-in-201">{`At AutoBid, we understand that finding the perfect vehicle is a pivotal part of your car-buying journey. Our Browse and Select a Vehicle section is designed to provide you with a seamless and enjoyable exploration of our diverse range of cars. Here’s what sets this section apart:

Intuitive Interface: Our user-friendly interface allows you to effortlessly browse through a wide variety of vehicles.
Comprehensive Information: Each vehicle listing is accompanied by detailed information, including specifications, features, and high-quality images.
Advanced Filters: Narrow down your options quickly with our advanced filtering system. Whether you’re looking for a specific make, model year, or price range..
Compare and Contrast: Easily compare multiple vehicles side by side to make the decision-making process even smoother. . `}</div>
              </div>
              <div className="side-image">
                <img
                  className="portrait-two-african-females-h-ico"
                  src="https://autobid.modeltheme.com/wp-content/uploads/2023/11/autobid-how-it-works-3.jpg"
                  alt="about"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div />
      <div className="img10">
        <img
          src="https://cdni.autocarindia.com/utils/imageresizer.ashx?n=https://cms.haymarketindia.net/model/uploads/modelimages/Lamborghini-Revuelto-190920231426.jpg&w=872&h=578&q=75&c=1"
          width={600}
          alt=""
        />
        <p className="para">
          A trusted website is characterized by its reliability, credibility,
          and security. It consistently provides accurate information, maintains
          a transparent and ethical approach, and ensures the privacy and safety
          of its users. Verified by reputable sources, a trusted website fosters
          user confidence through a track record of dependability and a
          commitment to delivering a secure and valuable online experience.
        </p>
      </div>
    </div>
  );
};

export default Howitwork;
