import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../axios";

function ProductDetails() {

const { id } = useParams();

const [product,setProduct] = useState(null);
const [rating,setRating] = useState(5);
const [comment,setComment] = useState("");


// FETCH PRODUCT
useEffect(()=>{

api.get("/products/" + id)
.then(res=>setProduct(res.data));

},[id]);


// SUBMIT REVIEW
const submitReview = async()=>{

await api.post("/reviews",{
productId:id,
userId:localStorage.getItem("userId"),
rating,
comment
});

alert("Review submitted");

setComment("");
setRating(5);

};


if(!product){
return <h2 style={{padding:"40px"}}>Loading...</h2>;
}


return(

<div style={{padding:"40px"}}>

<h2>{product.name}</h2>

<img
  src={product.image}
  alt={product.name}
/>
<h3>₹ {product.price}</h3>

<p>{product.description || "No description available"}</p>


{/* REVIEW SECTION */}

<h3>Write a Review</h3>

<select
value={rating}
onChange={(e)=>setRating(e.target.value)}
>

<option value="5">⭐⭐⭐⭐⭐</option>
<option value="4">⭐⭐⭐⭐</option>
<option value="3">⭐⭐⭐</option>
<option value="2">⭐⭐</option>
<option value="1">⭐</option>

</select>

<br/><br/>

<textarea
placeholder="Write your review..."
value={comment}
onChange={(e)=>setComment(e.target.value)}
rows="4"
cols="40"
/>

<br/><br/>

<button onClick={submitReview}>
Submit Review
</button>


</div>

);

}

export default ProductDetails;