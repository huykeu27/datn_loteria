import React from "react";
import profile_item from "../../../assets/JSONdata/profile-user.json";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import "./profile.css";
import { toast } from "react-toastify";
import { Modal } from "antd";
import { ExclamationCircleFilled } from "@ant-design/icons";
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

const Profile = (props) => {
  const selector = useSelector((state) => state);
  const dispath = useDispatch();
  const userinfo = selector.userinfo;
  const navigate = useNavigate();
  const { confirm } = Modal;
  function clearCookies() {
    confirm({
      title: "Bạn muốn đăng xuất???",
      icon: <ExclamationCircleFilled />,
      okText: "Xác nhận",
      cancelText: "Hủy",
      onOk() {
        var cookies = document.cookie.split(";");
        for (var i = 0; i < cookies.length; i++) {
          var cookie = cookies[i];
          var eqPos = cookie.indexOf("=");
          var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
          document.cookie =
            "user=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        }
        localStorage.removeItem("info");
        dispath({
          type: "INFO-USER",
          payload: null,
        });
        toast.success("Đăng xuất thành công");
        navigate("/");
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  }
  return (
    <div className="profile_content">
      <div className="content-main">
        <div className="profile_menu">
          <div className="avatar">
            <div className="f-name"></div>
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
            <a>
              <div className="profile_item" onClick={clearCookies}>
                <div className="profile_item-inner ">
                  <img
                    src="https://www.lotteria.vn/grs-static/images/icon-logout-white.svg"
                    alt=""
                  />
                  <span>Đăng xuất</span>
                </div>
              </div>
            </a>
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
