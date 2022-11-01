const express = require("express");

const router = express.Router();
const path = require("path");

router.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "../views/login.html"));
});
router.get("/trangchu", (req, res) => {
  res.sendFile(path.join(__dirname, "../views/trangchu.html"));
});

module.exports = router;
