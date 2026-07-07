import { useNavigate } from "react-router-dom";

function Navbar() {

  const navigate = useNavigate();

  return (
    <div className="navbar">

      <h2 onClick={() => navigate("/dashboard")} style={{cursor:"pointer"}}>
        NeoCart
      </h2>

      <div className="nav-links">
        <span onClick={() => navigate("/dashboard")}>Home</span>
        <span onClick={() => navigate("/wishlist")}>Wishlist</span>
        <span onClick={() => navigate("/orders")}>My Orders</span>
        <span onClick={() => navigate("/cart")}>Cart</span>
      </div>

    </div>
  );
}

export default Navbar;