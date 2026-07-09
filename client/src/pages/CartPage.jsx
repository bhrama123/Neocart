import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../axios";

function CartPage() {

  const [cart, setCart] = useState([]);

  const navigate = useNavigate();

  const userId = localStorage.getItem("userId") || "demoUser";

  // FETCH CART
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

  // REMOVE ITEM
  const removeItem = async (id) => {
    try {
      await api.delete(`/cart/${id}`);
      fetchCart();
    } catch (err) {
      console.log(err);
    }
  };

  // GO TO CHECKOUT
  const goToCheckout = () => {

    localStorage.setItem("cart", JSON.stringify(cart));

    navigate("/checkout");

  };

  // TOTAL
  const total = cart.reduce((sum, item) => sum + item.price, 0);

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
                borderRadius: "10px"
              }}
            >

              <img
  src={product.image}
  alt={product.name}
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
                    cursor: "pointer"
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
              fontSize: "16px"
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