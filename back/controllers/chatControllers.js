const Chat = require("../models/chat");

const chatController = {
  sendMessage: async (req, res) => {
    const { senderId, receiverId, message } = req.body;

    try {
      const chat = await Chat.create({
        senderId,
        receiverId,
        message,
      });

      // You can broadcast the new message to the respective users or emit a socket event

      res.status(200).json({ message: "Message sent successfully.", chat });
    } catch (error) {
      console.error("Error in sendMessage:", error);
      res.status(500).json({
        message: `Internal server error: ${error.message}`,
        error: error.stack,
      });
    }
  },

  getMessages: async (req, res) => {
    const { senderId, receiverId } = req.params;

    try {
      const messages = await Chat.find({
        $or: [
          { senderId, receiverId },
          { senderId: receiverId, receiverId: senderId },
        ],
      }).sort({ timestamp: "asc" });

      res.status(200).json(messages);
    } catch (error) {
      console.error("Error in getMessages:", error);
      res.status(500).json({
        message: `Internal server error: ${error.message}`,
        error: error.stack,
      });
    }
  },
};

module.exports = chatController;
