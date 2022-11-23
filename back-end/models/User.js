const mongoose = require("mongoose");
require("../config/connectDB");
mongoose.connect("mongodb://localhost/DATN");
const UserSchema = mongoose.Schema(
  {
    email: String,
    password: String,
    fullName: String,
    phoneNumber: Number,
    dateOfBirth: { type: Date, default: 1 / 1 / 1990 },
    address: [{ type: String }],
    role: { type: String, default: "user" },
    token: [],
    status: { type: Boolean, default: true },
  },
  { collection: "user" }
);

const User = mongoose.model("user", UserSchema);
// User.create({
//   email: "user",
//   password: "user",
//   fullName: "user",
// })
//   .then((data) => {
//     console.log(data);
//   })
//   .catch((err) => {
//     console.log(err);
//   });
module.exports = User;
