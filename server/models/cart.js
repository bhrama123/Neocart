const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },

  productId: {
    type: String,
    required: true,
  },

  name: String,

  price: Number,

  image: String,

  quantity: {
    type: Number,
    default: 1,
    min: 1,
  },
});

module.exports =
  mongoose.models.Cart ||
  mongoose.model("Cart", cartSchema);