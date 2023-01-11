const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/DATN");

const OrderSchema = mongoose.Schema(
  {
    userId: { type: String },
    listProducts: [],
    total: { type: Number },
    address: { type: String },
    status: { type: Boolean, default: false },
  },
  { timestamps: true },
  { collection: "order" }
);
const Order = mongoose.model("order", OrderSchema);

module.exports = Order;
