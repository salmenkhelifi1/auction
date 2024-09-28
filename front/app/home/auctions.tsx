"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
const Auctions = () => {
  const [color, setColor] = useState([false, false]);
  const [data, setData] = useState([]);
  const [allData, setAllData] = useState([]);
  const [allData1, setAllData1] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:5000/items/fetch-items")
      .then((r) => {
        console.log(r.data);
        setData(r.data);
        setAllData(r.data);
        setAllData1(r.data);
      })
      .catch((err) => console.log(err));
  }, []);
  const endingSoon = () => {
    const filtered = allData.filter((el) => {
      if (
        Math.floor(
          (new Date().getTime() - new Date(el.timeEnd).getTime()) / 3600000
        ) < 0
      ) {
        return (
          Math.floor(
            (new Date(el.timeEnd).getTime() - new Date().getTime()) / 3600000
          ) <= 48
        );
      }
    });
    setData(filtered);
  };
  return (
    <div className="w-[90%] h-[100%] ml-[5%]  ">
      <h1 className="float-start font-[800] text-[34px] mt-[10%] ">Auctions</h1>
      <div className="flex gap-[10px] mb-[10%] float-right mt-[10%] font-[700] text-[#666] cursor-pointer ">
        <h1
          style={{ color: color[0] ? "black" : "#666", marginRight: "15px" }}
          onClick={() => {
            setColor([true, false]);
            setData(allData1.slice(allData1.length - 8, allData1.length));
          }}
        >
          Newly Listed
        </h1>
        <h1
          style={{ color: color[1] ? "black" : "#666", marginRight: "28px" }}
          onClick={() => {
            setColor([false, true]);
            endingSoon();
          }}
        >
          Ending Soon
        </h1>
      </div>
      <div className="flex gap-[2%]   w-[100%] h-auto top-[150%] flex-wrap ">
        {data.map((el, i) => (
          <div className=" w-[23%] h-[30%] rounded-3xl mb-[2%] border-[2px]  shadow-2xl">
            <img
              className="w-[350px] hover:w-[351px] transition-all rounded-t-3xl overflow-hidden"
              src={el.images[0]}
              alt=""
            />
            <div className="p-[15px] text-[#333333]">
              <Link href={`/item/${el.id}`}>
                {" "}
                <h1 className="cursor-pointer hover:text-[#ff2800] text-[20px] font-[600]">
                  {el.name}
                </h1>
              </Link>
              <h1 className="mb-[10px] font-[500]">{el.short_description}</h1>
              <h1 className="font-[300] text-[13px]">
                {Math.floor(
                  (new Date().getTime() - new Date(el.timeEnd).getTime() < 0
                    ? new Date(el.timeEnd).getTime() - new Date().getTime()
                    : 0) / 3600000
                )}
                h
              </h1>
            </div>
          </div>
        ))}
        {/* <div className=' w-[25%] h-[30%] rounded-3xl border-[2px]'>
            <img className='w-[350px] hover:w-[351px] transition-all rounded-t-3xl overflow-hidden' src="https://autobid.modeltheme.com/wp-content/uploads/2023/11/autobid-vehicle-6-500x317.jpg" alt="" />
            <div className='p-[15px] text-[#333333]'>
            <h1 className='cursor-pointer hover:text-[#ff2800] text-[20px] font-[600]'>Tesla Model 3</h1>
            <h1 className='mb-[10px] font-[500]'>2018 · 121 787 km · 2 995 cm3 · Diesel</h1>
            <h1 className='font-[300] text-[13px]'>Auction Ended</h1>
            </div>
        </div> */}
        {/* <div className=' w-[25%] h-[30%] rounded-3xl border-[2px]'>
            <img className='w-[350px] hover:w-[351px] transition-all rounded-t-3xl overflow-hidden' src="https://autobid.modeltheme.com/wp-content/uploads/2023/11/autobid-vehicle-6-500x317.jpg" alt="" />
            <div className='p-[15px] text-[#333333]'>
            <h1 className='cursor-pointer hover:text-[#ff2800] text-[20px] font-[600]'>Tesla Model 3</h1>
            <h1 className='mb-[10px] font-[500]'>2018 · 121 787 km · 2 995 cm3 · Diesel</h1>
            <h1 className='font-[300] text-[13px]'>Auction Ended</h1>
            </div>
        </div>
        <div className=' w-[25%] h-[30%] rounded-3xl border-[2px]'>
            <img className='w-[350px] hover:w-[351px] transition-all rounded-t-3xl overflow-hidden' src="https://autobid.modeltheme.com/wp-content/uploads/2023/11/autobid-vehicle-6-500x317.jpg" alt="" />
            <div className='p-[15px] text-[#333333]'>
            <h1 className='cursor-pointer hover:text-[#ff2800] text-[20px] font-[600]'>Tesla Model 3</h1>
            <h1 className='mb-[10px] font-[500]'>2018 · 121 787 km · 2 995 cm3 · Diesel</h1>
            <h1 className='font-[300] text-[13px]'>Auction Ended</h1>
            </div>
        </div> */}
      </div>
    </div>
  );
};

export default Auctions;
