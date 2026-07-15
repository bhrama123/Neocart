import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa";
import api from "../axios";

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [message, setMessage] = useState("");

  const userId =
    localStorage.getItem("userId") || "demoUser";

  useEffect(() => {
    api
      .get(`/products/${id}`)
      .then((res) => setProduct(res.data))
      .catch((err) => console.log(err));
  }, [id]);

  const increaseQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const decreaseQuantity = () => {
    setQuantity((prev) =>
      prev > 1 ? prev - 1 : 1
    );
  };

  const addToCart = async () => {
    try {
      await api.post("/cart", {
        userId,
        productId: product._id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity,
      });

      setMessage(
        `${quantity} ${product.name} added to cart`
      );

      setTimeout(() => setMessage(""), 2000);
    } catch (err) {
      console.log(err);
    }
  };

  const buyNow = () => {
    const item = {
      _id: product._id,
      productId: product._id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity,
    };

    localStorage.setItem(
      "cart",
      JSON.stringify([item])
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

  if (!product) {
    return <h2 style={{ padding: "40px" }}>Loading...</h2>;
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
        <img
          src={imageUrl}
          alt={product.name}
          style={{
            width: "400px",
            height: "400px",
            objectFit: "contain",
          }}
        />

        <div style={{ flex: 1 }}>
          <h1>{product.name}</h1>

          <p>⭐⭐⭐⭐⭐ 5.0 Rating</p>

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

          <p>🚚 FREE Delivery</p>

          <h3>Quantity</h3>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "15px",
              marginBottom: "25px",
            }}
          >
            <button
              onClick={decreaseQuantity}
              style={{
                width: "40px",
                height: "40px",
                fontSize: "22px",
                cursor: "pointer",
              }}
            >
              −
            </button>

            <h2>{quantity}</h2>

            <button
              onClick={increaseQuantity}
              style={{
                width: "40px",
                height: "40px",
                fontSize: "22px",
                cursor: "pointer",
              }}
            >
              +
            </button>
          </div>

          <h3>
            Total: ₹ {product.price * quantity}
          </h3>

          <div
            style={{
              display: "flex",
              gap: "15px",
              alignItems: "center",
              marginTop: "25px",
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
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;