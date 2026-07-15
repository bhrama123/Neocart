const express = require("express");
const router = express.Router();

const Cart = require("../models/cart");

// GET CART
router.get("/:userId", async (req, res) => {
  try {
    const cart = await Cart.find({
      userId: req.params.userId,
    });

    res.json(cart);
  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: "Unable to fetch cart",
    });
  }
});

// ADD TO CART
router.post("/", async (req, res) => {
  try {
    const {
      userId,
      productId,
      name,
      price,
      image,
    } = req.body;

    const existingItem = await Cart.findOne({
      userId,
      productId,
    });

    if (existingItem) {
      existingItem.quantity += 1;

      await existingItem.save();

      return res.json(existingItem);
    }

    const cart = new Cart({
      userId,
      productId,
      name,
      price,
      image,
      quantity: 1,
    });

    await cart.save();

    res.json(cart);
  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: "Unable to add cart",
    });
  }
});

// UPDATE QUANTITY
router.put("/:id", async (req, res) => {
  try {
    const quantity = Number(req.body.quantity);

    if (quantity < 1) {
      return res.status(400).json({
        message: "Quantity must be at least 1",
      });
    }

    const cart = await Cart.findByIdAndUpdate(
      req.params.id,
      {
        quantity: quantity,
      },
      {
        new: true,
      }
    );

    if (!cart) {
      return res.status(404).json({
        message: "Cart item not found",
      });
    }

    res.json(cart);
  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: "Unable to update quantity",
    });
  }
});

// DELETE ITEM
router.delete("/:id", async (req, res) => {
  try {
    await Cart.findByIdAndDelete(req.params.id);

    res.json({
      message: "Deleted",
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: "Unable to delete item",
    });
  }
});

module.exports = router;