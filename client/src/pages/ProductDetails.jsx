import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa";
import api from "../axios";

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [message, setMessage] = useState("");

  const userId =
    localStorage.getItem("userId") || "demoUser";

  useEffect(() => {
    api
      .get(`/products/${id}`)
      .then((res) => setProduct(res.data))
      .catch((err) => console.log(err));
  }, [id]);

  const addToCart = async () => {
    try {
      await api.post("/cart", {
        userId,
        productId: product._id,
        name: product.name,
        price: product.price,
        image: product.image,
      });

      setMessage("Added to cart successfully");

      setTimeout(() => setMessage(""), 2000);
    } catch (err) {
      console.log(err);
    }
  };

  const buyNow = async () => {
    const cartItem = {
      _id: product._id,
      productId: product._id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
    };

    localStorage.setItem(
      "cart",
      JSON.stringify([cartItem])
    );

    navigate("/checkout");
  };

  const addToWishlist = async () => {
    try {
      await api.post("/wishlist", {
        userId,
        productId: product._id,
        name: product.name,
        price: product.price,
        image: product.image,
      });

      setMessage("Added to wishlist ❤️");

      setTimeout(() => setMessage(""), 2000);
    } catch (err) {
      console.log(err);
    }
  };

  const submitReview = async () => {
    if (!comment.trim()) {
      alert("Please write a review");
      return;
    }

    try {
      await api.post("/reviews", {
        productId: id,
        userId,
        rating: Number(rating),
        comment,
      });

      alert("Review submitted");

      setComment("");
      setRating(5);
    } catch (err) {
      console.log(err);
      alert("Unable to submit review");
    }
  };

  if (!product) {
    return (
      <h2 style={{ padding: "40px" }}>
        Loading...
      </h2>
    );
  }

  const imageUrl = product.image?.startsWith("http")
    ? product.image
    : `https://neocart-backend-qnte.onrender.com/uploads/${product.image}`;

  return (
    <div
      style={{
        padding: "40px",
        background: "#f5f5f5",
        minHeight: "100vh",
      }}
    >
      {message && (
        <div
          style={{
            background: "green",
            color: "white",
            padding: "12px",
            textAlign: "center",
            marginBottom: "20px",
          }}
        >
          {message}
        </div>
      )}

      <button onClick={() => navigate(-1)}>
        ← Back
      </button>

      <div
        style={{
          display: "flex",
          gap: "60px",
          background: "white",
          padding: "40px",
          marginTop: "20px",
          borderRadius: "10px",
        }}
      >
        <div>
          <img
            src={imageUrl}
            alt={product.name}
            style={{
              width: "400px",
              height: "400px",
              objectFit: "contain",
            }}
          />
        </div>

        <div style={{ flex: 1 }}>
          <h1>{product.name}</h1>

          <p style={{ color: "green" }}>
            ⭐⭐⭐⭐⭐ 5.0 Rating
          </p>

          <hr />

          <h1 style={{ color: "#b12704" }}>
            ₹ {product.price}
          </h1>

          <p>
            {product.description ||
              "High quality product available on NeoCart."}
          </p>

          <p>
            <strong>Category:</strong>{" "}
            {product.category || "General"}
          </p>

          <p style={{ color: "green" }}>
            ✓ In Stock
          </p>

          <p>
            🚚 FREE Delivery
          </p>

          <div
            style={{
              display: "flex",
              gap: "15px",
              marginTop: "30px",
            }}
          >
            <button
              onClick={addToCart}
              style={{
                background: "#ffd814",
                padding: "15px 30px",
                border: "none",
                borderRadius: "25px",
                cursor: "pointer",
              }}
            >
              Add to Cart
            </button>

            <button
              onClick={buyNow}
              style={{
                background: "#ffa41c",
                padding: "15px 30px",
                border: "none",
                borderRadius: "25px",
                cursor: "pointer",
              }}
            >
              Buy Now
            </button>

            <FaHeart
              onClick={addToWishlist}
              style={{
                color: "red",
                fontSize: "30px",
                cursor: "pointer",
                marginTop: "8px",
              }}
            />
          </div>
        </div>
      </div>

      <div
        style={{
          background: "white",
          padding: "30px",
          marginTop: "30px",
          borderRadius: "10px",
        }}
      >
        <h2>Write a Review ⭐</h2>

        <select
          value={rating}
          onChange={(e) =>
            setRating(e.target.value)
          }
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
          onChange={(e) =>
            setComment(e.target.value)
          }
          rows="5"
          style={{
            width: "100%",
            maxWidth: "600px",
            padding: "10px",
          }}
        />

        <br />
        <br />

        <button onClick={submitReview}>
          Submit Review
        </button>
      </div>
    </div>
  );
}

export default ProductDetails;