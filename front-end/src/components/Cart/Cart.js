import React from "react";
import "../Cart/cart.css";
import { useDispatch, useSelector } from "react-redux";

import {
  CaretDownOutlined,
  CaretUpOutlined,
  CloseOutlined,
} from "@ant-design/icons";
function Cart() {
  const selector = useSelector((state) => state);
  const dispath = useDispatch();
  const cartProducts = selector.cartProducts;
  function removeItem(id) {
    alert("Bạn có muốn xóa hết sản phẩm khỏi giỏ hàng");
    dispath({ type: "REMOVE_FROM_CART", payload: id });
  }
  function clearCart() {
    alert("bạn có muốn xóa hết sản phẩm");
    dispath({ type: "CLEAR_CART", payload: "" });
  }
  function incrementProduct(id) {
    dispath({ type: "INCREMENT_PRODUCT", payload: { id, increment: 1 } });
  }
  function decrementProduct(id, quantity) {
    quantity <= 1
      ? removeItem(id)
      : dispath({ type: "DECREMENT_PRODUCT", payload: { id, increment: 1 } });
  }
  console.log(cartProducts);
  return (
    <div className="cart">
      {cartProducts.length > 0 ? (
        cartProducts.map((item, index) => (
          <div className="cartItem" key={item._id}>
            <div className="cartItemImg">
              <img src={item.imageUrl} alt="" />
            </div>
            <div className="cartItemInfo">
              <h3>{item.name}</h3>
            </div>
            <div className="cartItemQuantity">
              <span>{item.quantity}</span>
              <div className="group-btn">
                <button
                  className="btn-updown"
                  onClick={() => incrementProduct(item._id, item.quantity)}
                >
                  <CaretUpOutlined />
                </button>
                <button
                  className="btn-updown"
                  onClick={() => decrementProduct(item._id, item.quantity)}
                >
                  <CaretDownOutlined />
                </button>
              </div>
            </div>
            <div className="cartItemPrice">
              <h3>Giá: {item.price.toLocaleString()}đ</h3>
              <h2 color="red">
                Tổng: {(item.price * item.quantity).toLocaleString()}đ
              </h2>
            </div>
            <div className="removeCartItem">
              <button
                className="btn-updown"
                onClick={() => removeItem(item._id)}
              >
                <CloseOutlined />
              </button>
            </div>
          </div>
        ))
      ) : (
        <h2>Cart is empty</h2>
      )}
      {cartProducts.length > 0 ? (
        <div>
          <button className="pay">Thanh toán</button>
          <button className="pay cancle " onClick={() => clearCart()}>
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
