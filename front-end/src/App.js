import React from "react";
import "./App.css";
import "antd/dist/antd.css";
import { Route, Routes } from "react-router-dom";
import "antd/dist/antd.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Home from "./page/user/homePage/Home";
import Product from "./components/Product/Product";
import Admin from "./page/admin/Admin";
import Customers from "./components/Admin/customer/Customers";
import CategoryManager from "./components/Admin/category/CategoryManager";
import ProductManager from "./components/Admin/product/ProductManager";
import ProfileUser from "./page/user/profile/ProfileUser";
import Address from "./components/User/Address/Address";
import Order from "./components/User/Order/Order";
import Info from "./components/User/Info/Info";

import CartHome from "./page/user/cart/CartHome";
import Payment from "./page/user/pay/Payment";
import OrderWait from "./components/User/Order/OrderWait";
import OrderSuccess from "./components/User/Order/OrderSuccess";
import OrderManager from "./components/Admin/order/OrderManager";
import Password from "./components/User/Password/Password";
function App() {
  return (
    <>
      <Routes>
        <Route path="/category/:productId" element={<Product />}></Route>
        <Route path="/cart" element={<CartHome />}></Route>
        <Route path="/" element={<Home />}></Route>
        <Route path="/profile" element={<ProfileUser />}>
          <Route path="/profile" element={<Info />} />
          <Route path="password" element={<Password />} />
          <Route path="address" element={<Address />} />
          <Route path="order" element={<Order />}>
            <Route path="waiting" element={<OrderWait />} />
            <Route path="success" element={<OrderSuccess />} />
          </Route>
        </Route>
        <Route path="/checkout/cart" element={<Payment />}></Route>
        <Route path="/admin" element={<Admin />}>
          <Route path="customers" element={<Customers />} />
          <Route path="categories" element={<CategoryManager />} />
          <Route path="products" element={<ProductManager />} />
          <Route path="orders" element={<OrderManager />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
