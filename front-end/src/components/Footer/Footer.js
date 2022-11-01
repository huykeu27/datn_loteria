import React from "react";
import "../Footer/footer.css";
function Footer() {
  return (
    <div>
      <div className="footer-container">
        <div className="footer-content">
          <div className="content-left">
            <div className="logo">
              <img
                src="https://www.lotteria.vn/grs-static/images/lotteria_logo.svg"
                alt=""
              />
            </div>
            <p> Đăng kí nhận thông tin khuyến mãi</p>
            <div className="input-contact">
              <input type="text" placeholder="Nhập email của bạn" />
              <p>Gửi ngay</p>
            </div>
          </div>
          <div className="content-right">
            <div className="right-item">
              <p>Thông tin</p>
              <ul>
                <li>
                  <a href=""> Tin tức</a>
                </li>
                <li>
                  <a href=""> Khuyến mãi</a>
                </li>
                <li>
                  <a href=""> Tuyển dụng</a>
                </li>
                <li>
                  <a href=""> Nhượng quyền</a>
                </li>
              </ul>
            </div>
            <div className="right-item">
              <p>HỖ TRỢ</p>
              <ul>
                <li>
                  <a href="">Điều khoản sử dụng </a>
                </li>
                <li>
                  <a href="">Chính sách bảo mật </a>
                </li>
                <li>
                  <a href="">Chính sách giao hàng</a>
                </li>
                <li>
                  <a href="">Chăm Sóc Khách Hàng </a>
                </li>
              </ul>
            </div>
            <div className="right-item">
              <p>Theo dõi</p>
              <ul>
                <li>
                  <i className="fa-brands fa-facebook"></i>
                  <a href="">facebook</a>
                </li>
                <li>
                  <i className="fa-brands fa-instagram"></i>
                  <a href="">instagram</a>
                </li>
                <li>
                  <i className="fa-brands fa-twitter"></i>
                  <a href="">twitter</a>
                </li>
                <div className="bct-logo">
                  <img
                    src="https://www.lotteria.vn/grs-static/images/bct.png"
                    alt=""
                  />
                </div>
              </ul>
            </div>
          </div>
        </div>
        <div className="copyright">
          <strong>&copy; 2022 Lotteria All Rights Reserved</strong>
          Site by HP
        </div>
      </div>
    </div>
  );
}

export default Footer;
