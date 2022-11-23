import React, { useEffect, useState } from "react";
import "../Combo/combo.css";
import Slider from "react-slick";
import { useDispatch, useSelector } from "react-redux";
import axios from "../../config/axios";
function Combo() {
  const selector = useSelector((state) => state);
  const dispath = useDispatch();
  // const products = selector.products;
  const cartProducts = selector.cartProducts;
  const [products, setProducts] = useState([]);
  const settings = {
    dots: true,
    infinite: true,
    speed: 400,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
  };
  const getCombo = async () => {
    const url = "/product/combo";
    await axios
      .get(url)
      .then((res) => {
        console.log(res.data);
        setProducts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getCombo();
  }, []);

  function addToCart(id) {
    let quantity = false;
    cartProducts.forEach((el) => {
      if (id === el._id) quantity = true;
    });
    if (!quantity) {
      dispath({
        type: "ADD_TO_CART",
        payload: products.find((product) => id === product._id),
      });
    }
    alert("Đã thêm sản phẩm vào giỏ hàng");
  }
  return (
    <div className="combo-list">
      <div className="combo-header">
        <span className="combo-title">Ưu đãi đặc biệt</span>
        <button className="view-more">Xem thêm</button>
      </div>
      <Slider {...settings}>
        {products.map((item, index) => (
          <div className="combo-item" key={item._id}>
            <div className="item-content">
              <div className="combo-img">
                <img src={item.imageUrl} alt="" />
              </div>
              <div className="combo-name">
                <span>{item.name}</span>
              </div>
              <div className="combo-detail">
                <span>Khuyến mãi đặc biệt</span>
              </div>
              <div className="combo-price">
                <span>{item.price.toLocaleString()}đ</span>
              </div>
              <button className="combo-btn" onClick={() => addToCart(item._id)}>
                Thêm vào giỏ hàng
              </button>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default Combo;
