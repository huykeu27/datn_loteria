import React from "react";
import "./order.css";
import { NavLink, Outlet } from "react-router-dom";
function Order() {
  return (
    <div className="order-content">
      <h2 className="head-title">Lịch sử đơn hàng</h2>
      <div className="account-content">
        <div className="tab-account" id="history">
          <NavLink to={"/profile/order/waiting"}>
            <div className="history-item waiting">
              <h1>Đang xử lý</h1>
            </div>
          </NavLink>
          <NavLink to={"/profile/order/success"}>
            <div className="history-item paid">
              <h1>Đã hoàn thành</h1>
            </div>
          </NavLink>
        </div>
        <div className="acc-history">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Order;
