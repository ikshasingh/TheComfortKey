// creating routes here

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");
// require ejs model
const path = require("path");
// bcz in edit.ejs the post method can not be converted 
// into put thats why
const methodOverride = require("method-override")

const ejsMate = require("ejs-mate");




// to connect from database
const mongo_url = "mongodb://127.0.0.1:27017/TheComfortKey";

// to call main method
main().then( ()=>{
    console.log("connected to db");
}).catch((err)=>{
console.log(err);
});

async function main(){
    await mongoose.connect(mongo_url);
}



app.engine('ejs',ejsMate);
// for index.ejs
app.set("view engine", "ejs");
app.set("views", path.join(__dirname,"views"));
// use to show route
app.use(express.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "/public")));




app.get("/" , (req , res) =>{
    res.send("hi i am root");
})





// for redirecting us to index.ejs
// index route index.ejs where its showing title of every data
app.get("/listings" , async(req , res) =>{
   const allListings = await Listing.find({});
   res.render("listings/index.ejs", {allListings});
});





// new route
// clicking button will redirect u to add more items
// New route (must come before /listings/:id)
app.get("/listings/new", (req, res) => {
  res.render("listings/new.ejs");
});

//  booking route
app.get("/listings/:id/booknow", async (req, res) => {
  const { id } = req.params;
  const listing = await Listing.findById(id);
  res.render("listings/booknow.ejs", { listing });
});


// booked route
app.post("/listings/:id/booked", async (req, res) => {
 
   const { id } = req.params;
  const listing = await Listing.findById(id);
  const bookingData = req.body.booking;
  console.log("Booking Received:", bookingData); 
  res.render("listings/booked.ejs", { listing, bookingData });
});
  

// for show route when we click to anylink to show the data inside it
app.get("/listings/:id" , async(req, res) =>{
    let {id} = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/show.ejs", {listing})
})


// create route

app.post("/listings", async(req , res) =>{
    const newListing = new Listing(req.body.listing);
  await newListing.save();

    res.redirect("/listings");
});



// edit route
app.get("/listings/:id/edit", async(req , res) =>{
      let {id} = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/edit.ejs", {listing});
})


// update route
app.put("/listings/:id", async(req , res) =>{
     let {id} = req.params;
     await Listing.findByIdAndUpdate(id,{...req.body.listing});
   res.redirect(`/listings/${id}`);

});


// delete route
app.delete("/listings/:id", async(req, res) =>{
     let {id} = req.params;
     let deleteListing = await Listing.findByIdAndDelete(id);
     console.log(deleteListing);
     res.redirect("/listings");
});








// creating sample data 
// app.get("/testListing", async(req , res) =>{
//     let sampleListing = new Listing({
//         title : "my new villa",
//         discription : "by the beach",
//         price : 1200,
//         location: "Calangute , goa",
//         country : "India",
//     });

//     // to save into db
//     await sampleListing.save();
//     console.log("sample was saved");
//     res.send("successful testing");
// });



app.listen(8080 , ()=>{
console.log("server is running to port");
});