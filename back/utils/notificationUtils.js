function sendMessageToRoom(io, roomId, message) {
  const roomSocket = io.in(roomId);

  if (roomSocket) {
    console.log("Sending message to room ", roomId);
    roomSocket.emit("notification", message);
  } else {
    console.log(roomId, " does not exist");
  }
}

module.exports = {
  sendMessageToRoom: sendMessageToRoom,
};
