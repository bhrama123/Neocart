import { useEffect, useState } from "react";
import api from "../axios";

function Wishlist() {

  const [wishlist, setWishlist] = useState([]);

  const userId = localStorage.getItem("userId") || "demoUser";

  useEffect(() => {

    fetchWishlist();

  }, []);

  const fetchWishlist = async () => {

    try {
      const res = await api.get(`/wishlist/${userId}`);
      setWishlist(res.data);
    } catch (err) {
      console.log(err);
    }

  };

  const removeItem = async (id) => {

    await api.delete(`/wishlist/${id}`);
    fetchWishlist();

  };

  return (
    <div style={{ padding: "40px" }}>

      <h2>My Wishlist</h2>

      {wishlist.length === 0 ? (
        <h3>No Items</h3>
      ) : (
        wishlist.map((item) => (
          <div key={item._id} style={{ marginBottom: "20px" }}>

            <img
              src={`http://localhost:5000/uploads/${item.image}`}
              width="120"
            />

            <h3>{item.name}</h3>

            <p>₹ {item.price}</p>

            <button onClick={() => removeItem(item._id)}>
              Remove
            </button>

          </div>
        ))
      )}

    </div>
  );
}

export default Wishlist;