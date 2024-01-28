function sendPrivateMessage(io, userId, message) {
  const userSocket = userSocketMap.get(userId);

  if (userSocket) {
    console.log("Sending private message to user ", userId);
    userSocket.emit("privateMessage", message);
  } else {
    console.log(userId, " does not exist or is not connected");
  }
}

module.exports = {
  sendPrivateMessage: sendPrivateMessage,
};
