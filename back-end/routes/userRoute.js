const express = require("express");
const { checkLogin, checkAdmin } = require("../middleware/auth");
const jwt = require("jsonwebtoken");
const router = express.Router();
const User = require("../models/User");
var userService = require("../service/userService");
const bcrypt = require("bcrypt");
// bcript;
let hashUserPassword = (password) => {
  const bcrypt = require("bcrypt");
  const saltRounds = 10;
  return bcrypt.hash(password, saltRounds);
};

//create account
router.post("/create-account", async (req, res) => {
  try {
    if (!req.body.fullName || !req.body.email || !req.body.password) {
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
        const { fullName, email, password } = req.body;
        let passwordHash = await hashUserPassword(req.body.password);
        let account = await User.create({
          fullName: req.body.fullName,
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
    console.log(req.body.email, req.body.password);
    let data = await userService.checkLogin(req.body.email, req.body.password);

    if (data) {
      //push token vào db
      await User.updateOne({ _id: data._id }, { token: data.accessToken });
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

//change password
router.patch("/change-pass", async (req, res) => {
  try {
    let userFind = await User.findOne({
      email: req.body.email,
    });

    if (userFind) {
      let check = await bcrypt.compare(req.body.passwordold, userFind.password);
      if (check) {
        let passwordHash = await hashUserPassword(req.body.passwordnew);
        let updatepassword = await userFind.updateOne({
          password: passwordHash,
        });
        if (updatepassword) {
          res.json("update thanh cong");
        }
      } else {
        res.status(400).json({ errcode: 1, message: "Sai mật khẩu cũ" });
      }
    }
  } catch (error) {
    res.json({ error, message: "loi roi" });
  }
});
//get all user
router.get("/get-all-user", async (req, res) => {
  try {
    const listuser = await User.find({ role: "user" });
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
//get user by id
////api/category/:id

router.get("/me/:id", async (req, res) => {
  try {
    let user = await User.findOne({ _id: req.params.id });

    res.json({ user });
  } catch (error) {
    res.json({ error });
  }
});
//get address

router.get("/address/:id", async (req, res) => {
  try {
    let user = await User.findOne({
      _id: req.params.id,
    });
    res.json(user);
  } catch (error) {
    res.json(error);
  }
});
//add address
router.post("/address/:id", async (req, res) => {
  try {
    let user = await User.findOneAndUpdate(
      { _id: req.params.id },
      { $push: { address: req.body.address } }
    );

    res.json(user);
  } catch (error) {
    res.json(error);
  }
});

//delete address

router.patch("/remove-address/:id", async (req, res) => {
  try {
    console.log(req.params.id, req.body.address);
    let user = await User.findOneAndUpdate(
      { _id: req.params.id },
      {
        $pull: { address: req.body.address },
      }
    );
    res.json(user);
  } catch (error) {
    res.json(error);
  }
});

//update info user

router.patch("/update-info/:id", async (req, res) => {
  try {
    console.log(req.params.id, req.body);

    let user = await User.findOne({ _id: req.params.id });
    if (user) {
      let update = await user.update({
        fullName: req.body.fullName,
        phoneNumber: req.body.phoneNumber,
        dateOfBirth: req.body.dateOfBirth,
      });
      res.status(200).json({ message: "ok" });
    }
  } catch (error) {
    res.json(error);
  }
});

module.exports = router;
