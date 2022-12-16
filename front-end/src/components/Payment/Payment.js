import React, { useEffect, useState } from "react";
import "./payment.css";
import axios from "../../config/axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
function Payment() {
  const navigate = useNavigate();
  const selector = useSelector((state) => state);
  const CartID = selector.CartID;
  const userId = JSON.parse(localStorage.getItem("info")).id;
  const [myCart, setCart] = useState([]);

  const getCart = async () => {
    let info = localStorage.getItem("info");
    if (info) {
      const resp = await axios.get(`/api/cart/mycart/${JSON.parse(info).id}`);
      setCart(resp.data.listProduct);
    }
  };
  let sum = 0;
  myCart.forEach((element) => {
    sum += element.quantity * element.productId.price;
  });

  useEffect(() => {
    getCart();
  }, []);
  const handlePayment = async () => {
    const resp = await axios.post(`/api/order/neworder`, {
      userId: userId,
      listProducts: myCart,
      total: sum,
      address: "123",
    });
    if (resp.status === 200) {
      let clearCart = await axios.delete(`/api/cart/clear/${CartID}`);
      console.log(clearCart);
    }
    alert("Vui lòng chờ xác nhận đơn hàng");
    navigate("/profile/order");
  };
  return (
    <div className="payment_content">
      <div className="payment_content_left">
        <div className="payment_title">
          <h1>YOUR CART</h1>
        </div>
        {myCart.map((item) => {
          return (
            <div className="payment_item" key={item._id}>
              <div className="payment_item_img">
                <img src={item.productId.imageUrl} alt="" />
              </div>
              <div className="payment_item_info">
                <h1>{item.productId.name}</h1>
                <h1>
                  {Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(item.productId.price)}
                </h1>
              </div>
              <div className="payment-item-quantity">
                <h1>SL:{item.quantity}</h1>
              </div>
            </div>
          );
        })}
      </div>
      <div className="payment-content_right">
        <div className="box-border">
          <div className="payment_delivery">
            <span>Giao hàng đến</span>
            <div className="add">
              113 Chiến Thắng, P. Văn Quán, Hà Đông, Hà Nội, Vietnam
            </div>
          </div>
          <div className="note-time">
            Thời gian tiếp nhận đơn hàng trực tuyến từ <br />
            08:30 đến 21:00 hằng ngày
          </div>
        </div>
        <div className="payment_pay">
          <div className="box-border">
            <div className="sub-title">
              <div className="lbl">Tổng cộng</div>
              <div className="price">
                {Intl.NumberFormat("vi-VN", {
                  style: "currency",
                  currency: "VND",
                }).format(sum)}
              </div>
            </div>
            <div className="shiping-fee">
              <div className="lbl">Phí giao hàng</div>
              <div className="price">
                {Intl.NumberFormat("vi-VN", {
                  style: "currency",
                  currency: "VND",
                }).format(0)}
              </div>
            </div>
            <div className="total">
              <div className="lbl">Tạm tính</div>
              <div className="price">
                {Intl.NumberFormat("vi-VN", {
                  style: "currency",
                  currency: "VND",
                }).format(sum)}
              </div>
            </div>
            <div className="btn-payment">
              <button type="button" title="Tiếp tục" onClick={handlePayment}>
                Tiếp tục
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment;
