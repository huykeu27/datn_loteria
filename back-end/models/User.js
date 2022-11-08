const mongoose = require("mongoose");
require("../config/connectDB");
mongoose.connect("mongodb://localhost/DATN");
const UserSchema = mongoose.Schema(
  {
    email: String,
    password: String,
    fullName: String,
    phoneNumber: Number,
    birthDay: Date,
    address: [{ type: String }],
    token: [],
    status: { type: Boolean, default: true },
  },
  { collection: "user" }
);

const User = mongoose.model("user", UserSchema);
// User.create({
//   email: "huyph2711@gmail.com",
//   password: "123",
//   fullName: "pham quoc huy",
// })
//   .then((data) => {
//     console.log(data);
//   })
//   .catch((err) => {
//     console.log(err);
//   });
module.exports = User;
