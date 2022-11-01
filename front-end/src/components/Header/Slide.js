import React from "react";
import Slider from "react-slick";
import "./slide.css";
function Slide() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    fade: true,
  };
  return (
    <div className="header-slide">
      <Slider {...settings}>
        <div className="slide-item">
          <a href="">
            <img
              src="https://dscnnwjxnwl3f.cloudfront.net/media/banner/d/e/deli-web_-01_1.jpg"
              alt=""
            />
          </a>
        </div>
        <div className="slide-item">
          <a href="">
            <img
              src="https://dscnnwjxnwl3f.cloudfront.net/media/banner/b/a/banner-dli-01_2.jpg"
              alt=""
            />
          </a>
        </div>
        <div className="slide-item">
          <a href="">
            <img
              src="https://dscnnwjxnwl3f.cloudfront.net/media/banner/p/o/pokemon-web-01.jpg"
              alt=""
            />
          </a>
        </div>
      </Slider>
    </div>
  );
}

export default Slide;
