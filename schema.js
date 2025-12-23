// schema.js
const Joi = require("joi");
const { rawListeners } = require("./models/review");

module.exports.listingSchema = Joi.object({
  listing: Joi.object({
    title: Joi.string().required(),
    price: Joi.number().required().min(0),
    description: Joi.string().required(),
    location: Joi.string().required(),
    country: Joi.string().required(),
    
     category: Joi.string()
      .valid(
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
    "work"

      )
      .required(),
  }).required(),
});


// for review validation
module.exports.reviewSchema = Joi.object({
  review: Joi.object({
    rating: Joi.number().required().min(1).max(5),
    comment: Joi.string().required(),
   }).required()


});
