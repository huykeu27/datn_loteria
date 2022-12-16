import React from "react";
import { NavLink } from "react-router-dom";
import "./sidebar.css";
import sidebar_items from "../../../assets/JSONdata/sidebar_routes.json";

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
function clearCookies() {
  alert("Đăng xuất à???");
  var cookies = document.cookie.split(";");
  for (var i = 0; i < cookies.length; i++) {
    var cookie = cookies[i];
    var eqPos = cookie.indexOf("=");
    var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
    document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
  }
  localStorage.removeItem("role");
}
const Sidebar = (props) => {
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
      <NavLink to={"/"} onClick={clearCookies}>
        <SidebarItem title="Log out" />
      </NavLink>
    </div>
  );
};

export default Sidebar;
