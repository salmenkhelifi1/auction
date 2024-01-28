const express = require("express");
const router = express.Router();
const chatController = require("../controllers/chatControllers");

// Add routes for chat
router.post("/send", chatController.sendMessage);
router.get("/room/:senderId/:receiverId", chatController.getMessages);
router.get("/all", chatController.getAllMessages);

module.exports = router;
