// // import { Avatar } from "antd";
// // import React from "react";

// // const MessageBubble = ({ message }) => {
// //   const isSender = message.sender === "Lina Dry";

// //   return (
// //     <div
// //       className={`mb-4 flex items-center ${isSender ? "flex-row-reverse" : ""}`}
// //     >
// //       <Avatar
// //         className="flex-shrink-0"
// //         src="https://docs.material-tailwind.com/img/face-2.jpg"
// //         alt="avatar"
// //       />
// //       <div
// //         style={{
// //           maxWidth: "50%",
// //           marginLeft: isSender ? "0" : "10px",
// //           marginRight: isSender ? "10px" : "0",
// //         }}
// //         className={`inline-block ${
// //           isSender
// //             ? "bg-red-500 text-white rounded-lg py-2 px-4 inline-block ml-2"
// //             : "bg-white border border-gray-300 rounded-lg py-2 px-4 inline-block mr-2"
// //         } p-2 rounded max-w-1/2`}
// //       >
// //         {message.text}
// //       </div>
// //     </div>
// //   );
// // };

// // export default MessageBubble;
// import React from "react";

// const MessageBubble = ({ messagesResive }) => {
//   const clientId = localStorage.getItem("userId");

//   const renderMessage = (message) => {
//     if (!message.text) {
//       return null; // Skip rendering messages with empty text or null
//     }

//     const isSender = !message.isSeller;

//     return (
//       <div
//         className={`mb-4 flex items-center ${
//           isSender ? "flex-row-reverse" : ""
//         }`}
//         key={message.key || new Date().toISOString()}
//       >
//         <div
//           style={{
//             maxWidth: "50%",
//             marginLeft: isSender ? "0" : "10px",
//             marginRight: isSender ? "10px" : "0",
//           }}
//           className={`inline-block ${
//             isSender
//               ? "bg-red-500 text-white rounded-lg py-2 px-4 inline-block ml-2"
//               : "bg-white border border-gray-300 rounded-lg py-2 px-4 inline-block mr-2"
//           } p-2 rounded max-w-1/2`}
//         >
//           {message.text}
//         </div>
//       </div>
//     );
//   };

//   const renderMessages = () => {
//     const reversedNotificationMessages = Array.isArray(messagesResive)
//       ? [...messagesResive].map((notification) => ({
//           key: notification.key || new Date().toISOString(),
//           text: notification.text,
//           isSeller: notification.isSeller,
//           timestamp: new Date(notification.timestamp).getTime(),
//         }))
//       : [];

//     // Sort messages by timestamp in ascending order
//     const sortedMessages = reversedNotificationMessages.sort((a, b) => {
//       if (a.timestamp === b.timestamp) {
//         // If timestamps are equal, use the order in which they were received
//         return new Date(a.key).getTime() - new Date(b.key).getTime();
//       }
//       return a.timestamp - b.timestamp;
//     });

//     console.log("sortedMessages", sortedMessages);

//     return sortedMessages.map((message) => renderMessage(message));
//   };

//   return (
//     <div className="p-4 h-80 overflow-y-auto scroll-smooth">
//       {renderMessages()}
//     </div>
//   );
// };
// export default MessageBubble;

import React from "react";

const MessageBubble = ({ messages, messagesResive }) => {
  const clientId = localStorage.getItem("userId");
  console.log("messagesmessages", messages);

  const renderMessage = (message, isSeller) => {
    if (!message.text) {
      return null; // Skip rendering messages with empty text or null
    }

    return (
      <div
        key={message.key || new Date().toISOString()}
        className={`mb-2 ${!isSeller ? "text-left" : "text-right"}`}
      >
        <p
          className={`rounded-lg py-2 px-4 inline-block ${
            isSeller ? "bg-red-500 text-white" : "bg-gray-200 text-gray-700"
          }`}
        >
          {message.text}
        </p>
      </div>
    );
  };

  const renderMessages = () => {
    const reversedMessages = Array.isArray(messages)
      ? [...messages].reverse()
      : [];
    const reversedNotificationMessages = Array.isArray(messagesResive)
      ? [...messagesResive].map((notification) => ({
          key: notification.key || new Date().toISOString(),
          text: notification.text,
          isSeller: notification.isSeller,
          timestamp: new Date(notification.timestamp).getTime(),
        }))
      : [];

    const allMessages = [...reversedNotificationMessages, ...reversedMessages];
    const filteredMessages = allMessages.filter(
      (message) => message.text !== null
    );

    // Sort messages by timestamp in ascending order
    const sortedMessages = filteredMessages.sort((a, b) => {
      if (a.timestamp === b.timestamp) {
        // If timestamps are equal, use the order in which they were received
        return new Date(a.key).getTime() - new Date(b.key).getTime();
      }
      return a.timestamp - b.timestamp;
    });

    console.log("sortedMessages", sortedMessages);

    return sortedMessages.map((message) =>
      renderMessage(message, message.isSeller)
    );
  };

  return (
    <div className="p-4  h-[70vh] overflow-y-auto scroll-smooth">
      {renderMessages()}
    </div>
  );
};

export default MessageBubble;
