import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../axios";

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  useEffect(() => {
    api
      .get("/products/" + id)
      .then((res) => setProduct(res.data))
      .catch((err) => console.log(err));
  }, [id]);

  const submitReview = async () => {
    await api.post("/reviews", {
      productId: id,
      userId: localStorage.getItem("userId"),
      rating,
      comment,
    });

    alert("Review submitted");

    setComment("");
    setRating(5);
  };

  if (!product) {
    return <h2 style={{ padding: "40px" }}>Loading...</h2>;
  }

  const imageUrl = product.image?.startsWith("http")
    ? product.image
    : `https://neocart-backend-qnte.onrender.com/uploads/${product.image}`;

  return (
    <div style={{ padding: "40px" }}>
      <button onClick={() => navigate(-1)}>← Back</button>

      <br />
      <br />

      <h2>{product.name}</h2>

      <img
        src={imageUrl}
        alt={product.name}
        style={{
          width: "350px",
          height: "350px",
          objectFit: "contain",
        }}
      />

      <h3>₹ {product.price}</h3>

      <p>{product.description || "No description available"}</p>

      <h3>Write a Review</h3>

      <select
        value={rating}
        onChange={(e) => setRating(e.target.value)}
      >
        <option value="5">⭐⭐⭐⭐⭐</option>
        <option value="4">⭐⭐⭐⭐</option>
        <option value="3">⭐⭐⭐</option>
        <option value="2">⭐⭐</option>
        <option value="1">⭐</option>
      </select>

      <br />
      <br />

      <textarea
        placeholder="Write your review..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        rows="4"
        cols="40"
      />

      <br />
      <br />

      <button onClick={submitReview}>Submit Review</button>
    </div>
  );
}

export default ProductDetails;