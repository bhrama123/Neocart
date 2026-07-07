const router = require("express").Router();
const Review = require("../models/Review");


// CREATE REVIEW
router.post("/", async (req,res)=>{

const review = new Review(req.body);
await review.save();

res.json(review);

});


// GET REVIEWS BY PRODUCT
router.get("/:productId", async (req,res)=>{

const reviews = await Review.find({
productId:req.params.productId
});

res.json(reviews);

});


// ⭐ GET AVERAGE RATING
router.get("/avg/:productId", async (req,res)=>{

const reviews = await Review.find({
productId:req.params.productId
});

if(reviews.length === 0){
return res.json({avg:0});
}

const avg =
reviews.reduce((sum,r)=>sum+r.rating,0) / reviews.length;

res.json({avg});

});

module.exports = router;