// Import necessary dependencies
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import socket from "../../item/(itemComponents)/bid/socket";

// Import dynamic components
const ChatHeader = dynamic(() => import("./(chat)/chatHader"));
const ChatBody = dynamic(() => import("./(chat)/chatBody"));
const ChatInput = dynamic(() => import("./(chat)/chatInpout"));
const ChatButton = dynamic(() => import("./(chat)/chatButton"));
const ChatPage = () => {
  const [messages, setMessages] = useState([]);
  const [isChatboxOpen, setIsChatboxOpen] = useState(true);
  // const userId =
  //   typeof window !== "undefined" ? localStorage.getItem("userId") : null;
  // console.log("userId in the chat", userId);

  // Function to add a message to the state
  const addMessage = (message) => {
    setMessages([...messages, { text: message, isBot: false }]);
  };

  // Function to handle sending a user message
  const handleSendMessage = async (message) => {
    try {
      // Send message to the server
      const ClientId = localStorage.getItem("userId");
      console.log("ClientId:", ClientId);
      const response = await fetch("http://localhost:5000/chat/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message,
          timestamp: new Date().toISOString(),
          ClientId: ClientId, // This is hardcoded
          sellerId: 2, // Replace with the actual seller ID
        }),
      });

      if (response.ok) {
        // Message sent successfully
        addMessage(message);
      } else {
        // Handle error
        console.error("Failed to send message");
      }
    } catch (error) {
      console.error("Error while sending message:", error);
    }
  };

  useEffect(() => {
    // Fetch notifications when the component mounts
    const fetchNotifications = async () => {
      try {
        const response = await fetch("http://localhost:5000/chat/all");
        if (response.ok) {
          const notificationData = await response.json();
          // Handle the notification data, update state or perform any other actions
          console.log("Notification data:", notificationData);
        } else {
          console.error("Failed to fetch notifications");
        }
      } catch (error) {
        console.error("Error while fetching notifications:", error);
      }
    };

    fetchNotifications(); // Call the function when the component mounts

    // Set up socket event listeners
    socket.on("newMessage", (data) => {
      // Handle new messages from others
      addMessage(data.message);
    });

    // Clean up socket event listener on component unmount
    return () => {
      socket.off("newMessage");
    };
  }, []); // Empty dependency array ensures this effect runs only once

  const handleCloseChat = () => {
    setIsChatboxOpen(false);
  };

  const handleOpenChat = () => {
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
          <ChatInput onSend={handleSendMessage} />
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
