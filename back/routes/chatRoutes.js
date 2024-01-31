const express = require("express");
const router = express.Router();
const chatController = require("../controllers/chatControllers");

// Get messages for a specific seller
router.get("/seller/:sellerId", chatController.getSellerMessages);

// Get messages for a specific client
router.get("/client/:ClientId", chatController.getClientMessages);

// Send a message from a seller to a client
router.post("/send-seller-message", chatController.sendSellerMessage);

// Send a message from a client to a seller
router.post("/send-client-message", chatController.sendClientMessage);

router.get("/all-clients", chatController.getAllClientsFromChat);

module.exports = router;
