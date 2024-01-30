// import React from "react";

// const ChatBody = ({ messages, messagesResive, ClientId }) => {
//   const reversedMessages = [...messages];

//   const reversedNotificationMessages = Array.isArray(messagesResive)
//     ? [...messagesResive].map((notification) => ({
//         text: notification.message,
//         isSeller: notification.ClientId !== ClientId,
//       }))
//     : [];

//   const allMessages = [...reversedNotificationMessages, ...reversedMessages];

//   return (
//     <div className="p-4 h-80 overflow-y-auto scroll-smooth">
//       {allMessages.map((message, index) => (
//         <div
//           key={index}
//           className={`mb-2 ${message.isSeller ? "" : "text-right"}`}
//         >
//           <p
//             className={`rounded-lg py-2 px-4 inline-block ${
//               message.isSeller
//                 ? "bg-gray-200 text-gray-700"
//                 : " bg-red-500 text-white"
//             }`}
//           >
//             {message.text}
//           </p>
//         </div>
//       ))}
//     </div>
//   );
// };

//export default ChatBody;
// import React from "react";

// const renderMessage = (message, isSeller) => (
//   <div key={message.key} className={`mb-2 ${isSeller ? "" : "text-right"}`}>
//     <p
//       className={`rounded-lg py-2 px-4 inline-block ${
//         isSeller ? "bg-gray-200 text-gray-700" : "bg-red-500 text-white"
//       }`}
//     >
//       {message.text}
//     </p>
//   </div>
// );

// const ChatBody = ({ messages, messagesResive, ClientId }) => {
//   const reversedMessages = [...messages].reverse();

//   const reversedNotificationMessages = Array.isArray(messagesResive)
//     ? [...messagesResive].map((notification) => ({
//         key: notification.key, // Assuming each message has a unique key
//         text: notification.message,
//         isSeller: notification.ClientId !== ClientId,
//       }))
//     : [];

//   const allMessages = [...reversedNotificationMessages, ...reversedMessages];

//   return (
//     <div className="p-4 h-80 overflow-y-auto scroll-smooth">
//       {allMessages.map((message) => renderMessage(message, message.isSeller))}
//     </div>
//   );
// };

// export default ChatBody;

// ChatBody.js
//##################best fron now///

// import React from "react";

// const ChatBody = ({ messages, messagesResive }) => {
//   const reversedMessages = [...messages];
//   const clientId = localStorage.getItem("userId");

//   const reversedNotificationMessages = Array.isArray(messagesResive)
//     ? [...messagesResive].map((notification) => ({
//         text: notification.message,
//         isSeller: notification.ClientId !== clientId, // Check if the sender is not the client
//       }))
//     : [];

//   const allMessages = [...reversedNotificationMessages, ...reversedMessages];

//   return (
//     <div className="p-4 h-80 overflow-y-auto scroll-smooth">
//       {allMessages.map((message, index) => (
//         <div
//           key={index}
//           className={`mb-2 ${message.isSeller ? "" : "text-right"}`}
//         >
//           <p
//             className={`rounded-lg py-2 px-4 inline-block ${
//               message.isSeller
//                 ? "bg-gray-200 text-gray-700"
//                 : "bg-red-500 text-white"
//             }`}
//           >
//             {message.text}
//           </p>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default ChatBody;
//////////////////////////######end ######///////////////////
import React from "react";

const ChatBody = ({ messages, messagesResive }) => {
  const clientId = localStorage.getItem("userId");

  const renderMessage = (message, isSeller) => {
    if (!message.text) {
      return null; // Skip rendering messages with empty text
    }

    return (
      <div
        key={message.key} // Assuming each message has a unique key
        className={`mb-2 ${isSeller ? "..." : "text-right"}`}
      >
        <p
          className={`rounded-lg py-2 px-4 inline-block ${
            isSeller ? "bg-gray-200 text-gray-700" : "bg-red-500 text-white"
          }`}
        >
          {message.text}
        </p>
      </div>
    );
  };

  const renderMessages = () => {
    const reversedMessages = [...messages];
    const reversedNotificationMessages = Array.isArray(messagesResive)
      ? [...messagesResive].map((notification) => ({
          key: notification.key, // Assuming each message has a unique key
          text: notification.text, // Use 'text' instead of 'message'
          isSeller: notification.isSeller, // Use the provided isSeller property
        }))
      : [];

    const allMessages = [...reversedNotificationMessages, ...reversedMessages];
    const reversedAllMessages = allMessages.reverse();
    console.log("allMessages", allMessages);

    return allMessages.map((message) =>
      renderMessage(message, message.isSeller)
    );
  };

  return (
    <div className="p-4 h-80 overflow-y-auto scroll-smooth">
      {renderMessages()}
    </div>
  );
};

export default ChatBody;
