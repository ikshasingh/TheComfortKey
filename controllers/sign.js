const User = require("../models/user.js");


 module.exports.rendersign = (req, res)=>{
res.render("usersignin/signup.ejs");
};





 module.exports.info = async(req, res)=>{
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


};



module.exports.login = (req , res) =>{
res.render("usersignin/login.ejs");

};



module.exports.authenticate =  async(req,res)=>{

req.flash("success" , "Welcome Back to TheComfortKey! you are logged in");



res.redirect(res.locals.redirectUrl || "/listings");
};




module.exports.logout = (req , res,next) =>{
req.logout((err)=>{
if(err){
    return next(err);
}
req.flash("success" , "You have logged out successfully");
res.redirect("/listings");

});
};