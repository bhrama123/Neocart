import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Auth from "./pages/Auth";
import Wishlist from "./pages/Wishlist";
import CartPage from "./pages/CartPage";
import Checkout from "./pages/Checkout";
import MyOrders from "./pages/MyOrders";
import Admin from "./pages/Admin";
import ProductDetails from "./pages/ProductDetails";
import Layout from "./components/Layout";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* LOGIN */}
        <Route path="/" element={<Auth />} />

        {/* DASHBOARD */}
        <Route
          path="/dashboard"
          element={
            <Layout>
              <Dashboard />
            </Layout>
          }
        />

        {/* WISHLIST */}
        <Route
          path="/wishlist"
          element={
            <Layout>
              <Wishlist />
            </Layout>
          }
        />

        {/* CART */}
        <Route
          path="/cart"
          element={
            <Layout>
              <CartPage />
            </Layout>
          }
        />

        {/* CHECKOUT */}
        <Route
          path="/checkout"
          element={
            <Layout>
              <Checkout />
            </Layout>
          }
        />

        {/* ORDERS */}
        <Route
          path="/orders"
          element={
            <Layout>
              <MyOrders />
            </Layout>
          }
        />

        {/* PRODUCT DETAILS */}
        <Route
          path="/product/:id"
          element={
            <Layout>
              <ProductDetails />
            </Layout>
          }
        />

        {/* ADMIN */}
        <Route
          path="/admin"
          element={
            <Layout>
              <Admin />
            </Layout>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;