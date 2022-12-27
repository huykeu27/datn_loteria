import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function PrivateRouter({ children, sigin }) {
  const selector = useSelector((state) => state);
  const userinfo = selector.userinfo;

  let login = false;
  if (sigin === "/login") {
    if (userinfo && userinfo.role === "user") {
      login = true;
    }
  } else if (sigin === "/login-admin") {
    if (userinfo && userinfo.role === "admin") {
      login = true;
    }
  }
  return login ? children : <Navigate to="/" />;
}

export default PrivateRouter;
