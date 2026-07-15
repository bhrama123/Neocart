import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../axios";

function CartPage() {
  const [cart, setCart] = useState([]);

  const navigate = useNavigate();

  const userId =
    localStorage.getItem("userId") || "demoUser";

  useEffect(() => {
    fetchCart();
  }, []);

  // ================= FETCH CART =================

  const fetchCart = async () => {
    try {
      const res = await api.get(`/cart/${userId}`);

      setCart(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // ================= UPDATE QUANTITY =================

  const updateQuantity = async (item, newQuantity) => {
    if (newQuantity < 1) {
      return;
    }

    try {
      await api.put(`/cart/${item._id}`, {
        quantity: newQuantity,
      });

      setCart((currentCart) =>
        currentCart.map((cartItem) =>
          cartItem._id === item._id
            ? {
                ...cartItem,
                quantity: newQuantity,
              }
            : cartItem
        )
      );
    } catch (err) {
      console.log(err);
    }
  };

  // ================= REMOVE ITEM =================

  const removeItem = async (id) => {
    try {
      await api.delete(`/cart/${id}`);

      setCart((currentCart) =>
        currentCart.filter((item) => item._id !== id)
      );
    } catch (err) {
      console.log(err);
    }
  };

  // ================= IMAGE URL =================

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

    if (!image) {
      return "";
    }

    if (image.startsWith("http")) {
      return image;
    }

    return `https://neocart-backend-qnte.onrender.com/uploads/${image}`;
  };

  // ================= CHECKOUT =================

  const goToCheckout = () => {
    localStorage.setItem(
      "cart",
      JSON.stringify(cart)
    );

    navigate("/checkout");
  };

  // ================= TOTAL =================

  const total = cart.reduce(
    (sum, item) =>
      sum +
      Number(item.price) *
        Number(item.quantity || 1),
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

                {/* QUANTITY */}

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    marginBottom: "15px",
                  }}
                >
                  <button
                    onClick={() =>
                      updateQuantity(
                        item,
                        Number(item.quantity || 1) - 1
                      )
                    }
                    style={{
                      width: "35px",
                      height: "35px",
                      fontSize: "20px",
                      cursor: "pointer",
                    }}
                  >
                    −
                  </button>

                  <strong
                    style={{
                      fontSize: "18px",
                    }}
                  >
                    {item.quantity || 1}
                  </strong>

                  <button
                    onClick={() =>
                      updateQuantity(
                        item,
                        Number(item.quantity || 1) + 1
                      )
                    }
                    style={{
                      width: "35px",
                      height: "35px",
                      fontSize: "20px",
                      cursor: "pointer",
                    }}
                  >
                    +
                  </button>
                </div>

                <p>
                  <strong>
                    Subtotal: ₹{" "}
                    {Number(item.price) *
                      Number(item.quantity || 1)}
                  </strong>
                </p>

                <button
                  onClick={() =>
                    removeItem(item._id)
                  }
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