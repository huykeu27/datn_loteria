import React from "react";
import profile_item from "../../assets/JSONdata/profile-user.json";
import { NavLink, Outlet } from "react-router-dom";

import "./profile.css";
const ProfileItem = (props) => {
  const active = props.active ? "active" : "";

  return (
    <div className="profile_item">
      <div className={`profile_item-inner ${active}`}>
        <span>{props.title}</span>
      </div>
    </div>
  );
};
const Profile = (props) => {
  return (
    <div className="profile_content">
      <div className="content-main">
        <div className="profile_menu">
          <div className="avatar">
            <img
              src="https://www.lotteria.vn/grs-static/images/lotteria_logo.svg"
              alt="company logo"
            />
            <div>
              <span>name</span>
            </div>
          </div>
          <div className="nav-menu">
            {profile_item.map((item, index) => (
              <NavLink to={item.route} key={index}>
                <ProfileItem title={item.display_name} />
              </NavLink>
            ))}
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
