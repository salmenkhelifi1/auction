const express = require("express");
const router = express.Router();
const bidController = require("../controllers/bidControllers");

module.exports = (app) => {
  router.get("/bidNotification/:id", bidController.getBidNotification);
  router.post("/placeBid", bidController.placeBid);
  router.get("/fetch-items/:id", bidController.getBids);
  router.get("/fetch-items/BidsByItems/:id", bidController.getBidsByItems);

  return router;
};
