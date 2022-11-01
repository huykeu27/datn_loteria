const User = require("../models/User");
const jwt = require("jsonwebtoken");
async function checkLogin(req, res, next) {
  try {
    const user = await User.findOne({ token: req.cookies.user });
    console.log(user);
    if (!user) return res.redirect("/login");
    const data = jwt.verify(req.cookies.user, "huy");
    console.log(7, data);
    console.log(userid);
    if (!user) return;
    res.redirect("/login");
    req.user = user;
    next();
  } catch (error) {
    if (error.message === "jwt expired") {
      await User.updateOne(
        { token: req.cookies.user },
        { $pull: { token: req.cookies.user } }
      );
      return res.redirect("/login");
    }
    res.status(500).json({ error, message: "server error" });
  }
}

function checkAdmin(req, res, next) {
  if (req.user.role !== "admin") return res.redirect("/login");
  next();
}
module.exports = { checkLogin, checkAdmin };
