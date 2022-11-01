import React from "react";
import "../Combo/combo.css";
import Slider from "react-slick";
function Combo() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
  };
  return (
    <div className="combo-list">
      <div className="combo-header">
        <span className="combo-title">Ưu đãi đặc biệt</span>
        <button className="view-more">Xem thêm</button>
      </div>
      <Slider {...settings}>
        <div className="combo-item">
          <div className="item-content">
            <div className="combo-img">
              <img
                src="https://dscnnwjxnwl3f.cloudfront.net/media/catalog/product/p/o/pokemon-02_1_.png"
                alt=""
              />
            </div>
            <div className="combo-name">
              <span>Combo1</span>
            </div>
            <div className="combo-detail">
              <span>ga</span> <br />
              <span>nuoc</span>
            </div>
            <div className="combo-price">
              <span>50000đ</span>
            </div>
            <button
              className="combo-btn"
              //   onClick={() => addToCart(item.id)}
            >
              Thêm vào giỏ hàng
            </button>
          </div>
        </div>
        <div className="combo-item">
          <div className="item-content">
            <div className="combo-img">
              <img
                src="https://dscnnwjxnwl3f.cloudfront.net/media/catalog/product/p/o/pokemon-02_1_.png"
                alt=""
              />
            </div>
            <div className="combo-name">
              <span>Combo1</span>
            </div>
            <div className="combo-detail">
              <span>ga</span> <br />
              <span>nuoc</span>
            </div>
            <div className="combo-price">
              <span>50000đ</span>
            </div>
            <button
              className="combo-btn"
              //   onClick={() => addToCart(item.id)}
            >
              Thêm vào giỏ hàng
            </button>
          </div>
        </div>
        <div className="combo-item">
          <div className="item-content">
            <div className="combo-img">
              <img
                src="https://dscnnwjxnwl3f.cloudfront.net/media/catalog/product/p/o/pokemon-02_1_.png"
                alt=""
              />
            </div>
            <div className="combo-name">
              <span>Combo1</span>
            </div>
            <div className="combo-detail">
              <span>ga</span> <br />
              <span>nuoc</span>
            </div>
            <div className="combo-price">
              <span>50000đ</span>
            </div>
            <button
              className="combo-btn"
              //   onClick={() => addToCart(item.id)}
            >
              Thêm vào giỏ hàng
            </button>
          </div>
        </div>
        <div className="combo-item">
          <div className="item-content">
            <div className="combo-img">
              <img
                src="https://dscnnwjxnwl3f.cloudfront.net/media/catalog/product/p/o/pokemon-02_1_.png"
                alt=""
              />
            </div>
            <div className="combo-name">
              <span>Combo1</span>
            </div>
            <div className="combo-detail">
              <span>ga</span> <br />
              <span>nuoc</span>
            </div>
            <div className="combo-price">
              <span>50000đ</span>
            </div>
            <button
              className="combo-btn"
              //   onClick={() => addToCart(item.id)}
            >
              Thêm vào giỏ hàng
            </button>
          </div>
        </div>
        <div className="combo-item">
          <div className="item-content">
            <div className="combo-img">
              <img
                src="https://dscnnwjxnwl3f.cloudfront.net/media/catalog/product/p/o/pokemon-02_1_.png"
                alt=""
              />
            </div>
            <div className="combo-name">
              <span>Combo1</span>
            </div>
            <div className="combo-detail">
              <span>ga</span> <br />
              <span>nuoc</span>
            </div>
            <div className="combo-price">
              <span>50000đ</span>
            </div>
            <button
              className="combo-btn"
              //   onClick={() => addToCart(item.id)}
            >
              Thêm vào giỏ hàng
            </button>
          </div>
        </div>
      </Slider>
    </div>
  );
}

export default Combo;
