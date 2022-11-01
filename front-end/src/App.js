import React from "react";
import "./App.css";
import { Route, Router, Routes } from "react-router-dom";
import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Product from "./components/Product/Product";
import "antd/dist/antd.css";
import Slide from "./components/Header/Slide";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Home from "./page/user/homePage/Home";
import Category from "./page/user/category/Category";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Login from "./components/Login/Login";
function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/category" element={<Category />}></Route>
        <Route path="/cart" element={<Cart />}></Route>
        <Route path="/category/burger" element={<Product />}></Route>
      </Routes>
      <Footer />
    </>
  );
}

export default App;
