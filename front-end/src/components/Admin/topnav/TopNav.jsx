import React from "react";

import "./topnav.css";

import { Link } from "react-router-dom";

const curr_user = {
  display_name: "Admin Manager",
  image:
    "https://scontent.fhan3-3.fna.fbcdn.net/v/t1.6435-9/107641649_3307625566129420_5965389127428278500_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=174925&_nc_ohc=1if4Qk49cWMAX9x0HXx&_nc_ht=scontent.fhan3-3.fna&oh=00_AfCV0_mlP31FiKqxI7unVVqJWi7BzDh_Ik02ndz1HpbuEg&oe=638C10CE",
};

const renderUserToggle = (user) => (
  <div className="topnav__right-user">
    <div className="topnav__right-user__image">
      <img src={user.image} alt="" />
    </div>
    <div className="topnav__right-user__name">{user.display_name}</div>
  </div>
);

const Topnav = () => {
  return (
    <div className="topnav">
      <div className="topnav__search">
        <input type="text" placeholder="Search here..." />
        <i className="bx bx-search"></i>
      </div>
      <div className="topnav__right">
        <div className="topnav__right-item">{renderUserToggle(curr_user)}</div>
      </div>
    </div>
  );
};

export default Topnav;
