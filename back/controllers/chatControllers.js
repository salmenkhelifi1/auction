const Chat = require("../models/chat");
const Items = require("../models/items");
const Seller = require("../models/sellers");
const Client = require("../models/clients");
const { Op } = require("sequelize");

const chatController = {
  sendMessage: async (req, res) => {
    const { ClientId, sellerId, message } = req.body;

    try {
      const chat = await Chat.create({
        ClientId,
        sellerId,
        message,
      });

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
    const { ClientId, sellerId } = req.params;

    try {
      const messages = await Chat.findAll({
        where: {
          [Op.or]: [
            { ClientId: ClientId, sellerId: sellerId },
            { ClientId: sellerId, sellerId: ClientId },
          ],
        },
        order: [["timestamp", "ASC"]],
      });

      res.status(200).json(messages);
    } catch (error) {
      console.error("Error in getMessages:", error);
      res.status(500).json({
        message: `Internal server error: ${error.message}`,
        error: error.stack,
      });
    }
  },

  getAllMessages: async (req, res) => {
    try {
      const messages = await Chat.findAll({
        order: [["timestamp", "ASC"]],
      });

      res.status(200).json(messages);
    } catch (error) {
      console.error("Error in getAllMessages:", error);
      res.status(500).json({
        message: `Internal server error: ${error.message}`,
        error: error.stack,
      });
    }
  },
};
module.exports = chatController;
