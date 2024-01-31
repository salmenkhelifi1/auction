"use client";
import React, { useState } from "react";
import Link from "next/link";
import { FaBasketShopping } from "react-icons/fa6";
import { useRouter } from "next/navigation";
import img1 from "../images/BEE-removebg-preview.png";
import { FaPhoneAlt } from "react-icons/fa";
import { CgMail } from "react-icons/cg";
import { MdAccessTime } from "react-icons/md";
import { MdArrowDownward } from "react-icons/md";
import { RiDashboardFill } from "react-icons/ri";
import { IoPersonOutline } from "react-icons/io5";
import { CiLogout } from "react-icons/ci";

import Image from "next/image";
const Navbar = () => {
  const [home, setHome] = useState(false);
  const [platform, setPlatform] = useState(false);
  const router = useRouter();
  const [shop, setShop] = useState(false);
  const [pages, setPages] = useState(false);
  const [cart, setCart] = useState(false);
  const [account, setAcoount] = useState(false);
  return (
    <>
      <div className="w-full h-[54px] overflow-hidden border-b-[1px] border-gray-200 flex">
        <div className="ml-[2%] border-l-[1px] border-r-[1px] border-gray-200  w-[180px] h-full flex justify-center items-center ">
          <div className="flex  items-center">
            <FaPhoneAlt />
            <h1 className="text-[15px] text-gray-700">+216 97 152 240</h1>
          </div>
        </div>
        <div className=" border-l-[1px] border-r-[1px] border-gray-200  w-[200px] h-full flex justify-center items-center ">
          <div className="flex justify-evenly  items-center">
            <CgMail />
            <h1 className="text-[15px] text-gray-700">auctionBid@gmail.tn</h1>
          </div>
        </div>
        <div className=" border-l-[1px] border-r-[1px] border-gray-200  w-[250px] h-full flex justify-center items-center ">
          <div className="flex  items-center">
            <MdAccessTime />
            <h1 className="text-[15px] text-gray-700">
              Mon - Fri: 10:00 - 18:00
            </h1>
          </div>
        </div>
        <div className="ml-[40%] border-l-[1px] border-r-[1px] border-gray-200  w-[170px] h-full flex justify-center items-center ">
          <div
            className="flex  items-center justify-between cursor-pointer"
            onMouseEnter={() => setAcoount(true)}
          >
            <h1 className="text-[15px] text-gray-700 font-[600]">My Account</h1>
            <MdArrowDownward size={10} />
          </div>
        </div>
        {account && (
          <div
            className="text-[#333333] bg-white w-[170px] h-[120px] leading-[30px]	 pl-[1.5rem] pt-3 shadow-2xl right-[55px] absolute top-[7%] "
            onMouseLeave={() => setAcoount(false)}
          >
            <Link href={"/clientDash"}>
              {" "}
              <div className="flex ">
                {" "}
                <RiDashboardFill className="mt-[5px]" />
                <h1 className="cursor-pointer text-[#333333] font-[600] hover:text-[#ff2800] transition ease-in-out delay-50">
                  Dashboard
                </h1>
              </div>
            </Link>
            <Link href={"/membershipCard"}>
              {" "}
              <div className="flex">
                <CiLogout className="mt-[5px]" />
                <h1 className="cursor-pointer text-[#333333] font-[600] hover:text-[#ff2800] transition ease-in-out delay-50">
                  Account Details
                </h1>
              </div>{" "}
            </Link>
            <Link href={"/"} onClick={() => localStorage.clear()}>
              {" "}
              <div className="flex">
                <IoPersonOutline className="mt-[5px]" />
                <h1 className="cursor-pointer text-[#333333] font-[600] hover:text-[#ff2800] transition ease-in-out delay-50">
                  Log out
                </h1>
              </div>{" "}
            </Link>
          </div>
        )}

        {/* <div className='flex justify-center items-center ml-[8%]'>
      <CgMail />

      <h1 className='text-[15px] text-gray-700'>auctionBid@gmail.tn</h1>

      

      </div> */}
      </div>
      <div
        onMouseLeave={() => {
          setHome(false);
          setPlatform(false);
          setShop(false);
          setPages(false);
          setCart(false);
        }}
      >
        {/* <div 
        className=' w-full h-[54px] bg-[#262626] flex justify-center items-center gap-[80%]'>
        </div> */}
        <div className="flex items-center gap-[30px] text-[#333333] font-[600] mb-[25px]">
          <Image
            className="w-[120px] ml-[75px]  mt-[15px] "
            width={120}
            height={25}
            src="https://res.cloudinary.com/dubduh12x/image/upload/w_1000,ar_16:9,c_fill,g_auto,e_sharpen/v1706702889/rendition-removebg-preview_vpyybp.png"
            alt=""
          />
          <Link
            href={"/home"}
            className="mt-[1%] ml-[10%] hover:text-[#ff2800] transition ease-in-out delay-50 "
            onMouseEnter={() => {
              setHome(true);
              setPlatform(false);
              setShop(false);
              setPages(false);
            }}
          >
            Home
          </Link>

          <h1
            className="mt-[1%] cursor-pointer hover:text-[#ff2800] transition ease-in-out delay-50"
            onMouseEnter={() => {
              setPlatform(true);
              setHome(false);
              setShop(false);
              setPages(false);
            }}
          >
            Platform
          </h1>

          <Link
            href={"/shop"}
            className="mt-[1%] hover:text-[#ff2800] transition ease-in-out delay-50"
            onMouseEnter={() => {
              setShop(true);
              setHome(false);
              setPlatform(false);
              setPages(false);
            }}
          >
            Shop
          </Link>
          <h1
            className="mt-[1%] cursor-pointer hover:text-[#ff2800] transition ease-in-out delay-50"
            onMouseEnter={() => {
              setPages(true);
              setHome(false);
              setPlatform(false);
              setShop(false);
            }}
          >
            Pages
          </h1>
          <Link
            href={"/getInTouch"}
            className="mt-[1%] hover:text-[#ff2800] transition ease-in-out delay-50"
          >
            Get In Touch
          </Link>
          {/* <Link className='hover:text-[#ff2800] ml-[20%] mt-[1%] cursor-pointer' href={'/cart'}> <FaBasketShopping size={25} 
        onMouseEnter={()=>setCart(true)}/>
</Link> */}
          <button className="text-white font-[800] mt-[1%] bg-[#ff2800] rounded w-[132px] h-[43px] float-right hover:text-black hover:bg-white hover:border-[2px] hover:border-black hover:transition ease-in-out delay-50 ml-[15%]">
            Sell Now
          </button>
        </div>

        {platform && (
          <div
            onMouseLeave={() => setPlatform(false)}
            className=" bg-white w-[900px] h-[367px] rounded-[20px] absolute top-[15%] left-[419px] grid grid-cols-2 mt-[10px]"
          >
            <div className="grid grid-cols-2 mt-[2%] ml-[2%] p-5">
              <div className="mb-10">
                <h1 className="font-[700] text-[30px] mb-[15px]">
                  Search Cars
                </h1>
                <div className="flex gap-[10px] mb-[15px]">
                  <img
                    className="w-[20px]"
                    src="https://autobid.modeltheme.com/wp-content/uploads/2023/12/autobid-icon-v2-1.png"
                    alt=""
                  />
                  <h1
                    className="cursor-pointer text-[#333333] font-[600] hover:text-[#ff2800] transition ease-in-out delay-50 "
                    onClick={() => {
                      localStorage.setItem("body", "Convertible");
                      router.push("/shop");
                    }}
                  >
                    Body
                  </h1>
                </div>
                <div className="flex gap-[10px] mb-[15px]">
                  <img
                    className="w-[20px]"
                    src="https://autobid.modeltheme.com/wp-content/uploads/2023/12/autobid-icon-v2-2.png"
                    alt=""
                  />
                  <h1
                    onClick={() => {
                      localStorage.setItem("Color", "Black");
                      router.push("/shop");
                    }}
                    className="cursor-pointer text-[#333333] font-[600] hover:text-[#ff2800] transition ease-in-out delay-50 "
                  >
                    Color
                  </h1>
                </div>
                <div className="flex gap-[10px] mb-[15px]">
                  <img
                    className="w-[20px]"
                    src="https://autobid.modeltheme.com/wp-content/uploads/2023/12/autobid-icon-v2-4.png"
                    alt=""
                  />
                  <h1
                    onClick={() => {
                      localStorage.setItem("Capacity", "1.0L");
                      router.push("/shop");
                    }}
                    className="cursor-pointer text-[#333333] font-[600] hover:text-[#ff2800] transition ease-in-out delay-50 "
                  >
                    Capacity
                  </h1>
                </div>
                <div className="flex gap-[10px] mb-[15px]">
                  <img
                    className="w-[20px]"
                    src="https://autobid.modeltheme.com/wp-content/uploads/2023/12/autobid-icon-v2-3.png"
                    alt=""
                  />
                  <h1
                    onClick={() => {
                      localStorage.setItem("Gearbox", "automatic");
                      router.push("/shop");
                    }}
                    className="cursor-pointer text-[#333333] font-[600] hover:text-[#ff2800] transition ease-in-out delay-50 "
                  >
                    Gearbox
                  </h1>
                </div>
                <div className="flex gap-[10px] mb-[15px]">
                  <img
                    className="w-[20px] h-[20px]"
                    src="https://autobid.modeltheme.com/wp-content/uploads/2023/12/autobid-icon-v2-5.png"
                    alt=""
                  />
                  <h1
                    onClick={() => {
                      localStorage.setItem(
                        "Climatisation",
                        "Automatic Climate Control"
                      );
                      router.push("/shop");
                    }}
                    className="cursor-pointer text-[#333333] font-[600] hover:text-[#ff2800] transition ease-in-out delay-50 "
                  >
                    Climatisation
                  </h1>
                  <br />
                </div>
                <Link href={"/shop"}>
                  <button className="font-[700] text-[15px] text-[#ff2800]">
                    Explore All Categories
                  </button>
                </Link>
              </div>
              <div>
                <h1 className="font-[700] text-[30px] mb-[15px]">
                  Search Parts
                </h1>
                <div className="flex gap-[10px] mb-[15px]">
                  <img
                    className="w-[20px]"
                    src="https://autobid.modeltheme.com/wp-content/uploads/2023/12/autobid-icon-v2-6.png"
                    alt=""
                  />
                  <h1 className="cursor-pointer text-[#333333] font-[600] hover:text-[#ff2800] transition ease-in-out delay-50 ">
                    Appointment
                  </h1>
                </div>
                <div className="flex gap-[10px] mb-[15px]">
                  <img
                    className="w-[20px]"
                    src="https://autobid.modeltheme.com/wp-content/uploads/2023/12/autobid-icon-v2-7.png"
                    alt=""
                  />
                  <h1 className="cursor-pointer text-[#333333] font-[600] hover:text-[#ff2800] transition ease-in-out delay-50 ">
                    Dimensions
                  </h1>
                </div>
                <div className="flex gap-[10px] mb-[15px]">
                  <img
                    className="w-[20px]"
                    src="https://autobid.modeltheme.com/wp-content/uploads/2023/12/autobid-icon-v2-8.png"
                    alt=""
                  />
                  <h1 className="cursor-pointer text-[#333333] font-[600] hover:text-[#ff2800] transition ease-in-out delay-50 ">
                    Manifacturer
                  </h1>
                </div>
                <div className="flex gap-[10px] mb-[15px]">
                  <img
                    className="w-[20px]"
                    src="https://autobid.modeltheme.com/wp-content/uploads/2023/12/autobid-icon-v2-9.png"
                    alt=""
                  />
                  <h1 className="cursor-pointer text-[#333333] font-[600] hover:text-[#ff2800] transition ease-in-out delay-50 ">
                    Material
                  </h1>
                </div>
                <div className="flex gap-[10px] mb-[15px]">
                  <img
                    className="w-[20px] h-[20px]"
                    src="https://autobid.modeltheme.com/wp-content/uploads/2023/12/autobid-icon-v2-10.png"
                    alt=""
                  />
                  <h1 className="cursor-pointer text-[#333333] font-[600] hover:text-[#ff2800] transition ease-in-out delay-50 ">
                    Weight
                  </h1>
                  <br />
                </div>
              </div>
            </div>
            <div
              style={{
                backgroundImage:
                  "url(https://images.pexels.com/photos/919073/pexels-photo-919073.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)",
                backgroundSize: "cover",
                borderBottomRightRadius: "20px",
                borderTopRightRadius: "20px",
              }}
            ></div>
          </div>
        )}

        {/* {shop&&<div className='text-[#333333] bg-white w-[150px] h-[144px] leading-[30px]	 pl-[1.5rem] pt-3 shadow-2xl absolute top-[16%] left-[35%] '
        onMouseLeave={()=>setShop(false)}
        >
           <Link href={'/shop'}> <h1 className= 'cursor-pointer text-[#333333] font-[600] hover:text-[#ff2800] transition ease-in-out delay-50'>Shop Page</h1></Link>
            <Link href={'/membershipCard'}> <h1 className='cursor-pointer text-[#333333] font-[600] hover:text-[#ff2800] transition ease-in-out delay-50'>Checkout</h1></Link>
           <Link href={'/cart'}> <h1 className='cursor-pointer text-[#333333] font-[600] hover:text-[#ff2800] transition ease-in-out delay-50'>Cart</h1></Link>
           <Link href={'/'}></Link> <h1 className='cursor-pointer text-[#333333] font-[600] hover:text-[#ff2800] transition ease-in-out delay-50'>My Account</h1>
        </div>} */}
        {pages && (
          <div
            className="text-[#333333] bg-white w-[170px] h-[165px] leading-[30px]	 pl-[1.5rem] pt-3 shadow-2xl absolute top-[16%] left-[40%] "
            onMouseLeave={() => setPages(false)}
          >
            <Link href={"/Howitwork"}>
              {" "}
              <h1 className="cursor-pointer text-[#333333] font-[600] hover:text-[#ff2800] transition ease-in-out delay-50">
                How It Works
              </h1>
            </Link>
            <Link href={"/membershipCard"}>
              {" "}
              <h1 className="cursor-pointer text-[#333333] font-[600] hover:text-[#ff2800] transition ease-in-out delay-50">
                Pricing Services
              </h1>
            </Link>
            <Link href={"/aboutUs"}>
              {" "}
              <h1 className="cursor-pointer text-[#333333] font-[600] hover:text-[#ff2800] transition ease-in-out delay-50">
                About us
              </h1>
            </Link>
            <Link href={"/faq"}>
              {" "}
              <h1 className="cursor-pointer text-[#333333] font-[600] hover:text-[#ff2800] transition ease-in-out delay-50">
                faq
              </h1>
            </Link>

            <Link href={"/404"}>
              {" "}
              <h1 className="cursor-pointer text-[#333333] font-[600] hover:text-[#ff2800] transition ease-in-out delay-50">
                404 Not Found
              </h1>
            </Link>
          </div>
        )}
        {/* {cart&&
        <div className='text-[#333333] bg-white w-[350px] h-[144px] pl-[1.5rem] pt-3 shadow-2xl absolute top-[16%] left-[70%] rounded-[20px]'
        onMouseLeave={()=>setCart(false)}
        >
            <h1 className= ' text-[#333333] font-[600] text-[30px] '>Cart</h1>
            <h1>No Product In The Cart!</h1>
           
        </div>
         }  */}
      </div>
    </>
  );
};

export default Navbar;
