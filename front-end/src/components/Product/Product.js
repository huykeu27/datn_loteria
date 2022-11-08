import React from "react";
import "../Product/product.css";
import { useDispatch, useSelector } from "react-redux";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

function Product() {
  const selector = useSelector((state) => state);
  const dispath = useDispatch();
  const products = selector.products;
  const cartProducts = selector.cartProducts;
  function addToCart(id) {
    let isInCart = false;
    cartProducts.forEach((el) => {
      if (id === el.id) isInCart = true;
    });
    if (!isInCart) {
      dispath({
        type: "ADD_TO_CART",
        payload: products.find((product) => id === product.id),
      });
    }
    alert("Product add to cart");
  }

  return (
    <>
      <Header />
      <div className="productsList">
        {products.map((item, index) => (
          <div className="product" key={index}>
            <img src={item.img} alt="" />
            <h3>{item.name}</h3>
            <div className="priceBlock">
              <span className="productPrice">
                {item.price.toLocaleString()}đ
              </span>
              <button onClick={() => addToCart(item.id)}>
                Thêm vào giỏ hàng
              </button>
            </div>
          </div>
        ))}
      </div>
      <Footer />
    </>
  );
}

export default Product;
