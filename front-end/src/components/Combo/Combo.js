import React, { useEffect, useState } from "react";
import "../Combo/combo.css";
import Slider from "react-slick";
import { useDispatch, useSelector } from "react-redux";
import axios from "../../config/axios";
import { toast } from "react-toastify";
function Combo() {
  const selector = useSelector((state) => state);
  const dispath = useDispatch();
  // const products = selector.products;
  const myCart = selector.myCart;
  const userinfo = selector.userinfo;

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
        setProducts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getCombo();
  }, []);
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
  function addToCart(id) {
    axios
      .patch(`/api/cart/add-product/${userinfo._id}`, {
        productId: id,
      })
      .then((response) => {
        console.log(response);
        getCart();
        toast.success("Đã thêm combo vào giỏ hàng");
      })
      .catch((error) => {
        console.log(error);
      });
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
