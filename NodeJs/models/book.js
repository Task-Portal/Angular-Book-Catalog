const mongoose =require("mongoose");

const Book = mongoose.model("Book",{
    name:{type:String},
    author:{type:String},
    price:{type:Number},
});

module.exports={Book};