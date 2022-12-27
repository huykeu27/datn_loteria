import React from "react";
import "../Product/product.css";
import { useDispatch, useSelector } from "react-redux";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { Link, NavLink, useParams, useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import axios from "../../config/axios";
import { useState } from "react";
import { toast } from "react-toastify";

function Product() {
  const selector = useSelector((state) => state);
  const dispath = useDispatch();
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("");
  const myCart = selector.myCart;
  const userinfo = selector.userinfo;
  const { productId } = useParams();
  const getCart = async () => {
    let info = JSON.parse(localStorage.getItem("info"));
    if (info) {
      const resp = await axios.get(`/api/cart/mycart/${info._id}`);
      dispath({
        type: "MY-CART",
        payload: resp.data.listProduct,
      });
    }
  };
  console.log(userinfo);
  const addToCart = async (id) => {
    try {
      if (!userinfo) {
        toast.warning("Vui lòng đăng nhập để mua hàng");
      } else {
        let resp = await axios.patch(`/api/cart/add-product/${userinfo._id}`, {
          productId: id,
        });
        if (resp.status === 200) {
          toast.success("Đã thêm sản phẩm vào giỏ hàng");
          getCart();
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

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
  }, [productId, myCart.productList]);

  //get my cart

  return (
    <>
      <Header />

      <div className="three">
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
