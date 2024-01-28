const express = require("express");
const router = express.Router();
const chatController = require("../controllers/chatController");

// Add routes for chat
router.post("/send", chatController.sendMessage);
router.get("/:senderId/:receiverId", chatController.getMessages);

module.exports = router;
