const express = require("express");
var User = require("../models/User");
var jwt = require("jsonwebtoken");
var bcrypt = require("bcrypt");

exports.checkLogin = async (req, res, next) => {
  try {
    const user = await User.findOne({ token: req.cookies.accessToken });
    if (!user) return res.redirect("/");
    next();
  } catch (error) {
    res.status(500).json({ error, mess: "server error" });
  }
};

exports.checkLogin = async (req, res, next) => {
  const userCookie = req.cookies["accessToken"];
  if (!userCookie) return res.redirect("/");
  req = userCookie;
  next();
};
