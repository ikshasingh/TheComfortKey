const express = require("express");
const router = express.Router({mergeParams : true});
const wrapasync = require("../utils/wrapasync.js");
const Review = require("../models/review.js");
const Listing = require("../models/listing.js");
const {isLoggedIn,validateReview} = require("../middleware.js");
const reviewcontroller = require("../controllers/review.js");

// for review validation


// fpr reviews
// post route

router.post("/", isLoggedIn,validateReview,  wrapasync(reviewcontroller.createReview)); 

// delete review route 
router.delete("/:reviewId",isLoggedIn,  wrapasync(reviewcontroller.deleteReview));

module.exports = router;