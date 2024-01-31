import React, { useState } from "react";
import dynamic from "next/dynamic";
import { TbMenu2 } from "react-icons/tb";
import { CgMenuRightAlt } from "react-icons/cg";
import ChatHeader from "./chatHeader";
import MessageList from "./messageList";
import { useChat } from "../chatContext";
import ChatInfoPanel from "./chatInfoPanel";

const ChatWindow = ({ messagesResive }) => {
  const { selectedChat, chatMessages, addMessageToRoom } = useChat();

  const [infoPanelVisible, setInfoPanelVisible] = useState(false);
  const [icon, setIcon] = useState(
    <TbMenu2 className="text-red-500 h-11 w-11 absolute z-50 right-4" />
  );

  

  const handleToggleInfoPanel = () => {
    setInfoPanelVisible((prevVisible) => !prevVisible);

    // Change the icon every time the button is clicked
    setIcon(() =>
      infoPanelVisible ? (
        <TbMenu2 className="text-red-500 h-11 w-11 absolute z-50 right-4" />
      ) : (
        <CgMenuRightAlt className="text-red-500 h-11 w-11 absolute z-50 right-4" />
      )
    );
  };
  if (!selectedChat) {
    return (
      <>
        <div className="w-full grid place-content-center">
          <img
            className="w-[300px] h-[300px]"
            src="https://res.cloudinary.com/dubduh12x/image/upload/v1706275988/emptymessage_zrjkaj.webp"
            alt=""
          />
          <div className="p-4 text-center  text-sm font-bold">
            Select a chat to start messaging
          </div>
        </div>
      </>
    );
  }
  return (
    <div className="flex-1 h-4/ relative">
      {selectedChat !== null && (
        <button
          onClick={handleToggleInfoPanel}
          className="absolute top-4 right-2 hello"
        >
          {icon}
        </button>
      )}

      <div className="flex">
        <div className="flex-1">
          <ChatHeader chat={selectedChat} />
          <MessageList chat={selectedChat} messagesResive={messagesResive} />
        </div>

        {infoPanelVisible && (
          <ChatInfoPanel chats={selectedChat} className="ml-10 " />
        )}
      </div>
    </div>
  );
};

export default ChatWindow;
