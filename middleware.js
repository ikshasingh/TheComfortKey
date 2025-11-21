const ExpressError = require("./utils/ExpressError.js");
const { listingSchema , reviewSchema} = require("./schema.js");

module.exports.isLoggedIn = (req , res , next) =>{
    console.log("REQ.USER..." , req.user);
    if(!req.isAuthenticated()){
        // req.url to store the url which user want to visit
       // if the blocked request was POST /reviews, redirect to listing page instead
if (req.method === "POST" && req.originalUrl.includes("reviews")) {
    req.session.redirectUrl = req.originalUrl.split("/reviews")[0]; 
} else {
    req.session.redirectUrl = req.originalUrl;
}

        req.flash("error" , "You must be loggedin in first!");
         return res.redirect("/login");
    }
    next();
};


module.exports.saveRedirectUrl = (req , res , next) =>{
    if(req.session.redirectUrl){
res.locals.redirectUrl = req.session.redirectUrl;
    }
    next();
};


module.exports. validateListing =(req , res , next)=>{
  let {error} = listingSchema.validate(req.body);
  if(error){
    let msg = error.details.map((el) => el.message).join(",");
   throw new ExpressError(msg, 400);


}else{
    next();
}
};




//  function review ka data validate karta hai using Joi.
module.exports.validateReview =(req , res , next)=>{
  let {error} = reviewSchema.validate(req.body);
  if(error){
    let msg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400 , msg);

}else{
    next();
}
};