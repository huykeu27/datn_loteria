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
        "huy",
        { expiresIn: 3000 }
      );
      return {
        id: userFind._id,
        email: userFind.email,
        fullName: userFind.fullName,
        dateOfBirth: userFind.dateOfBirth,
        phoneNumber: userFind.phoneNumber,
        address: userFind.address,
        accessToken: accessToken,
        role: userFind.role,
      };
    }
  } else {
    return null;
  }
};

// exports.checkToken = async (accessToken) => {
//   let user = jwt.verify(accessToken, "huy");
//   console.log(user);
//   if (user) {
//     return { user };
//   } else {
//     return null;
//   }
// };
