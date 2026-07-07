const express = require("express");
const router = express.Router();

const Order = require("../models/Order");

// =======================
// PLACE ORDER
// =======================

router.post("/", async (req, res) => {

  try {

    const {
      userId,
      items,
      total,
      customer,
      paymentMethod,
      paymentStatus,
      orderStatus,
      deliveryDate
    } = req.body;

    const order = new Order({

      userId,

      items,

      total,

      customer,

      paymentMethod: paymentMethod || "Cash On Delivery",

      paymentStatus: paymentStatus || "Pending",

      orderStatus: orderStatus || "Order Placed",

      deliveryDate,

      orderedAt: new Date()

    });

    await order.save();

    res.status(201).json({
      success: true,
      message: "Order placed successfully",
      order
    });

  } catch (err) {

    console.log(err);

    res.status(500).json({
      success: false,
      message: "Unable to place order",
      error: err.message
    });

  }

});

// =======================
// GET MY ORDERS
// =======================

router.get("/:userId", async (req, res) => {

  try {

    const orders = await Order.find({
      userId: req.params.userId
    }).sort({ orderedAt: -1 });

    res.json(orders);

  } catch (err) {

    console.log(err);

    res.status(500).json({
      success: false,
      message: "Unable to fetch orders"
    });

  }

});

module.exports = router;