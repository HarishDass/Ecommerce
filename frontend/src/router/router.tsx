import React from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Login from "../login/login";
import Bannar from "../components/Bannar";
import RequireAuth from "./requireAuth";
import Products from "../components/Products";
import Latest from "../components/Latest";
import Contacts from "../components/Contacts";
import Cart from "../components/Cart";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route element={<RequireAuth />}>
          <Route path="home" element={<Bannar />}></Route>
          <Route path="products" element={<Products />}></Route>
          <Route path="latest" element={<Latest />}></Route>
          <Route path="contact" element={<Contacts />}></Route>
          <Route path="cart" element={<Cart />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
