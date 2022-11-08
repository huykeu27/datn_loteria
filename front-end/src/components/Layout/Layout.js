import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../Header/Header";
import "../Layout/layout.css";
import Footer from "../Footer/Footer";
function Layout() {
  return (
    <>
      <Header />
      <Footer />
      <Outlet />
    </>
  );
}

export default Layout;
