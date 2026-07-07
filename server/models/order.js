const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({

  userId: {
    type: String,
    required: true
  },

  items: [
    {
      productId: String,
      name: String,
      price: Number,
      image: String,
      quantity: {
        type: Number,
        default: 1
      }
    }
  ],

  total: {
    type: Number,
    required: true
  },

  customer: {
    name: String,
    phone: String,
    email: String,
    address: String,
    city: String,
    state: String,
    pincode: String
  },

  paymentMethod: {
    type: String,
    default: "Cash On Delivery"
  },

  paymentStatus: {
    type: String,
    default: "Pending"
  },

  orderStatus: {
    type: String,
    default: "Order Placed"
  },

  // Delivery Date
  deliveryDate: {
    type: Date,
    default: function () {
      const date = new Date();
      date.setDate(date.getDate() + 5); // Delivery after 5 days
      return date;
    }
  },

  orderedAt: {
    type: Date,
    default: Date.now
  }

});

module.exports =
  mongoose.models.Order ||
  mongoose.model("Order", orderSchema);