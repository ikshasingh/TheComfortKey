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
    filename: String,
    url: {
      type: String,
      default:
        "https://unsplash.com/photos/indoor-atrium-with-hanging-plants-and-skylights-qgG7Muwa3vA",
      set: (v) =>
        v === ""
          ? "https://unsplash.com/photos/indoor-atrium-with-hanging-plants-and-skylights-qgG7Muwa3vA"
          : v,
    },
  },
    price : Number,
    location : String,
    country : String,
    reviews :[{
       type : Schema.Types.ObjectId,
       ref : "Review",
    },],
});

listingSchema.post("findOneAndDelete", async (listing) =>{
  if(listing){
    await Review.deleteMany({_id:  {$in : listing.reviews}});
  }
  
});


// creates the collection inside mongodb as table in sql
const Listing = mongoose.model("Listing" , listingSchema);
module.exports = Listing;