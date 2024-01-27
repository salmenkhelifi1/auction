"use client";
import React from "react";
import dynamic from "next/dynamic";
const Navbar = dynamic(() => import("../../home/navbar"));
import { AppProgressBar as ProgressBar } from "next-nprogress-bar";

const Layout = ({ children }) => {
  return (
    <>
      <header>
        <Navbar />
      </header>
      <div>
        <main>{children}</main>
        <ProgressBar
          height="5px"
          color="#FF2800"
          options={{ showSpinner: true }}
          shallowRouting
        />
      </div>
    </>
  );
};

export default Layout;
