import React from "react";
import "../Product/product.css";
import { useDispatch, useSelector } from "react-redux";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { useParams, useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import axios from "../../config/axios";
import { useState } from "react";

function Product() {
  const selector = useSelector((state) => state);
  const dispath = useDispatch();
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("");
  const cartProducts = selector.cartProducts;
  const { productId } = useParams();

  function addToCart(id) {
    let isIncart = false;
    cartProducts.forEach((el) => {
      if (id === el._id) isIncart = true;
    });
    if (!isIncart) {
      dispath({
        type: "ADD_TO_CART",
        payload: products.find((product) => id === product._id),
      });
    }
    alert("Product add to cart");
  }
  ///get-product-by-category/:id

  useEffect(() => {
    axios(`/product/get-product-by-category/${productId}`)
      .then((data) => {
        setProducts(data.data.product);
      })
      .catch((error) => {
        console.log(error);
      });
    axios(`/category/get-category-by-id/${productId}`)
      .then((data) => {
        setCategory(data.data.category.categoryName);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [productId]);
  return (
    <>
      <Header />

      <div class="three">
        <h1>
          <p>{category}</p>
        </h1>
      </div>

      <div className="productsList">
        {products.map((item, index) => (
          <div className="product" key={item._id}>
            <img src={item.imageUrl} alt="" />
            <h3>{item.name}</h3>
            <div className="priceBlock">
              <span className="productPrice">
                {item.price.toLocaleString()}đ
              </span>
              <button onClick={() => addToCart(item._id)}>
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
