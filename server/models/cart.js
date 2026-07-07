const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({

userId:String,

productId:String,

name:String,

price:Number,

image:String

});

module.exports = mongoose.model("Cart", cartSchema);
