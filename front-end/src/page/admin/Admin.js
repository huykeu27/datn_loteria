import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../../components/Admin/sideBar/SideBar";
import Topnav from "../../components/Admin/topnav/TopNav";
function Admin() {
  return (
    <>
      <Topnav />
      <Sidebar />
      <Outlet />
    </>
  );
}

export default Admin;
