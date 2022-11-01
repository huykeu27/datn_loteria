var User = require("../models/User");
var jwt = require("jsonwebtoken");

exports.checkLogin = async (email, password) => {
  var userFind = await User.findOne({
    email: email,
    password: password,
  });

  if (userFind) {
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
    return null;
  }
};
