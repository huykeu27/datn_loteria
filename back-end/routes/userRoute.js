const express = require("express");
const { checkLogin, checkAdmin } = require("../middleware/auth");
const jwt = require("jsonwebtoken");
const router = express.Router();
const User = require("../models/User");

//create account
router.post("/create-account/", async (req, res) => {
  try {
    let data = await User.findOne({ username: req.body.username });
    if (data) return res.json({ message: "wrong user" });
    const { username, password } = req.body;
    let account = await User.create({
      username,
      password,
    });
    res.json({ account });
  } catch (error) {
    res.json(error);
  }
});

//login
router.post("/sign-in", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username, password });
    if (!user)
      return res.status(400).json({ message: "wrong username or password" });
    const token = jwt.sign({ id: user._id }, "huy", { expiresIn: 30 });
    await User.updateOne({ _id: user._id }, { $push: { token: token } });
    res.status(200).json({ message: "Login success", token });
  } catch (error) {
    res.status(500).json({ error, message: "server error" });
  }
});

//get all user
router.get("/get-all-user", checkLogin, checkAdmin, async (req, res) => {
  try {
    const data = User.find();
    res.json({ data });
  } catch (error) {
    res.json(error);
  }
});
//check

//change password
router.patch("/update-password", checkLogin, async (req, res) => {
  await User.updateOne(
    { _id: req.cookies.user },
    { password: req.body.newPass }
  );
  res.status(200).json({ message: "Change password success" });
});
//get user by name
router.get("/get-user-by-name/:username", async (req, res) => {
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

module.exports = router;
