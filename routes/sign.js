const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapasync.js");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");

router.get("/signup", (req, res)=>{
res.render("usersignin/signup.ejs");
});



router.post("/signup", async(req, res)=>{
try{
let{username , email , password} = req.body;
const newuser = new User({username , email});
const  registreduser =     await User.register(newuser , password );
console.log(registreduser);
// for automatically login functionality
req.login(registreduser , (err)=>{
if(err){
    return next(err);
}
req.flash("success" , "Welcome to TheComfortKey!");
res.redirect("/listings");

});

}catch(e){
req.flash("error" , e.message);
res.redirect("/signup");

}


});



// for login form 
router.get("/login" , (req , res) =>{
res.render("usersignin/login.ejs");

});



// for authentication we addd middle ware passport.authenticate

router.post("/login" ,saveRedirectUrl, passport.authenticate 
    ("local", {failureRedirect: '/login', failureFlash: true}),
     async(req,res)=>{

req.flash("success" , "Welcome Back to TheComfortKey! you are logged in");



res.redirect(res.locals.redirectUrl || "/listings");
})



// for logout 
router.get("/logout" , (req , res,next) =>{
req.logout((err)=>{
if(err){
    return next(err);
}
req.flash("success" , "You have logged out successfully");
res.redirect("/listings");

});
});


module.exports = router;