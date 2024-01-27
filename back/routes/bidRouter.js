const express = require("express");
const router = express.Router();
const bidController = require("../controllers/bidControllers");

router.post("/placeBid", bidController.placeBid);
router.get("/fetch-items/:id", bidController.getBids);
router.get("/fetch-items/BidsByItems/:id", bidController.getBidsByItems);

module.exports = router;
