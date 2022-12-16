const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/DATN");

const CartSchema = mongoose.Schema(
  {
    userId: { type: String, ref: "user" },
    listProduct: [
      {
        productId: { type: String, ref: "product" },
        quantity: { type: Number, default: 1 },
      },
    ],
  },
  { timestamps: true },
  { collection: "carts" }
);
const Cart = mongoose.model("carts", CartSchema);
module.exports = Cart;
