import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../axios";
import "./Checkout.css";

function Checkout() {

  const navigate = useNavigate();

  const userId = localStorage.getItem("userId") || "demoUser";

  const [cart, setCart] = useState([]);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    payment: "Cash On Delivery"
  });

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

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const total = cart.reduce(
    (sum, item) => sum + Number(item.price),
    0
  );

  const placeOrder = async () => {

    if (
      !form.name ||
      !form.phone ||
      !form.address ||
      !form.city ||
      !form.state ||
      !form.pincode
    ) {
      alert("Please fill all details");
      return;
    }

    const delivery = new Date();
    delivery.setDate(delivery.getDate() + 5);

    try {

      await api.post("/orders", {

        userId,

        items: cart.map(item => ({
          productId: item.productId,
          name: item.name,
          price: item.price,
          image: item.image,
          quantity: 1
        })),

        total,

        customer: {
          name: form.name,
          phone: form.phone,
          email: form.email,
          address: form.address,
          city: form.city,
          state: form.state,
          pincode: form.pincode
        },

        paymentMethod: form.payment,
        paymentStatus: "Pending",
        orderStatus: "Order Placed",
        deliveryDate: delivery

      });

      // Clear cart from MongoDB
      for (let item of cart) {
        await api.delete(`/cart/${item._id}`);
      }

      alert("Order Placed Successfully");

      navigate("/orders");

    } catch (err) {
      console.log(err);
      alert("Order Failed");
    }

  };

  return (

    <div className="checkout">

      <h1>Checkout</h1>

      <div className="checkout-box">

        <div className="left">

          <h2>Shipping Address</h2>

          <input
            type="text"
            placeholder="Full Name"
            name="name"
            value={form.name}
            onChange={handleChange}
          />

          <input
            type="text"
            placeholder="Phone Number"
            name="phone"
            value={form.phone}
            onChange={handleChange}
          />

          <input
            type="email"
            placeholder="Email"
            name="email"
            value={form.email}
            onChange={handleChange}
          />

          <textarea
            placeholder="Address"
            name="address"
            value={form.address}
            onChange={handleChange}
          />

          <input
            type="text"
            placeholder="City"
            name="city"
            value={form.city}
            onChange={handleChange}
          />

          <input
            type="text"
            placeholder="State"
            name="state"
            value={form.state}
            onChange={handleChange}
          />

          <input
            type="text"
            placeholder="Pincode"
            name="pincode"
            value={form.pincode}
            onChange={handleChange}
          />

          <h2>Payment Method</h2>

          <select
            name="payment"
            value={form.payment}
            onChange={handleChange}
          >
            <option>Cash On Delivery</option>
            <option>UPI</option>
            <option>Credit Card</option>
            <option>Debit Card</option>
          </select>

        </div>

        <div className="right">

          <h2>Order Summary</h2>

          {cart.map((item) => (

            <div
              key={item._id}
              className="summary"
            >

              <img
                src={`https://neocart-sqeh.onrender.com/uploads/${item.image}`}
                alt={item.name}
              />

              <div>
                <h4>{item.name}</h4>
                <p>₹ {item.price}</p>
              </div>

            </div>

          ))}

          <h2>Total : ₹ {total}</h2>

          <button
            className="place-btn"
            onClick={placeOrder}
          >
            Place Order
          </button>

        </div>

      </div>

    </div>

  );

}

export default Checkout;