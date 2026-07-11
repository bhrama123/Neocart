import { useEffect, useState } from "react";
import "./Dashboard.css";
import { FaHeart } from "react-icons/fa";

import Hero from "../components/Hero";
import Categories from "../components/Categories";
import SearchBar from "../components/SearchBar";

import api from "../axios";

function Dashboard() {
  const [products, setProducts] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [message, setMessage] = useState("");
  const [search, setSearch] = useState("");
const [selectedCategory, setSelectedCategory] = useState("All");
  const userId = localStorage.getItem("userId") || "demoUser";

  // ================= GET PRODUCTS =================
  useEffect(() => {
    api
      .get("/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.log(err));
  }, []);

  // ================= GET WISHLIST =================
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

  // ================= ADD TO CART =================
  const addToCart = async (product) => {
    try {
      await api.post("/cart", {
        userId,
        productId: product._id,
        name: product.name,
        price: product.price,
        image: product.image,
      });

      setMessage(product.name + " added to cart");

      setTimeout(() => {
        setMessage("");
      }, 2000);
    } catch (err) {
      console.log(err);
    }
  };

  // ================= TOGGLE WISHLIST =================
  const toggleWishlist = async (product) => {
    const exists = wishlist.find(
      (item) => String(item.productId) === String(product._id)
    );

    if (exists) {
      await api.delete(`/wishlist/${exists._id}`);

      setWishlist(
        wishlist.filter((item) => item._id !== exists._id)
      );

      setMessage(product.name + " removed from wishlist");
    } else {
      const res = await api.post("/wishlist", {
        userId,
        productId: product._id,
        name: product.name,
        price: product.price,
        image: product.image,
      });

      setWishlist([...wishlist, res.data]);

      setMessage(product.name + " added to wishlist");
    }

    setTimeout(() => {
      setMessage("");
    }, 2000);
  };

  return (
    <div>

      {message && (
        <div className="message">
          {message}
        </div>
      )}

      <Hero />

      <SearchBar
        search={search}
        setSearch={setSearch}
      />

    <Categories
  selectedCategory={selectedCategory}
  setSelectedCategory={setSelectedCategory}
/>

      <h2
        style={{
          textAlign: "center",
          margin: "40px 0",
        }}
      >
        Featured Products
      </h2>

      <div id="products"
      className="products">

        .filter((product) => {
  const matchesSearch = product.name
    .toLowerCase()
    .includes(search.toLowerCase());

  const matchesCategory =
    selectedCategory === "All" ||
    product.category?.toLowerCase() ===
      selectedCategory.toLowerCase();

  return matchesSearch && matchesCategory;
})
          .map((product) => (
            <div className="card" key={product._id}>

              <img
                src={product.image}
                alt={product.name}
              />

              <h3>{product.name}</h3>

              <p>₹ {product.price}</p>

              <div className="actions">

                <button
                  onClick={() => addToCart(product)}
                >
                  Add To Cart
                </button>

                <FaHeart
                  className={
                    wishlist.find(
                      (item) =>
                        String(item.productId) ===
                        String(product._id)
                    )
                      ? "heart active"
                      : "heart"
                  }
                  onClick={() => toggleWishlist(product)}
                />

              </div>

            </div>
          ))}

      </div>

    </div>
  );
}

export default Dashboard;