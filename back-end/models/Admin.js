const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/DATN");

const AdminSchema = mongoose.Schema(
  {
    username: { type: String, default: "admin" },
    password: { type: String, default: "admin" },
    role: { type: String },
  },
  { collection: "admin" }
);

const Admin = mongoose.model("admin", AdminSchema);
