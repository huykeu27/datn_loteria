const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/DATN");

const UserSchema = mongoose.Schema(
  {
    username: { type: String },
    password: String,
    email: { type: String, default: "abc@gmail.com" },
    avatar: {
      type: String,
      default:
        "https://thumbs.dreamstime.com/z/default-avatar-profile-vector-user-profile-default-avatar-profile-vector-user-profile-profile-179376714.jpg",
    },
    phone: { type: Number, default: 0 },
    address: { type: String, default: "" },
    token: [],
    role: { type: String, default: "user" },
  },
  { collection: "user" }
);

const User = mongoose.model("user", UserSchema);

module.exports = User;
