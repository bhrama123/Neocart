const express = require("express");
const router = express.Router();
const User = require("../models/User");
const jwt = require("jsonwebtoken");


// REGISTER

router.post("/register", async(req,res)=>{

const user = new User(req.body);

await user.save();

res.json(user);

});


// LOGIN

router.post("/login", async(req,res)=>{

const user = await User.findOne({

email:req.body.email,

password:req.body.password

});

if(!user)

return res.status(400).json("User not found");

const token = jwt.sign(

{id:user._id},

process.env.JWT_SECRET

);

res.json({token,user});

});

module.exports = router;
