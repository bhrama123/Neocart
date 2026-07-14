import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../axios";

function CartPage() {
  const [cart, setCart] = useState([]);

  const navigate = useNavigate();

  const userId = localStorage.getItem("userId") || "demoUser";

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const res = await api.get(`/cart/${userId}`);
      setCart(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const removeItem = async (id) => {
    try {
      await api.delete(`/cart/${id}`);
      fetchCart();
    } catch (err) {
      console.log(err);
    }
  };

  const getImageUrl = (item) => {
    const imageMap = {
      "iPhone 15": "iphone15.jpg",
      "Samsung Galaxy S24": "s24.jpg",
      "OnePlus 12": "oneplus12.jpg",
      "Google Pixel 9": "pixel9.jpg",
      "MacBook Air M3": "macbookairm3.jpg",
      "Dell XPS 15": "dellxps15.jpg",
      "HP Victus 15": "hpvictus15.jpg",
      "Lenovo Legion 5": "lenovolegion5.jpg",
    };

    const image = imageMap[item.name] || item.image;

    if (!image) return "";

    if (image.startsWith("http")) {
      return image;
    }

    return `https://neocart-backend-qnte.onrender.com/uploads/${image}`;
  };

  const goToCheckout = () => {
    localStorage.setItem("cart", JSON.stringify(cart));
    navigate("/checkout");
  };

  const total = cart.reduce(
    (sum, item) => sum + Number(item.price),
    0
  );

  return (
    <div style={{ padding: "40px" }}>
      <h1>Your Cart</h1>

      {cart.length === 0 ? (
        <h3>Cart is Empty</h3>
      ) : (
        <>
          {cart.map((item) => (
            <div
              key={item._id}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "20px",
                background: "white",
                padding: "20px",
                marginTop: "20px",
                borderRadius: "10px",
              }}
            >
              <img
                src={getImageUrl(item)}
                alt={item.name}
                style={{
                  width: "120px",
                  height: "120px",
                  objectFit: "contain",
                  borderRadius: "10px",
                }}
              />

              <div>
                <h2>{item.name}</h2>

                <p>₹ {item.price}</p>

                <button
                  onClick={() => removeItem(item._id)}
                  style={{
                    background: "red",
                    color: "white",
                    border: "none",
                    padding: "10px",
                    borderRadius: "5px",
                    cursor: "pointer",
                  }}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

          <h2 style={{ marginTop: "30px" }}>
            Total: ₹ {total}
          </h2>

          <button
            onClick={goToCheckout}
            style={{
              marginTop: "20px",
              background: "green",
              color: "white",
              border: "none",
              padding: "15px 30px",
              borderRadius: "8px",
              cursor: "pointer",
              fontSize: "16px",
            }}
          >
            Proceed to Checkout
          </button>
        </>
      )}
    </div>
  );
}

export default CartPage;