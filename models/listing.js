// schema or basically the whole structure of tables row and columns

const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review.js");
const listingSchema = new Schema({
    title: {
       type: String,
       required : true,
    },
    
    description : String,
  


    image: {
      url: String,
    filename: String,
    
  },
    price : Number,
    location : String,
    country : String,
    
    category: {
  type: String,
  enum: [
    
    "beach",
    "city",
    "nature",
    "camping",
    "luxury",
    "popular",
    "heritage",
    "farm",
     "budget",
    "familty",
    "work",
   
  ],
  required: true,
},


    reviews :[{
       type : Schema.Types.ObjectId,
       ref : "Review",
    },],

    owner:{
      type: Schema.Types.ObjectId,
      ref: "User",
    }
});

listingSchema.post("findOneAndDelete", async (listing) =>{
  if(listing){
// Review is what we reqired and listing is model name and reviews is array
    await Review.deleteMany({_id:  {$in : listing.reviews}});
  }
  
});


// creates the collection inside mongodb as table in sql
const Listing = mongoose.model("Listing" , listingSchema);
module.exports = Listing;