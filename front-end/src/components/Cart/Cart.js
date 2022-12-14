import React, { useEffect, useState } from "react";
import "../Cart/cart.css";
import { useDispatch, useSelector } from "react-redux";
import axios from "../../config/axios";
import {
  CaretDownOutlined,
  CaretUpOutlined,
  CloseOutlined,
  ExclamationCircleFilled,
} from "@ant-design/icons";
import { Empty, Modal } from "antd";
import { NavLink } from "react-router-dom";

function Cart() {
  const selector = useSelector((state) => state);
  const dispath = useDispatch();
  const CartID = selector.CartID;
  const userinfo = selector.userinfo;
  const [myCart, setCart] = useState([]);
  const { confirm } = Modal;
  const removeItem = (productId) => {
    confirm({
      title: "Xóa sản phẩm khỏi giỏ hàng???",
      icon: <ExclamationCircleFilled />,
      // content: "Some descriptions",
      okText: "Xác nhận",
      cancelText: "Hủy",
      onOk() {
        axios
          .patch(`/api/cart/remove-product/${userinfo._id}`, {
            productId: productId,
          })
          .then((response) => {
            console.log(response);
            dispath({
              type: "MY-CART",
              payload: response.data.listProduct,
            });
            getCart();
          })
          .catch((error) => {
            console.log(error);
          });
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };
  const clearCart = (CartID) => {
    confirm({
      title: "Xóa toàn bộ sản phẩm khỏi giỏ hàng???",
      icon: <ExclamationCircleFilled />,
      okText: "Xác nhận",
      cancelText: "Hủy",
      onOk() {
        axios
          .delete(`/api/cart/clear/${CartID}`)
          .then(() => {
            getCart();
          })
          .catch((err) => {
            console.log(err);
          });
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };
  const getCart = async () => {
    let info = JSON.parse(localStorage.getItem("info"));

    if (info) {
      const resp = await axios.get(`/api/cart/mycart/${info._id}`);
      setCart(resp.data.listProduct);
      dispath({
        type: "MY-CART",
        payload: resp.data.listProduct,
      });
    }
  };
  const increase = async (id) => {
    await axios.patch(`/api/cart/increase/${userinfo._id}`, {
      productId: id,
    });
    getCart();
  };
  const decrement = async (id, quantity) => {
    const resp = await axios.patch(`/api/cart/decrement/${userinfo._id}`, {
      productId: id,
      quantity: quantity,
    });
    console.log(resp);
    getCart();
  };
  useEffect(() => {
    getCart();
  }, []);
  return (
    <div className="cart">
      {myCart && myCart.length > 0 ? (
        myCart.map((item, index) => (
          <div className="cartItem" key={item._id}>
            <div className="cartItemImg">
              <img src={item.productId.imageUrl} alt="" />
            </div>
            <div className="cartItemInfo">
              <h3>{item.productId.name}</h3>
            </div>
            <div className="cartItemQuantity">
              <span id={`quantity${item.productId._id}`}>{item.quantity}</span>
              <div className="group-btn">
                <button
                  className="btn-updown"
                  onClick={() => increase(item.productId._id)}
                >
                  <CaretUpOutlined />
                </button>
                <button
                  className="btn-updown"
                  onClick={() => decrement(item.productId._id, item.quantity)}
                >
                  <CaretDownOutlined />
                </button>
              </div>
            </div>
            <div className="cartItemPrice">
              <h3>
                Giá:{" "}
                {Intl.NumberFormat("vi-VN", {
                  style: "currency",
                  currency: "VND",
                }).format(item.productId.price)}
              </h3>
              <h2>
                Thành tiền:{" "}
                {Intl.NumberFormat("vi-VN", {
                  style: "currency",
                  currency: "VND",
                }).format(item.productId.price * item.quantity)}
              </h2>
            </div>
            <div className="removeCartItem">
              <button
                className="btn-updown"
                onClick={() => removeItem(item.productId._id)}
              >
                <CloseOutlined />
              </button>
            </div>
          </div>
        ))
      ) : (
        <Empty
          description="Rất tiếc giỏ hàng bạn chưa có gì cả"
          image="https://img.freepik.com/premium-vector/plastic-shopping-basket-doodle-style-sketch-illustration-hand-drawn-vector-shopping-cart_231873-7169.jpg?w=2000"
        />
      )}
      {myCart.length > 0 ? (
        <div>
          <NavLink to={"/checkout/cart"}>
            <button className="pay">Thanh toán</button>
          </NavLink>
          <button className="pay cancle " onClick={() => clearCart(CartID)}>
            Hủy bỏ
          </button>
        </div>
      ) : (
        <>{null}</>
      )}
    </div>
  );
}

export default Cart;
