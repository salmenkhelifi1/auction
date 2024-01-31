import React from "react";
import MessageBubble from "./messageBubble";
import { useChat } from "../chatContext";
const ChatInput = dynamic(() => import("../(seller)/chatInpout"));

import "./css/scrollbar.css";
import dynamic from "next/dynamic";
const MessageList = ({ messagesResive, messages }) => {
  const { selectedChat, chatMessages } = useChat();
  const { addMessageToRoom } = useChat();
  const handleSendMessage = (message) => {
    const roomId = selectedChat.id;
    const newMessage = {
      id: chatMessages[roomId].length + 1,
      roomId,
      text: message,
      sender: "Lina Dry",
    };
    addMessageToRoom(newMessage);
  };
  // Assume you have a list of messages for the selected chat

  // Filter messages related to the selected chat
  const chatMessagesForSelectedChat = chatMessages[selectedChat?.id] || [];

  return (
    <div>
      <MessageBubble
        className="flex-1 p-4 h-[70vh] scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 overflow-y-scroll "
        messagesResive={messagesResive}
        messages={messages}
      />
      <ChatInput onSend={handleSendMessage} />
    </div>
  );
};

export default MessageList;
