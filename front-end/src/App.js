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
import Address from "./components/User/Address";
import Order from "./components/User/Order";
import Info from "./components/User/Info";

import CartHome from "./page/user/cart/CartHome";
function App() {
  return (
    <>
      {/* <Header />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/category" element={<Category />}></Route>
        <Route path="/cart" element={<Cart />}></Route>
        
        <Route path="/account" element={<Account />}></Route>
      </Routes>
      <Footer /> */}

      <Routes>
        <Route path="/category/burger" element={<Product />}></Route>
        <Route path="/cart" element={<CartHome />}></Route>
        <Route path="/" element={<Home />}></Route>
        <Route path="/profile" element={<ProfileUser />}>
          <Route
            path="/profile"
            element={<Info />}
            errorElement={<h1>Error 404</h1>}
          />
          <Route path="address" element={<Address />} />
          <Route path="order" element={<Order />} />
        </Route>
        <Route
          path="/admin"
          element={
            // <PrivateRouteShop sigin={"/sign-in-admin"}>
            <Admin />
            // </PrivateRouteShop>
          }
        >
          <Route path="/admin/customers" element={<Customers />} />
          <Route path="/admin/categories" element={<CategoryManager />} />
          <Route path="/admin/products" element={<ProductManager />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
