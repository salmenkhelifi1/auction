"use client";
import dynamic from "next/dynamic";
import { useState } from "react";

const ChatHeader = dynamic(() => import("./(chat)/chatHader"));
const ChatBody = dynamic(() => import("./(chat)/chatBody"));
const ChatInput = dynamic(() => import("./(chat)/chatInpout"));

const ChatButton = dynamic(() => import("./(chat)/chatButton"));

const ChatPage = () => {
  const [messages, setMessages] = useState([]);
  const [isChatboxOpen, setIsChatboxOpen] = useState(true);

  const addUserMessage = (message) => {
    setMessages([...messages, { text: message, isBot: false }]);
  };

  const addBotMessage = (message) => {
    setMessages([...messages, { text: message, isBot: true }]);
  };

  const respondToUser = (userMessage) => {
    setTimeout(() => {
      addBotMessage("This is a response from the chatbot.");
    }, 500);
  };

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
  return (
    <>
      <div
        className={
          isChatboxOpen
            ? "drop-shadow-xl fixed bottom-16 right-4 w-96"
            : "hidden"
        }
      >
        <div className="bg-white shadow-md rounded-lg max-w-lg w-full">
          <ChatHeader onClose={handleCloseChat} onToggle={handleToggleChat} />
          <ChatBody messages={messages} />
          <ChatInput onSend={addUserMessage} />
        </div>
      </div>
      <ChatButton
        isChatboxOpen={isChatboxOpen}
        handleCloseChat={handleCloseChat}
        handleOpenChat={handleOpenChat}
      />
    </>
  );
};

export default ChatPage;
