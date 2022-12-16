import React, { useEffect, useState } from "react";
import profile_item from "../../assets/JSONdata/profile-user.json";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, Outlet } from "react-router-dom";
import axios from "../../config/axios";
import "./profile.css";

const ProfileItem = (props) => {
  const active = props.active ? "active" : "";

  return (
    <div className="profile_item">
      <div className={`profile_item-inner ${active}`}>
        <img src={props.icon} alt="" />
        <span>{props.title}</span>
      </div>
    </div>
  );
};
function clearCookies() {
  alert("Đăng xuất chứ ?");
  var cookies = document.cookie.split(";");
  for (var i = 0; i < cookies.length; i++) {
    var cookie = cookies[i];
    var eqPos = cookie.indexOf("=");
    var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
    document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
  }
  localStorage.removeItem("info");
}
const Profile = (props) => {
  const dispath = useDispatch();
  const selector = useSelector((state) => state);
  const userinfo = selector.userinfo;
  const myCart = selector.myCart;
  // const fname = userinfo.fullName.slice(0, 1).toUpperCase();
  return (
    <div className="profile_content">
      <div className="content-main">
        <div className="profile_menu">
          <div className="avatar">
            <div className="f-name">{userinfo.fname}</div>
            <div className="f-fullname">
              <span>{userinfo.fullName}</span>
            </div>
            <div className="f-point">
              <span>0 Điểm</span>
            </div>
          </div>
          <div className="nav-menu">
            {profile_item.map((item, index) => (
              <NavLink to={item.route} key={index}>
                <ProfileItem title={item.display_name} icon={item.icon} />
              </NavLink>
            ))}
            <NavLink to={"/"}>
              <div className="profile_item" onClick={clearCookies}>
                <div className="profile_item-inner ">
                  <img
                    src="https://www.lotteria.vn/grs-static/images/icon-logout-white.svg"
                    alt=""
                  />
                  <span>Đăng xuất</span>
                </div>
              </div>
            </NavLink>
          </div>
        </div>
        <div className="account-content-right">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Profile;
