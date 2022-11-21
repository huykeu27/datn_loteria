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

const Sidebar = (props) => {
  return (
    <div className="sidebar">
      <div className="sidebar__logo">
        <img
          src="https://www.lotteria.vn/grs-static/images/lotteria_logo.svg"
          alt="company logo"
        />
      </div>
      {sidebar_items.map((item, index) => (
        <NavLink to={item.route} key={index}>
          <SidebarItem title={item.display_name} />
        </NavLink>
      ))}
    </div>
  );
};

export default Sidebar;
