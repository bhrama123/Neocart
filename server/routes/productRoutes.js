const router = require("express").Router();
const Product = require("../models/Product");


// GET ALL PRODUCTS
router.get("/", async (req,res)=>{

const products = await Product.find();

res.json(products);

});


// GET SINGLE PRODUCT
router.get("/:id", async (req,res)=>{

const product = await Product.findById(req.params.id);

res.json(product);

});


// RELATED PRODUCTS
router.get("/related/:category", async (req,res)=>{

const products = await Product.find({
category:req.params.category
}).limit(4);

res.json(products);

});


module.exports = router;