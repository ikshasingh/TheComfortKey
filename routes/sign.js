const express = require("express");
const router = express.Router();
const User = require("../models/user.js");

const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");
const signcontroller = require("../controllers/sign.js");


router.get("/signup", signcontroller.rendersign);



router.post("/signup",signcontroller.info);



// for login form 
router.get("/login" , signcontroller.login);



// for authentication we addd middle ware passport.authenticate

router.post("/login" ,saveRedirectUrl, passport.authenticate 
    ("local", {failureRedirect: '/login', failureFlash: true}),
    signcontroller.authenticate);



// for logout 
router.get("/logout" , signcontroller.logout);


module.exports = router;