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
    try {
      await api.delete(`/wishlist/${id}`);
      fetchWishlist();
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

  return (
    <div style={{ padding: "40px" }}>
      <h2>My Wishlist</h2>

      {wishlist.length === 0 ? (
        <h3>No Items</h3>
      ) : (
        wishlist.map((item) => (
          <div key={item._id} style={{ marginBottom: "20px" }}>
            <img
              src={getImageUrl(item)}
              alt={item.name}
              style={{
                width: "150px",
                height: "150px",
                objectFit: "contain",
              }}
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