const express = require("express");
const router = express.Router({mergeParams : true});
const wrapasync = require("../utils/wrapasync.js");
const Review = require("../models/review.js");
const Listing = require("../models/listing.js");
const {isLoggedIn,validateReview} = require("../middleware.js");

// for review validation


// fpr reviews
// post route

router.post("/", isLoggedIn,validateReview,  wrapasync( async(req , res)=>{
 let listing = await Listing.findById(req.params.id);
 let newreview = new Review(req.body.review);

 listing.reviews.push(newreview);

 await newreview.save();
  await listing.save();

  // console.log("review saved");
  // res.send("new review saved");
   req.flash("success", " Review Added Successfully");
res.redirect(`/listings/${listing._id}`);


}));

// delete review route 
router.delete("/:reviewId",isLoggedIn,  wrapasync(async(req, res) =>{
let {id , reviewId} = req.params;
// reviews = array   and reviewid is review id that we want to delete 
await Listing.findByIdAndUpdate(id , {$pull : {reviews : reviewId}});
 await Review.findByIdAndDelete(reviewId);
  req.flash("success", " Review deleted Successfully");
 res.redirect(`/listings/${id}`);


}));

module.exports = router;