const Review = require("../models/review.js");
const Listing = require("../models/listing.js");


// post review route
module.exports.createReview = async(req , res)=>{
 let listing = await Listing.findById(req.params.id);
 let newreview = new Review(req.body.review);

 newreview.author = req.user._id;
 console.log(newreview);
 listing.reviews.push(newreview);

 await newreview.save();
  await listing.save();

  // console.log("review saved");
  // res.send("new review saved");
   req.flash("success", " Review Added Successfully");
res.redirect(`/listings/${listing._id}`);


};




module.exports.deleteReview = async(req, res) =>{
let {id , reviewId} = req.params;
// reviews = array   and reviewid is review id that we want to delete 
await Listing.findByIdAndUpdate(id , {$pull : {reviews : reviewId}});
 await Review.findByIdAndDelete(reviewId);
  req.flash("success", " Review deleted Successfully");
 res.redirect(`/listings/${id}`);


};