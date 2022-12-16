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

// Order.create({
//   cartId: "638e3440373b45e037d03e54",
//   total: 1,
//   address: "abc",
// })
//   .then((data) => {
//     console.log(data);
//   })
//   .catch((err) => {
//     console.log(err);
//   });
module.exports = Order;
