// creating routes here

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");// require ejs model
// bcz in edit.ejs the post method can not be converted 
// into put thats why
const methodOverride = require("method-override")
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError.js");
const listing = require("./routes/listing.js");
const review = require("./routes/review .js");
const session = require("express-session");
const Flash = require("connect-flash");



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




// for ejs mate

app.engine('ejs',ejsMate);
// for index.ejs
app.set("view engine", "ejs");
app.set("views", path.join(__dirname,"views"));
// use to show route
app.use(express.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "/public")));


const sessionOptions ={
  secret: "mysecretcode",
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: Date.now() + 1000 * 60 * 60 *24 *7,
    maxAge: 1000 * 60 * 60 *24 *7,
    httpOnly: true,
  }
};

// root route
app.get("/" , (req , res) =>{
    res.send("hi i am root");
})




app.use(session(sessionOptions));
app.use(Flash());


app.use((req , res , next) =>{
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  next();
});



// using the express router
app.use("/listings", listing);

app.use("/listings/:id/reviews", review);






// middleware for 404 error
app.use((req, res, next) => {
  next(new ExpressError("Page Not Found", 404));
});





// middleware for server side erroe
app.use((err, req, res, next)=>{
  let{statusCode =500, message ="Something went wrong"} = err;
  // res.status(statusCode).send(message);
 res.status(statusCode).render("listings/error.ejs", {err});
 
});




app.listen(8080 , ()=>{
console.log("server is running to port");
});