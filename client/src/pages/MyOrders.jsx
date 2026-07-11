import { useEffect, useState } from "react";
import api from "../axios";

function MyOrders() {

  const [orders, setOrders] = useState([]);

  const userId = localStorage.getItem("userId") || "demoUser";

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await api.get(`/orders/${userId}`);
      setOrders(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div style={{ padding: "40px", background: "#f5f5f5", minHeight: "100vh" }}>

      <h1 style={{ marginBottom: "30px" }}>My Orders</h1>

      {orders.length === 0 ? (

        <h2>No Orders Yet</h2>

      ) : (

        orders.map((order) => (

          <div
            key={order._id}
            style={{
              background: "#fff",
              borderRadius: "10px",
              padding: "20px",
              marginBottom: "30px",
              boxShadow: "0 0 10px rgba(0,0,0,0.1)"
            }}
          >

            <h3 style={{ marginBottom: "20px" }}>
              Order ID : {order._id}
            </h3>

            {order.items &&
              order.items.map((item, index) => (

                <div
                  key={index}
                  style={{
                    display: "flex",
                    gap: "20px",
                    alignItems: "center",
                    marginBottom: "20px"
                  }}
                >

                  <img
                    src={`https://neocart-sqeh.onrender.com/uploads/${item.image}`}
                    alt={item.name}
                    width="120"
                    height="120"
                    style={{
                      objectFit: "cover",
                      borderRadius: "8px"
                    }}
                  />

                  <div>

                    <h2>{item.name}</h2>

                    <p><b>Price :</b> ₹ {item.price}</p>

                    <p><b>Quantity :</b> {item.quantity}</p>

                  </div>

                </div>

              ))}

            <hr />

            <p>
              <b>Order Status :</b>{" "}
              <span style={{ color: "green" }}>
                {order.orderStatus || "Order Placed"}
              </span>
            </p>

            <p>
              <b>Payment Method :</b>{" "}
              {order.paymentMethod || "Cash On Delivery"}
            </p>

            <p>
              <b>Payment Status :</b>{" "}
              {order.paymentStatus || "Pending"}
            </p>

            <p>
              <b>Ordered On :</b>{" "}
              {order.orderedAt
                ? new Date(order.orderedAt).toLocaleDateString()
                : "-"}
            </p>

            <p>
              <b>Expected Delivery :</b>{" "}
              {order.deliveryDate
                ? new Date(order.deliveryDate).toLocaleDateString()
                : "Calculating..."}
            </p>

            {order.customer && (
              <>
                <h3 style={{ marginTop: "20px" }}>
                  Delivery Address
                </h3>

                <p>{order.customer.name}</p>

                <p>{order.customer.phone}</p>

                <p>{order.customer.email}</p>

                <p>
                  {order.customer.address}
                </p>

                <p>
                  {order.customer.city},{" "}
                  {order.customer.state} - {order.customer.pincode}
                </p>
              </>
            )}

            <h2
              style={{
                marginTop: "20px",
                color: "#ff6600"
              }}
            >
              Total : ₹ {order.total}
            </h2>

          </div>

        ))

      )}

    </div>
  );
}

export default MyOrders;