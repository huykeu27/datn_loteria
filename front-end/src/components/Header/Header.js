import React, { useState } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import "../Header/header.css";
import { Button, Modal } from "antd";
function Header() {
  const selector = useSelector((state) => state);
  const cartProducts = selector.cartProducts;
  const [isScrolled, setIsScrolled] = useState(false);
  window.onscroll = () => {
    setIsScrolled(window.pageYOffset === 0 ? false : true);
    return () => (window.onscroll = null);
  };
  const [isModalOpen, setIsModalOpen] = useState(true);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const [isOpenLoginForm, setIsOpenLoginForm] = useState(true);
  const [isOpenRegisterForm, setIsOpenRegisterForm] = useState(false);

  const handleOpenLoginForm = () => {
    setIsOpenLoginForm(true);
    setIsOpenRegisterForm(false);
  };

  const handleOpenRegisterForm = () => {
    setIsOpenLoginForm(false);
    setIsOpenRegisterForm(true);
  };
  return (
    <div>
      <header className={isScrolled ? "header-scroll" : "header"}>
        <NavLink to="/">
          <img
            className="siteLogo"
            src="https://www.lotteria.vn/grs-static/images/lotteria_logo.svg"
            alt=""
          />
        </NavLink>
        <form className="search">
          <input type="text" placeholder="search" />
          <button>Accept</button>
        </form>
        <div className="header-right">
          <div className="account" onClick={showModal}>
            <img
              src="https://www.lotteria.vn/grs-static/images/icon-myaccount.svg"
              alt=""
            />
          </div>
          <div className="cartLink">
            <img
              src="https://www.lotteria.vn/grs-static/images/icon-cart.svg"
              alt=""
            />
            <NavLink to="/cart">Cart</NavLink>
            <span>{cartProducts.length}</span>
          </div>
        </div>

        <Modal
          // title="Đăng nhập hoặc tạo tài khoản"
          width={800}
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
          footer={null}
        >
          <div className="modal-login">
            {isOpenLoginForm === true ? (
              <form className="form-login">
                <p>Đăng nhập</p>

                <div className="inp-account">
                  <label>Email</label>
                  <input type="text" placeholder="Nhập thông tin email" />
                </div>
                <div className="inp-account">
                  <label>Password</label>
                  <input type="password" placeholder="Nhập mật khẩu" />
                </div>
                <div className="btn-login">
                  <button>Đăng nhập</button>
                </div>
                <div className="register">
                  Bạn chưa có tài khoản ?
                  <span onClick={handleOpenRegisterForm}>Tạo tài khoản</span>
                </div>
              </form>
            ) : (
              ""
            )}

            {isOpenRegisterForm === true ? (
              <form className="form-login">
                <p>Đăng ký</p>

                <div className="inp-account">
                  <label>Email</label>
                  <input type="text" placeholder="Nhập thông tin email" />
                </div>
                <div className="inp-account">
                  <label>Password</label>
                  <input type="password" placeholder="Nhập mật khẩu" />
                </div>
                <div className="inp-account">
                  <label>Password</label>
                  <input type="password" placeholder="Nhập mật khẩu" />
                </div>
                <div className="btn-login">
                  <button>Đăng kí</button>
                </div>
                <div className="register">
                  Đã có tài khoản?
                  <span onClick={handleOpenLoginForm}>Đăng nhập</span>
                </div>
              </form>
            ) : (
              ""
            )}

            <div className="dlv-img">
              <img
                src="https://www.lotteria.vn/grs-static/images/login-banner.jpg"
                alt=""
              />
            </div>
          </div>
        </Modal>
      </header>
    </div>
  );
}

export default Header;
