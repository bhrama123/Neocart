const mongoose = require("mongoose");

module.exports = mongoose.model("wishlist", {

  userId: String,

  productId: String,

  name: String,

  price: Number,

  image: String

});