const express = require("express");
const { checkLogin, checkAdmin } = require("../middleware/auth");
const jwt = require("jsonwebtoken");
const router = express.Router();
const User = require("../models/User");
var authService = require("../middleware/auth");

// bcript;
let hashUserPassword = (password) => {
  const bcrypt = require("bcrypt");
  const saltRounds = 10;
  return bcrypt.hash(password, saltRounds);
};

//create account
router.post("/create-account", async (req, res) => {
  try {
    if (!req.body.fullname || !req.body.email || !req.body.password) {
      return res
        .status(400)
        .json({ message: "Vui long dien day du thong tin", errcode: 1 });
    } else {
      let data = await User.findOne({ email: req.body.email });
      if (data) {
        return res
          .status(400)
          .json({ message: "Email already exist", errcode: 2 });
      } else {
        const { fullname, email, password } = req.body;
        let passwordHash = await hashUserPassword(req.body.password);
        let account = await User.create({
          fullName: req.body.fullname,
          email: req.body.email,
          password: passwordHash,
        });
        res.json({ message: "Tao tai khoan thanh cong", account, errcode: 0 });
      }
    }
  } catch (error) {
    res.json(error);
  }
});

//login
router.post("/sign-in", async function (req, res, next) {
  try {
    if (!req.body.email || !req.body.password) {
      return res
        .status(400)
        .json({ message: "Thieu email hoac password", errcode: 1 });
    }
    let data = await authService.checkLogin(req.body.email, req.body.password);

    if (data) {
      //push token vào db
      await User.updateOne(
        { _id: data.id },
        { $push: { token: data.accessToken } }
      );
      return res.json({ data, errcode: 0 });
    } else {
      return res
        .status(400)
        .json({ message: "Wrong email or password", errcode: 2 });
    }
    // checkrole()
  } catch (error) {
    return res.status(500).json("Khong the dang nhap");
  }
});

//get all user
router.get("/get-all-user", async (req, res) => {
  try {
    const listuser = await User.find();
    res.json(listuser);
  } catch (error) {
    res.json(error);
  }
});
//check

//change password
router.patch("/update-password", async (req, res) => {
  await User.updateOne(
    { _id: req.cookies.user },
    { password: req.body.newPass }
  );
  res.status(200).json({ message: "Change password success" });
});
//get user by name
router.get("/get-user-by-name/:email", async (req, res) => {
  try {
    let data = await User.find({
      username: { $regex: `${req.params.username}`, $options: "i" },
    });
    res.json({ data });
  } catch (error) {
    res.json(error);
  }
});

//get self info
router.get("/get-self-info", async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.cookies.user });
    if (!user) res.redirect("/login");
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ error, message: "server error" });
  }
});
//remove user

router.delete("/remove-user/:id", async (req, res) => {
  try {
    let user = await User.findOne({ _id: req.params.id });
    if (user) {
      await user.remove();
      res.json("success");
    }
  } catch (error) {
    res.json({ error });
  }
});
module.exports = router;
