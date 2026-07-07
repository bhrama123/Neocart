const express = require("express");
const router = express.Router();
const Cart = require("../models/Cart");


// GET CART

router.get("/:userId", async (req, res) => {

  const cart = await Cart.find({
    userId: req.params.userId
  });

  res.json(cart);

});


// ADD CART

router.post("/", async (req, res) => {

  const cart = new Cart(req.body);

  await cart.save();

  res.json(cart);

});


// DELETE ITEM

router.delete("/:id", async (req, res) => {

  await Cart.findByIdAndDelete(req.params.id);

  res.json("Deleted");

});

module.exports = router;