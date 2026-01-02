// routes/booking.js
const express = require("express");
const router = express.Router();
const { isLoggedIn } = require("../middleware");
const bookingController = require("../controllers/booking");

router.get(
  "/",
  isLoggedIn,
  bookingController.index
);

module.exports = router;
