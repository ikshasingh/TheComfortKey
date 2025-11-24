const express = require("express");
const router = express.Router();
const wrapasync = require("../utils/wrapasync.js");
const ExpressError = require("../utils/ExpressError.js");

const Listing = require("../models/listing.js");
const{isLoggedIn , validateListing} = require("../middleware.js");
const listingcontroller = require("../controllers/listing.js");
const multer = require('multer')
const upload = multer({dest:'uploads/'})





// reformating router part
 router.route("/")
//  we dont need to define path gaina ad again


// for redirecting us to index.ejs
// index route index.ejs where its showing title of every data
.get( wrapasync(listingcontroller.index))


// create route
// .post( isLoggedIn, validateListing,
  
//    wrapasync(listingcontroller.create));

// .post(upload.single('listing[image]'),(req,res) =>{
//    res.send(req.file);
// });



router.route("/")
  .get(wrapasync(listingcontroller.index))

  .post(
    isLoggedIn,
    upload.single('listing[image]'),
    validateListing,
    wrapasync(listingcontroller.create)
  );


   
// new route
// clicking button will redirect u to add more items
// New route (must come before /listings/:id) bcz it will then 
// treat /new as /id
router.get("/new", isLoggedIn,listingcontroller.new);







router
.route("/:id")
// for show route when we click to anylink to show the data inside it
.get( wrapasync(listingcontroller.show))

// update route
.put(   isLoggedIn, wrapasync(listingcontroller.update))

// delete route
.delete(  isLoggedIn, wrapasync( listingcontroller.deleteListing));








//  booking route
// give the wrapasync to all the async functions
router.get("/:id/booknow",  isLoggedIn, wrapasync(listingcontroller.booknow));





// booked route
router.post("/:id/booked", wrapasync(listingcontroller.booked));
  










// edit route
router.get("/:id/edit", isLoggedIn, wrapasync(listingcontroller.edit));








module.exports = router;
