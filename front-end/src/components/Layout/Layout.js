import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../Header/Header";
import Category from "../Categorys/Category";
import "../Layout/layout.css";
function Layout() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}

export default Layout;
