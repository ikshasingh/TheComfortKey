const express = require("express");
const router = express.Router();
const wrapasync = require("../utils/wrapasync.js");
const ExpressError = require("../utils/ExpressError.js");
const { listingSchema ,reviewSchema} = require("../schema.js");
const Listing = require("../models/listing.js");



const validateListing =(req , res , next)=>{
  let {error} = listingSchema.validate(req.body);
  if(error){
    let msg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400 , msg);

}else{
    next();
}
};


// for redirecting us to index.ejs
// index route index.ejs where its showing title of every data
router.get("/" , wrapasync(async(req , res) =>{
   const allListings = await Listing.find({});
   res.render("listings/index.ejs", {allListings});
}));





// new route
// clicking button will redirect u to add more items
// New route (must come before /listings/:id)
router.get("/new", (req, res) => {
  res.render("listings/new.ejs");
});

//  booking route
// give the wrapasync to all the async functions
router.get("/:id/booknow", wrapasync(async (req, res) => {
  const { id } = req.params;
  const listing = await Listing.findById(id);
  res.render("listings/booknow.ejs", { listing });
}));


// booked route
router.post("/:id/booked", wrapasync(async (req, res) => {
 
   const { id } = req.params;
  const listing = await Listing.findById(id);
  const bookingData = req.body.booking;
  console.log("Booking Received:", bookingData); 
  res.render("listings/booked.ejs", { listing, bookingData });
}));
  

// for show route when we click to anylink to show the data inside it
router.get("/:id" , wrapasync(async(req, res) =>{
    let {id} = req.params;
    const listing = await Listing.findById(id).populate("reviews");
    res.render("listings/show.ejs", {listing})
}));


// create route

router.post("/", validateListing, wrapasync(async (req, res, next) => {
  const { error } = listingSchema.validate(req.body);

  if (error) {
    throw new ExpressError(400, error.details[0].message);
  }

  const newListing = new Listing(req.body.listing);
  await newListing.save();
  res.redirect("/listings");
}));




// edit route
router.get("/:id/edit", wrapasync(async(req , res) =>{
      let {id} = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/edit.ejs", {listing});
}));


// update route
router.put("/:id", wrapasync(async(req , res) =>{
  // if user send invalid data
  if(!req.body.listing){
    throw new ExpressError(400 , "Invalid Listing Data");
  }
     let {id} = req.params;
     await Listing.findByIdAndUpdate(id,{...req.body.listing});
   res.redirect(`/listings/${id}`);

}));


// delete route
router.delete("/:id",wrapasync( async(req, res) =>{
     let {id} = req.params;
     let deleteListing = await Listing.findByIdAndDelete(id);
     console.log(deleteListing);
     res.redirect("/listings");
}));





module.exports = router;
