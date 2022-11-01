const express = require("express");

const router = express.Router();
const path = require("path");

router.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "../view/login.html"));
});
router.get("/trangchu", (req, res) => {
  res.sendFile(path.join(__dirname, "../view/trangchu.html"));
});

module.exports = router;
