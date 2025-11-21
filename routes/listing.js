const express = require("express");
const router = express.Router();
const wrapasync = require("../utils/wrapasync.js");
const ExpressError = require("../utils/ExpressError.js");

const Listing = require("../models/listing.js");
const{isLoggedIn , validateListing} = require("../middleware.js");
const listingcontroller = require("../controllers/listing.js");







// for redirecting us to index.ejs
// index route index.ejs where its showing title of every data
router.get("/" , wrapasync(listingcontroller.index));





// new route
// clicking button will redirect u to add more items
// New route (must come before /listings/:id)
router.get("/new", isLoggedIn,listingcontroller.new);

//  booking route
// give the wrapasync to all the async functions
router.get("/:id/booknow",  isLoggedIn, wrapasync(listingcontroller.booknow));





// booked route
router.post("/:id/booked", wrapasync(listingcontroller.booked));
  

// for show route when we click to anylink to show the data inside it
const mongoose = require("mongoose");
router.get("/:id" , wrapasync(listingcontroller.show));


// create route

router.post("/", validateListing,
   isLoggedIn, 
   wrapasync(async (req, res, next) => {
const newListing = new Listing(req.body.listing);
newListing.owner = req.user._id;
  await newListing.save();
  req.flash("success", "New Listing Created Successfully");
  res.redirect("/listings");

}));




// edit route
router.get("/:id/edit", isLoggedIn, wrapasync(async(req , res) =>{
      let {id} = req.params;
         if (!mongoose.isValidObjectId(id)) {
        req.flash("error", "Invalid listing URL.");
        return res.redirect("/listings");
    }
    const listing = await Listing.findById(id);
       if(!listing){
      req.flash("error", " Listing you are looking for does not exist");
     return  res.redirect("/listings");
    }
    res.render("listings/edit.ejs", {listing});
     req.flash("success", " Updated Successfully");
}));


// update route
router.put("/:id",   isLoggedIn, wrapasync(async(req , res) =>{
  // if user send invalid data
  if(!req.body.listing){
    throw new ExpressError(400 , "Invalid Listing Data");
  }
     let {id} = req.params;
     await Listing.findByIdAndUpdate(id,{...req.body.listing});

      req.flash("success", " Updated Successfully");
   res.redirect(`/listings/${id}`);

}));


// delete route
router.delete("/:id",  isLoggedIn, wrapasync( async(req, res) =>{
     let {id} = req.params;
     let deleteListing = await Listing.findByIdAndDelete(id);
     console.log(deleteListing);
      req.flash("success", "Deleted Successfully");
     res.redirect("/listings");
}));





module.exports = router;
