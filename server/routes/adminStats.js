const router = require("express").Router();
const User = require("../models/user");
const Order = require("../models/order");
const Product = require("../models/Product");

router.get("/",async(req,res)=>{

const users = await User.countDocuments();
const orders = await Order.countDocuments();
const products = await Product.countDocuments();

const sales = await Order.aggregate([
{
$group:{
_id:null,
total:{$sum:"$total"}
}
}
]);

res.json({
users,
orders,
products,
sales:sales[0]?.total || 0
});

});

module.exports = router;