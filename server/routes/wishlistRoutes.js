const express = require("express");
const router = express.Router();

const Wishlist = require("../models/wishlist");


// GET WISHLIST
router.get("/:userId", async(req,res)=>{

  const items = await Wishlist.find({
    userId:req.params.userId
  });

  res.json(items);

});


// ADD
router.post("/", async(req,res)=>{

  const item = new Wishlist(req.body);

  await item.save();

  res.json(item);

});


// DELETE
router.delete("/:id", async(req,res)=>{

  await Wishlist.findByIdAndDelete(req.params.id);

  res.json("Deleted");

});

module.exports = router;