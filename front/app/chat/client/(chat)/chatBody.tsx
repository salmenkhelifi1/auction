import React from "react";

const ChatBody = ({ messages, messagesResive }) => {
  const clientId = localStorage.getItem("userId");

  const renderMessage = (message, isSeller) => {
    if (!message.text) {
      return null; // Skip rendering messages with empty text or null
    }

    return (
      <div
        key={message.key || new Date().toISOString()}
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
    <div className="p-4 h-80 overflow-y-auto scroll-smooth">
      {renderMessages()}
    </div>
  );
};

export default ChatBody;
