"use client";
const Loading = dynamic(() => import("./loading"));
import "../(itemComponents)/style/page.css";
import React, { useEffect, useState } from "react";
import { Player } from "@lottiefiles/react-lottie-player";
import dynamic from "next/dynamic";
const Gallery = dynamic(() => import("../(itemComponents)/itemGallery"));
const ItemHeader = dynamic(() => import("../(itemComponents)/itemHader"));
const ItemBid = dynamic(() => import("../(itemComponents)/itemBid"));
const ItemInfo = dynamic(() => import("../(itemComponents)/itemInfo"));
const ItemDescrption = dynamic(
  () => import("../(itemComponents)/itemDescrption")
);
const ItemSidebar = dynamic(() => import("../(itemComponents)/itemSidebar"));
import axios from "axios";

const Item = ({ params }) => {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [isChatboxOpen, setIsChatboxOpen] = useState(false);

  const handleCloseChat = () => {
    // Handle closing chat
    setIsChatboxOpen(false);
  };

  const handleOpenChat = () => {
    // Handle opening chat
    setIsChatboxOpen(true);
  };
  const handleToggleChat = () => {
    setIsChatboxOpen(!isChatboxOpen);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          ` http://localhost:5000/items/fetch-items/${params.id}`
        );
        setItems(response.data as Item[]);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* <Loading loading={loading} /> */}
      {loading ? (
        <>
          {/* <Player
            autoplay
            speed={1.5}
            loop
            src="https://lottie.host/9bdf25ba-5ca3-44fb-a1b9-18cf62a6ec79/YuknZDDgpg.json"
            style={{ height: "300px", width: "300px" }}
          ></Player> */}
          <Loading loading={loading} />
        </>
      ) : (
        <>
          <div>
            <ItemHeader items={items} />
            <div className="mx-[5%]">
              <div className="galoryBid">
                <div>
                  <Gallery items={items} />
                  <div className="iteminfo galoryBid">
                    <div className="w-11/12">
                      <ItemInfo items={items} />
                      <ItemDescrption items={items} />
                    </div>
                  </div>
                </div>

                <div>
                  <ItemBid items={items} />
                  <ItemSidebar
                    items={items}
                    handleToggleChat={handleToggleChat}
                  />
                </div>
              </div>
            </div>
          </div>
        </>
      )}
      <></>
    </>
  );
};
export default Item;
