// // Import necessary dependencies
// import dynamic from "next/dynamic";
// import { useEffect, useState } from "react";
// import socket from "../../item/(itemComponents)/bid/socket";

// // Import dynamic components
// const ChatHeader = dynamic(() => import("./(chat)/chatHader"));
// const ChatBody = dynamic(() => import("./(chat)/chatBody"));
// const ChatInput = dynamic(() => import("./(chat)/chatInpout"));
// const ChatButton = dynamic(() => import("./(chat)/chatButton"));

// const ChatPage = () => {
//   const [messages, setMessages] = useState([]);
//   const [isChatboxOpen, setIsChatboxOpen] = useState(true);
//   const [messagesResive, setMessagesResive] = useState(null);

//   const addMessage = (message) => {
//     setMessages((prevMessages) => [
//       ...prevMessages,
//       { text: message, isBot: false },
//     ]);
//   };

//   const handleSendMessage = async (message) => {
//     try {
//       const clientId = localStorage.getItem("userId");
//       console.log("ClientId:", clientId); // Fix variable name

//       const response = await fetch(
//         "http://localhost:5000/chat/send-client-message",
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             message,
//             timestamp: new Date().toISOString(),
//             clientId: clientId, // Fix variable name
//             sellerId: 2, // Replace with the actual seller ID
//           }),
//         }
//       );

//       if (response.ok) {
//         addMessage(message);
//       } else {
//         console.error("Failed to send message");
//       }
//     } catch (error) {
//       console.error("Error while sending message:", error);
//     }
//   };

//   useEffect(() => {
//     const fetchMessages = async () => {
//       try {
//         const clientId = localStorage.getItem("userId");
//         const sellerId = 2;

//         const response = await fetch(
//           `http://localhost:5000/chat/client/${clientId}`
//         );

//         if (response.ok) {
//           const messagesData = await response.json();
//           setMessagesResive(messagesData);
//           console.log("Messages data:", messagesData);
//         } else {
//           console.error("Failed to fetch messages");
//         }
//       } catch (error) {
//         console.error("Error while fetching messages:", error);
//       }
//     };

//     fetchMessages();

//     const receiveMessageHandler = (message) => {
//       console.log("Received message:", message);
//       addMessage(message.text);
//     };

//     // Attach event listener when the component mounts
//     socket.on("receiveMessage", receiveMessageHandler);

//     // Detach event listener when the component unmounts
//     return () => {
//       socket.off("receiveMessage", receiveMessageHandler);
//     };
//   }, []);

//   const handleCloseChat = () => {
//     setIsChatboxOpen(false);
//   };

//   const handleOpenChat = () => {
//     setIsChatboxOpen(true);
//   };

//   const handleToggleChat = () => {
//     setIsChatboxOpen((prevIsChatboxOpen) => !prevIsChatboxOpen);
//   };

//   return (
//     <>
//       <div
//         className={
//           isChatboxOpen
//             ? "drop-shadow-xl fixed bottom-16 right-4 w-96"
//             : "hidden"
//         }
//       >
//         <div className="bg-white shadow-md rounded-lg max-w-lg w-full">
//           <ChatHeader onClose={handleCloseChat} onToggle={handleToggleChat} />
//           <ChatBody messages={messages} messagesResive={messagesResive} />
//           <ChatInput onSend={handleSendMessage} />
//         </div>
//       </div>
//       <ChatButton
//         isChatboxOpen={isChatboxOpen}
//         handleCloseChat={handleCloseChat}
//         handleOpenChat={handleOpenChat}
//       />
//     </>
//   );
// };

// export default ChatPage;
import { useEffect, useState } from "react";
import socket from "../../item/(itemComponents)/bid/socket";
import dynamic from "next/dynamic";

// Import dynamic components
const ChatHeader = dynamic(() => import("./(chat)/chatHader"));
const ChatBody = dynamic(() => import("./(chat)/chatBody"));
const ChatInput = dynamic(() => import("./(chat)/chatInpout"));
const ChatButton = dynamic(() => import("./(chat)/chatButton"));

const ChatPage = () => {
  const [messages, setMessages] = useState([]);
  const [isChatboxOpen, setIsChatboxOpen] = useState(true);
  const [messagesResive, setMessagesResive] = useState(null);
  const [refrech, setRefrech] = useState(false);

  console.log("sortesetMessagesResivedMessages", refrech);

  const addMessage = (message) => {
    setMessages((prevMessages) => [
      ...prevMessages,
      { text: message, isBot: false },
    ]);
  };

  const handleSendMessage = async (message) => {
    try {
      const ClientId = localStorage.getItem("userId");

      const response = await fetch(
        "http://localhost:5000/chat/send-client-message",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            message,
            timestamp: new Date().toISOString(),
            ClientId: ClientId,
            sellerId: 2, // Replace with the actual seller ID
          }),
        }
      );

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

    fetchMessages();

    const receiveMessageHandler = (message) => {
      console.log("Received message:", message);
      addMessage(message.text);
    };

    // Attach event listener when the component mounts
    socket.on("receiveMessage", receiveMessageHandler);

    // Detach event listener when the component unmounts
    return () => {
      socket.off("receiveMessage", receiveMessageHandler);
    };
  }, [refrech]);

  const handleCloseChat = () => {
    setIsChatboxOpen(false);
  };

  const handleOpenChat = () => {
    setIsChatboxOpen(true);
  };

  const handleToggleChat = () => {
    setIsChatboxOpen((prevIsChatboxOpen) => !prevIsChatboxOpen);
  };

  const clikcount = () => {
    // Toggle refrech state to trigger the useEffect
    setRefrech((prevRefrech) => !prevRefrech);
  };
  console.log("clikcount", clikcount);

  return (
    <>
      <div
        className={
          isChatboxOpen
            ? "drop-shadow-xl fixed bottom-16 right-4 w-96"
            : "hidden"
        }
      >
        <div
          className="bg-white shadow-md rounded-lg max-w-lg w-full"
          onMouseEnter={() => {
            clikcount();
          }}
        >
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
