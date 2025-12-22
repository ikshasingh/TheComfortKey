const Listing = require("../models/listing.js");
const mongoose = require("mongoose");

module.exports.index = async(req , res) =>{
   const allListings = await Listing.find({});
   res.render("listings/index.ejs", {allListings});
};



module.exports.new = (req, res) => {
  
  
  res.render("listings/new.ejs");
};



module.exports.booknow = async (req, res) => {
  const { id } = req.params;
  const listing = await Listing.findById(id);
  res.render("listings/booknow.ejs", { listing });
};


module.exports.booked = async (req, res) => {
 
   const { id } = req.params;
  const listing = await Listing.findById(id);
  const bookingData = req.body.booking;
  console.log("Booking Received:", bookingData); 
  res.render("listings/booked.ejs", { listing, bookingData });
};



module.exports.show = async(req, res) =>{
    let {id} = req.params;
       if (!mongoose.isValidObjectId(id)) {
        req.flash("error", "Invalid listing URL.");
        return res.redirect("/listings");
    }                                                              
    const listing = await Listing.findById(id)
    .populate({
      path: "reviews",
       populate:{
        path:"author"},})
    .populate("owner");
    if(!listing){
      req.flash("error", " Listing you are looking for does not exist");
     return  res.redirect("/listings");
    }console.log(listing);
    res.render("listings/show.ejs", {listing,
    curruser: req.user,})
};



module.exports.create = async (req, res) => {
  if (!req.file) {
    throw new ExpressError("Image upload failed", 400);
  }

  const newListing = new Listing(req.body.listing);

  // 🔥 THIS WAS MISSING
  newListing.image = {
    url: req.file.path,
    filename: req.file.filename,
  };

  newListing.owner = req.user._id;

  await newListing.save();

  req.flash("success", "New Listing Created Successfully");
  res.redirect("/listings");
};



module.exports.edit = async(req , res) =>{
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
};



module.exports.update = async(req , res) =>{
  // if user send invalid data
  if(!req.body.listing){
    throw new ExpressError(400 , "Invalid Listing Data");
  }
     let {id} = req.params;
     await Listing.findByIdAndUpdate(id,{...req.body.listing});

      req.flash("success", " Updated Successfully");
   res.redirect(`/listings/${id}`);

};


module.exports.deleteListing = async(req, res) =>{
     let {id} = req.params;
     let deleteListing = await Listing.findByIdAndDelete(id);
     console.log(deleteListing);
      req.flash("success", "Deleted Successfully");
     res.redirect("/listings");
};