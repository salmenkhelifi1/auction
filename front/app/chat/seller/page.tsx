"use client";
import React, { useEffect, useState } from "react";
import ChatList from "./(seller)/chatList";
import ChatWindow from "./(seller)/chatWindow";
// import SellerChatHeader from "./(seller)/sellerChatHeader";
import ChatInfoPanel from "./(seller)/chatInfoPanel";
import { ChatProvider } from "./chatContext";
import socket from "../../item/(itemComponents)/bid/socket";

const ChatSeller = () => {
  const [chats, setChats] = useState([]);
  const [messages, setMessages] = useState([]);
  const [isChatboxOpen, setIsChatboxOpen] = useState(true);
  const [messagesResive, setMessagesResive] = useState(null);
  const [refrech, setRefrech] = useState(false);

  console.log("clicked", refrech);

  const addMessage = (message) => {
    setMessages((prevMessages) => [
      ...prevMessages,
      { text: message, isBot: false },
    ]);
  };

  const fetchMessages = async () => {
    try {
      const clientId = localStorage.getItem("userId");
      const sellerId = 2;

      // Fetch messages from both client and seller endpoints
      const [clientMessagesResponse, sellerMessagesResponse] =
        await Promise.all([
          fetch(`http://localhost:5000/chat/client/${clientId}`),
          fetch(`http://localhost:5000/chat/seller/${sellerId}`),
        ]);

      if (clientMessagesResponse.ok && sellerMessagesResponse.ok) {
        const clientMessagesData = await clientMessagesResponse.json();
        const sellerMessagesData = await sellerMessagesResponse.json();

        const addKeyToMessages = (messages, prefix) =>
          messages.map((message, index) => ({
            ...message,
            key: `${prefix}_${index}`,
          }));

        const clientMessagesWithKey = addKeyToMessages(
          clientMessagesData,
          "client"
        );
        const sellerMessagesWithKey = addKeyToMessages(
          sellerMessagesData,
          "seller"
        );

        const mergedMessages = [
          ...clientMessagesWithKey,
          ...sellerMessagesWithKey,
        ];

        const sortedMessages = mergedMessages
          .filter((message) => message.text !== null)
          .sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));

        setMessagesResive(sortedMessages);
        console.log("Messages data:", sortedMessages);
      } else {
        console.error("Failed to fetch messages");
      }
    } catch (error) {
      console.error("Error while fetching messages:", error);
    }
  };

  useEffect(() => {
    // Fetch messages when refrech changes
    fetchMessages();
  }, [refrech]);

  useEffect(() => {
    // Fetch data from the server
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/chat/all-clients");
        const data = await response.json();
        setChats(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const clikcount = () => {
    // Toggle refrech state to trigger the useEffect
    setRefrech((prevRefrech) => !prevRefrech);
  };

  return (
    <>
      <ChatProvider>
        <div className="" style={{ height: "100vh", overflow: "hidden" }}>
          <div
            className="flex relative"
            onMouseEnter={() => {
              clikcount();
            }}
          >
            <ChatList chats={chats} />
            <ChatWindow messagesResive={messagesResive} />
          </div>
        </div>
      </ChatProvider>
    </>
  );
};

export default ChatSeller;
