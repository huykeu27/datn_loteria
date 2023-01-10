import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./sidebar.css";
import sidebar_items from "../../../assets/JSONdata/sidebar_routes.json";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { Modal } from "antd";
import { ExclamationCircleFilled } from "@ant-design/icons";
const SidebarItem = (props) => {
  const active = props.active ? "active" : "";

  return (
    <div className="sidebar__item">
      <div className={`sidebar__item-inner ${active}`}>
        <i className={props.icon}></i>
        <span>{props.title}</span>
      </div>
    </div>
  );
};

const Sidebar = (props) => {
  const { confirm } = Modal;
  const navigate = useNavigate();
  const dispath = useDispatch();
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
    <div className="sidebar">
      <div className="sidebar__logo">
        <NavLink to="/">
          <img
            src="https://www.lotteria.vn/grs-static/images/lotteria_logo.svg"
            alt="company logo"
          />
        </NavLink>
      </div>
      {sidebar_items.map((item, index) => (
        <NavLink to={item.route} key={index}>
          <SidebarItem title={item.display_name} />
        </NavLink>
      ))}
      <div onClick={clearCookies}>
        <SidebarItem title="Log out" />
      </div>
    </div>
  );
};

export default Sidebar;
