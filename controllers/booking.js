// controllers/booking.js
const Booking = require("../models/booking");

module.exports.index = async (req, res) => {
  const bookings = await Booking.find({ user: req.user._id })
    .populate("listing");

  res.render("bookings/index", { bookings });
};
