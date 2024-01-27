// import React from "react";

// const ChatBody = ({ messages }) => {
//   return (
//     <div className="p-4 h-80 overflow-y-auto">
//       {messages.map((message, index) => (
//         <div
//           key={index}
//           className={`mb-2 ${message.isBot ? "" : "text-right"}`}
//         >
//           <p
//             className={`rounded-lg py-2 px-4 inline-block ${
//               message.isBot
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
import React from "react";

const ChatBody = ({ messages }) => {
  // Add a triggering message to the messages prop
  const updatedMessages = [
    { text: "This is a sent message", isBot: false },
    { text: "This is a received message", isBot: true },
    ...messages,
  ];

  return (
    <div className="p-4 h-80 overflow-y-auto scroll-smooth">
      {updatedMessages.map((message, index) => (
        <div
          key={index}
          className={`mb-2 ${message.isBot ? "" : "text-right"}`}
        >
          <p
            className={`rounded-lg py-2 px-4 inline-block ${
              message.isBot
                ? "bg-gray-200 text-gray-700"
                : "bg-red-500 text-white"
            }`}
          >
            {message.text}
          </p>
        </div>
      ))}
    </div>
  );
};

export default ChatBody;
