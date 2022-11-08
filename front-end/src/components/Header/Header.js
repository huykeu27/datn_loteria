import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import "../Header/header.css";
import { Modal } from "antd";
import axios from "../../config/axios";
import { toast } from "react-toastify";

function Header() {
  function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }
  const selector = useSelector((state) => state);
  const cartProducts = selector.cartProducts;
  const [isOpenLoginForm, setIsOpenLoginForm] = useState(true);
  const [isOpenRegisterForm, setIsOpenRegisterForm] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [token, setToken] = useState("");
  const [account, setAccount] = useState({ email: "", password: "" });
  const [newaccount, setNewAccount] = useState({
    fullname: "",
    email: "",
    password: "",
  });
  const { fullname, email, password } = newaccount;
  window.onscroll = () => {
    setIsScrolled(window.pageYOffset === 0 ? false : true);
    return () => (window.onscroll = null);
  };
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onChangeEmail = (e) => {
    setAccount({ ...account, email: e.target.value });
  };
  const onChangePassword = (e) => {
    setAccount({ ...account, password: e.target.value });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setNewAccount((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  const handleLogin = async () => {
    const url = "/user/sign-in";
    await axios
      .post(url, {
        email: account.email,
        password: account.password,
      })
      .then((response) => {
        setCookie("user", response.data.data.accessToken, 1);
        if (response.data.errcode === 0) {
          toast.success("Đăng nhập thành công ", {
            theme: "colored",
          });
          setToken(response.data.data.accessToken);
          setIsModalOpen(false);
        }

        console.log(response.data.data.accessToken);
      })
      .catch((err) => {
        if (err.response.data.errcode === 1) {
          toast.warning("Email và mật khẩu không được để trống", {
            theme: "colored",
          });
        } else if (err.response.data.errcode === 2) {
          toast.error("Email hoặc mật khẩu không chính xác", {
            theme: "colored",
          });
        }
      });
  };

  const handleRegister = async () => {
    await axios
      .post("/user/create-account", newaccount)
      .then((response) => {
        if (response.data.errcode === 0) {
          handleOpenLoginForm();
          toast.success("Đăng kí thành công ", {
            theme: "colored",
          });
        }
      })
      .catch((err) => {
        console.log(err);
        if (err.response.data.errcode === 1) {
          toast.error("Vui lòng điền đầy đủ thông tin", {
            theme: "colored",
          });
        } else if (err.response.data.errcode === 2) {
          toast.warning("Email đã tồn tại", {
            theme: "colored",
          });
        }
      });
  };
  useEffect(() => {
    // getlistProduct();
  }, [account]);

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
          {token && token !== "" ? (
            <NavLink to="/profile">
              <div className="account">
                <img
                  src="https://www.lotteria.vn/grs-static/images/icon-myaccount.svg"
                  alt=""
                />
              </div>
            </NavLink>
          ) : (
            <div className="account" onClick={showModal}>
              <img
                src="https://www.lotteria.vn/grs-static/images/icon-myaccount.svg"
                alt=""
              />
            </div>
          )}
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
                  <input
                    type="text"
                    placeholder="Nhập thông tin email"
                    onChange={(e) => {
                      onChangeEmail(e);
                    }}
                  />
                </div>
                <div className="inp-account">
                  <label>Password</label>
                  <input
                    type="password"
                    placeholder="Nhập mật khẩu"
                    onChange={(e) => {
                      onChangePassword(e);
                    }}
                  />
                </div>
                <div className="btn-login">
                  <button
                    type="button"
                    onClick={() => {
                      handleLogin();
                    }}
                  >
                    Đăng nhập
                  </button>
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
                  <label>Tên đầy đủ</label>
                  <input
                    type="text"
                    required={true}
                    placeholder="Nhập tên đầy đủ"
                    onChange={handleChange}
                    name="fullname"
                    value={fullname}
                  />
                </div>
                <div className="inp-account">
                  <label>Email</label>
                  <input
                    type="email"
                    required={true}
                    placeholder="Nhập thông tin email"
                    onChange={handleChange}
                    name="email"
                    value={email}
                  />
                </div>
                <div className="inp-account">
                  <label>Password</label>
                  <input
                    type="password"
                    required={true}
                    placeholder="Nhập mật khẩu"
                    onChange={handleChange}
                    name="password"
                    value={password}
                  />
                </div>

                <div className="btn-login">
                  <button
                    type="button"
                    onClick={() => {
                      handleRegister();
                    }}
                  >
                    Đăng kí
                  </button>
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
