var User = require("../models/User");
var jwt = require("jsonwebtoken");
var bcrypt = require("bcrypt");
exports.checkLogin = async (email, password) => {
  var userFind = await User.findOne({
    email: email,
  });

  if (userFind) {
    let check = bcrypt.compare(password, userFind.password);
    if (check) {
      var accessToken = jwt.sign(
        {
          email: userFind.email,
        },
        "huy"
      );
      return {
        id: userFind._id,
        email: userFind.email,
        accessToken: accessToken,
      };
    } else {
      console.log(1);
    }
  } else {
    return null;
  }
};
