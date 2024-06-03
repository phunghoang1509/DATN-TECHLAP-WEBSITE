import React from "react";
import { Route } from "react-router-dom";

import ProductDetails from "../product/ProductDetails";
import Login from "../auth/Login";
import Register from "../auth/Register";
import Cart from "../cart/Cart";
import Shipping from "../cart/Shipping";
import ConfirmOrder from "../cart/ConfirmOrder";
import PaymentMethod from "../cart/PaymentMethod";
import HomePage from "../page/HomePage";
import ProductsPage from "../page/ProductsPage";
import Blogs from "../page/Blogs";
const userRoutes = () => {
  return (
    <>
      <Route path="/" element={<HomePage />} />
      <Route path="/product/:id" element={<ProductDetails />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/products" element={<ProductsPage />} />
      <Route path="/shipping" element={<Shipping />} />
      <Route path="/confirm_order" element={<ConfirmOrder />} />
      <Route path="/payment_method" element={<PaymentMethod />} />
      <Route path="/blogs" element={<Blogs />} />
    </>
  );
};

export default userRoutes;
