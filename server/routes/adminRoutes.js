const router = require("express").Router();
const User = require("../models/user");
const Order = require("../models/order");
const Product = require("../models/ProductModel");

router.get("/analytics", async (req,res)=>{

const users = await User.countDocuments();
const products = await Product.countDocuments();
const orders = await Order.countDocuments();

const revenueData = await Order.find();

const revenue = revenueData.reduce(
(sum,o)=>sum + o.total,
0
);

res.json({
users,
products,
orders,
revenue
});

});

module.exports = router;