import React from "react";
import Category from "../../../components/Categorys/Category";
import Combo from "../../../components/Combo/Combo";
import Footer from "../../../components/Footer/Footer";
import Header from "../../../components/Header/Header";

import Slide from "../../../components/Header/Slide";

function Home() {
  return (
    <>
      <Header />
      <Slide />
      <Category />
      <Combo />
      <Footer />
    </>
  );
}

export default Home;
