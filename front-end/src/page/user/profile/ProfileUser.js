import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "../../../components/Footer/Footer";
import Header from "../../../components/Header/Header";
import Profile from "../../../components/User/Profile";
import Home from "../homePage/Home";

function ProfileUser() {
  return (
    <>
      <Header />
      <Profile />
      <Footer />
    </>
  );
}

export default ProfileUser;
