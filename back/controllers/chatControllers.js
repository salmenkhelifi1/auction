// const Chat = require("../models/chat");
// const Items = require("../models/items");
// const Seller = require("../models/sellers");
// const Client = require("../models/clients");
// const { Op } = require("sequelize");

// // Get messages for a specific seller
// const getSellerMessages = async (req, res) => {
//   try {
//     const sellerId = req.params.sellerId;
//     const messages = await Chat.findAll({
//       where: { SellerId: sellerId },
//       include: [Seller, Client],
//     });
//     res.json(messages);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };

// // Get messages for a specific client
// const getClientMessages = async (req, res) => {
//   try {
//     const ClientId = req.params.ClientId; // Updated variable name
//     const messages = await Chat.findAll({
//       where: { ClientId: ClientId },
//       include: [Seller, Client],
//     });
//     res.json(messages);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };

// // Send a message from a seller to a client
// const sendSellerMessage = async (req, res) => {
//   try {
//     const { sellerId, ClientId, sellerMessage } = req.body;
//     console.log(
//       "################################Received Request - ClientId:",
//       ClientId
//     );

//     const newMessage = await Chat.create({
//       sellerMessage: sellerMessage,
//       sellerId: sellerId,
//       ClientId: ClientId,
//     });
//     res.json(newMessage);
//   } catch (error) {
//     console.error("Error in sendSellerMessage:", error);

//     // Log specific Sequelize validation errors
//     if (error.name === "SequelizeValidationError") {
//       console.error("Validation Errors:", error.errors);
//     }

//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };

// // Send a message from a client to a seller
// const sendClientMessage = async (req, res) => {
//   try {
//     const { sellerId, ClientId, message } = req.body;

//     console.log("Received Request - sendClientMessage:", {
//       sellerId,
//       ClientId,
//       message,
//     });

//     const newMessage = await Chat.create({
//       ClientMessage: message,
//       sellerId: sellerId,
//       ClientId: ClientId,
//     });

//     res.json(newMessage);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };

// module.exports = {
//   getSellerMessages,
//   getClientMessages,
//   sendSellerMessage,
//   sendClientMessage,
// };

const Chat = require("../models/chat");
const Seller = require("../models/sellers");
const Client = require("../models/clients");
const { Op } = require("sequelize");

// const getSellerMessages = async (req, res) => {
//   try {
//     const sellerId = req.params.sellerId;
//     const messages = await Chat.findAll({
//       where: { SellerId: sellerId },
//       include: [Seller, Client],
//     });

//     const formattedMessages = messages.map((message) => ({
//       text: message.sellerMessage, // Adjust property based on your model
//       isSeller: false, // Assuming seller messages are not bot messages
//     }));

//     res.json(formattedMessages);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };

// const getClientMessages = async (req, res) => {
//   try {
//     const clientId = req.params.ClientId;
//     const messages = await Chat.findAll({
//       where: { ClientId: clientId },
//       include: [Seller, Client],
//     });

//     const formattedMessages = messages.map((message) => ({
//       text: message.sellerMessage, // Adjust property based on your model
//       isSeller: false, // Assuming seller messages are not bot messages
//     }));

//     res.json(formattedMessages);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };

// Send a message from a seller to a client
const sendSellerMessage = async (req, res) => {
  try {
    const { sellerId, ClientId, sellerMessage } = req.body;
    console.log(
      "################################Received Request - ClientId:",
      ClientId
    );

    const newMessage = await Chat.create({
      sellerMessage: sellerMessage,
      sellerId: sellerId,
      ClientId: ClientId,
    });
    res.json(newMessage);
  } catch (error) {
    console.error("Error in sendSellerMessage:", error);

    // Log specific Sequelize validation errors
    if (error.name === "SequelizeValidationError") {
      console.error("Validation Errors:", error.errors);
    }

    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Send a message from a client to a seller
const sendClientMessage = async (req, res) => {
  try {
    const { sellerId, ClientId, message } = req.body;

    console.log("Received Request - sendClientMessage:", {
      sellerId,
      ClientId,
      message,
    });

    const newMessage = await Chat.create({
      ClientMessage: message,
      sellerId: sellerId,
      ClientId: ClientId,
    });

    res.json(newMessage);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const getSellerMessages = async (req, res) => {
  try {
    const sellerId = req.params.sellerId;
    const messages = await Chat.findAll({
      where: { SellerId: sellerId },
      include: [Seller, Client],
      order: [["createdAt", "DESC"]],
    });

    const formattedMessages = messages.map((message) => ({
      key: message.id,
      text: message.sellerMessage, // Adjust property based on your model
      isSeller: true, // Assuming seller messages are indicated as such
      timestamp: message.createdAt, // Assuming there is a timestamp property
    }));

    res.json(formattedMessages);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getClientMessages = async (req, res) => {
  try {
    const clientId = req.params.ClientId;
    const messages = await Chat.findAll({
      where: { ClientId: clientId },
      include: [Seller, Client],
      order: [["createdAt", "DESC"]],
    });

    const formattedMessages = messages.map((message) => ({
      key: message.id,
      text: message.ClientMessage, // Adjust property based on your model
      isSeller: false, // Assuming client messages are not indicated as seller messages
      timestamp: message.createdAt, // Assuming there is a timestamp property
    }));

    res.json(formattedMessages);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  getSellerMessages,
  getClientMessages,
  sendSellerMessage,
  sendClientMessage,
};
