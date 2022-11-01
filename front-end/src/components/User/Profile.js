import React from "react";

function Profile() {
  return (
    <div className="profile-container">
      <div className="my-account">
        <div className="account-left"></div>
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

export default Profile;
