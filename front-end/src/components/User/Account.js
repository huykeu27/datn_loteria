import React from "react";

function Account() {
  return (
    <div className="profile-container">
      <div className="my-account">
        <div className="account-left">
          <div className="l-avata">
            <div className="name">K</div>
            <div className="fullname"></div>
          </div>
          <div className="l-menu">
            <ul>
              <li>
                <a href="">Thông tin tài khoản</a>
              </li>
              <li>
                <a href="">Địa chỉ giao hàng</a>
              </li>
              <li>
                <a href="">Đăng xuất</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="account-right">
          <h2 className="head-title">Thông tin tài khoản</h2>
          <div className="account-content">
            <div className="acc-info-form">
              <form action="">
                <h5>Thông tin cá nhân</h5>
                <div className="form-group"></div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Account;
