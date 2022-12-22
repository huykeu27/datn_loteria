import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
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

  function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(";");
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == " ") {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }
  const navigate = useNavigate();
  const selector = useSelector((state) => state);
  const dispath = useDispatch();
  const userinfo = selector.userinfo;
  const myCart = selector.myCart;
  const [isOpenLoginForm, setIsOpenLoginForm] = useState(true);
  const [isOpenRegisterForm, setIsOpenRegisterForm] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [token, setToken] = useState("");
  const [account, setAccount] = useState({
    fullname: "",
    email: "",
    address: "",
  });
  const [newaccount, setNewAccount] = useState({
    fullname: "",
    email: "",
    password: "",
  });
  const [cart, setCart] = useState([]);
  const [role, setRole] = useState("");
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
        if (response.data.data.role === "admin") {
          navigate("/admin");
        } else {
          navigate("/");
        }
        setCookie("user", response.data.data.accessToken, 1);
        localStorage.setItem("info", JSON.stringify(response.data.data));

        axios
          .post("/api/cart/default", { id: response.data.data._id })
          .then((res) => {
            if (res.data.listProduct.length >= 0) {
              setCart(res.data.listProduct);
            }
          })
          .catch((err) => {
            console.log(err);
          });

        if (response.data.errcode === 0) {
          toast.success("Đăng nhập thành công ", {
            theme: "colored",
          });
          setToken(response.data.data.accessToken);
          setIsModalOpen(false);
        }
      })
      .catch((err) => {
        console.log(err);
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
    setToken(getCookie("user"));
    checkLogin();
    getCart();
  }, []);

  useEffect(() => {
    setRole(JSON.parse(localStorage?.getItem("info"))?.role);
  }, [token]);

  const handleOpenLoginForm = () => {
    setIsOpenLoginForm(true);
    setIsOpenRegisterForm(false);
  };

  const handleOpenRegisterForm = () => {
    setIsOpenLoginForm(false);
    setIsOpenRegisterForm(true);
  };

  const checkLogin = async () => {
    let info = localStorage.getItem("info");
    if (info) {
      dispath({
        type: "INFO-USER",
        payload: JSON.parse(info),
      });
    }
  };

  const getCart = async () => {
    try {
      let info = JSON.parse(localStorage.getItem("info"));

      if (info) {
        const resp = await axios.get(`/api/cart/mycart/${info._id}`);

        if (resp.status === 200) {
          setCart(resp.data.listProduct);
          dispath({
            type: "MY-CART",
            payload: resp.data.listProduct,
          });
          dispath({
            type: "CART-ID",
            payload: resp.data._id,
          });
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setCart(myCart);
  }, [myCart]);

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
          <input type="text" placeholder="Tìm kiếm sản phẩm" />
          <button>Tìm kiếm</button>
        </form>
        <ul className="account-menu">
          {!token ? (
            <li>
              <NavLink>
                <span className="icon" onClick={showModal}>
                  <img
                    src="https://www.lotteria.vn/grs-static/images/icon-myaccount.svg"
                    alt=""
                  />
                </span>
              </NavLink>
            </li>
          ) : role === "user" ? (
            <li>
              <NavLink to="/profile">
                <span className="icon">
                  <img
                    src="https://www.lotteria.vn/grs-static/images/icon-myaccount.svg"
                    alt=""
                  />
                </span>
              </NavLink>
            </li>
          ) : (
            <li>
              <NavLink to="/admin">
                <span className="icon">
                  <img
                    src="https://www.lotteria.vn/grs-static/images/icon-myaccount.svg"
                    alt=""
                  />
                </span>
              </NavLink>
            </li>
          )}

          <li>
            <NavLink to="/profile/address">
              <span className="icon">
                <img
                  src="https://www.lotteria.vn/grs-static/images/icon-pos-2.svg"
                  alt=""
                />
              </span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/cart">
              <span className="icon">
                <img
                  src="https://www.lotteria.vn/grs-static/images/icon-cart.svg"
                  alt=""
                />
              </span>
              <span className="number">
                {cart && cart !== [] ? cart.length : 0}
              </span>
            </NavLink>
          </li>
        </ul>
        <Modal
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
                    type="email"
                    placeholder="abc@gmail.com"
                    onChange={onChangeEmail}
                  />
                </div>
                <div className="inp-account">
                  <label>Password</label>
                  <input
                    type="password"
                    placeholder="Nhập mật khẩu"
                    onChange={onChangePassword}
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
                    placeholder="abc@gmail.com"
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
