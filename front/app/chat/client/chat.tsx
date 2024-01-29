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
  const [messagesResive, setMessagesResive] = useState(null);

  const addMessage = (message) => {
    setMessages([...messages, { text: message, isBot: false }]);
  };

  const handleSendMessage = async (message) => {
    try {
      const clientId = localStorage.getItem("userId");
      console.log("ClientId:", clientId); // Fix typo in variable name

      const response = await fetch("http://localhost:5000/chat/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message,
          timestamp: new Date().toISOString(),
          ClientId: clientId, // Fix typo in variable name
          sellerId: 2, // Replace with the actual seller ID
        }),
      });

      if (response.ok) {
        addMessage(message);
      } else {
        console.error("Failed to send message");
      }
    } catch (error) {
      console.error("Error while sending message:", error);
    }
  };

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const clientId = localStorage.getItem("userId");
        const sellerId = 2;

        const response = await fetch(
          `http://localhost:5000/chat/room/${clientId}/${sellerId}`
        );

        if (response.ok) {
          const messagesData = await response.json();
          setMessagesResive(messagesData);
          console.log("Messages data:", messagesData);
        } else {
          console.error("Failed to fetch messages");
        }
      } catch (error) {
        console.error("Error while fetching messages:", error);
      }
    };

    fetchMessages();

    socket.on("send", (data) => {
      addMessage(data.message);
    });

    return () => {
      socket.off("send");
    };
  }, [setMessages]);

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
          <ChatBody messages={messages} messagesResive={messagesResive} />
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
