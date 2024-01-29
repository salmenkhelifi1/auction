// ChatButton.jsx
import React from "react";
import { FiMessageSquare, FiX } from "react-icons/fi";

const ChatButton = ({ isChatboxOpen, handleCloseChat, handleOpenChat }) => {
  return (
    <button
      className={`${
        isChatboxOpen ? "bg-red-300" : "bg-red-700"
      } text-white px-4 py-2 rounded-full fixed bottom-4 right-4 flex items-center`}
      onClick={isChatboxOpen ? handleCloseChat : handleOpenChat}
    >
      {isChatboxOpen ? (
        <>
          <FiX className="mr-2" /> Close
        </>
      ) : (
        <>
          <FiMessageSquare className="mr-2" /> Open
        </>
      )}
    </button>
  );
};

export default ChatButton;
