const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/DATN");
const User = require("../models/User");
const Product = require("../models/Product");
const CartSchema = mongoose.Schema(
  {
    userId: { type: String, ref: "user" },
    listProduct: [
      {
        productId: { type: String, ref: "products" },
        price: { type: Number, ref: "products" },
        quantity: { type: Number },
      },
    ],
  },
  { timestamps: true },
  { collection: "carts" }
);
const Cart = mongoose.model("carts", CartSchema);
