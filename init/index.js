// we have dleted the previous data that is present 

const mongoose = require("mongoose");
const initdata = require("./data.js");
const Listing = require("../models/listing.js");
// to connect from database
const mongo_url = "mongodb://127.0.0.1:27017/TheComfortKey";

// to call main method
main()
.then( ()=>{
    console.log("connected to db");
})
.catch((err)=>{
console.log(err);
});

async function main(){
    await mongoose.connect(mongo_url);
}


// to dlt previousy data
const initdb = async()=>{
    await Listing.deleteMany({});
      await Listing.insertMany(initdata.data)
      console.log("data was initialized");
};

initdb();