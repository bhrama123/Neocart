import { useEffect, useState } from "react";
import "./Dashboard.css";
import { FaHeart } from "react-icons/fa";
import api from "../axios";

function Dashboard() {

  const [products, setProducts] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [message, setMessage] = useState("");

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

    }

    catch (err) {

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
        image: product.image

      });

      setMessage(product.name + " added to cart");

      setTimeout(() => {
        setMessage("");
      }, 2000);

    }

    catch (err) {

      console.log(err);

    }

  };







  // ================= TOGGLE WISHLIST =================

  const toggleWishlist = async (product) => {

    const exists = wishlist.find(
      item => String(item.productId) === String(product._id)
    );



    // REMOVE

    if (exists) {

      await api.delete(`/wishlist/${exists._id}`);

      setWishlist(
        wishlist.filter(item => item._id !== exists._id)
      );

      setMessage(product.name + " removed from wishlist");

    }



    // ADD

    else {

      const res = await api.post("/wishlist", {

        userId,
        productId: product._id,
        name: product.name,
        price: product.price,
        image: product.image

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


      {/* SUCCESS MESSAGE */}

      {

        message &&

        <div className="message">
          {message}
        </div>

      }




      {/* PRODUCTS */}

      <div className="products">

        {products.map((product) => (

          <div className="card" key={product._id}>


            <img src={product.image} />


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
                    item =>
                      String(item.productId) === String(product._id)
                  )

                    ?

                    "heart active"

                    :

                    "heart"

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