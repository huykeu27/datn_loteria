const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/DATN");
const ProductSchema = mongoose.Schema(
  {
    name: {
      type: String,
      require: [true, "Please Enter product Name"],
    },
    categoryId: {
      type: String,
      ref: "category",
      require: [true, "Please Enter product category"],
    },
    price: {
      type: Number,
      require: [true, "Please Enter product price"],
      default: 0,
    },
    imageUrl: {
      type: String,
      require: [true, "Please Enter product image"],
      default: "12ew",
    },
    quantity: {
      type: Number,
      default: 1,
    },
  },
  { timestamps: true },
  { collection: "product" }
);
const Product = mongoose.model("product", ProductSchema);
// Product.updateMany({
// })
//   .then((data) => {
//     console.log(data);
//   })
//   .catch((err) => {
//     console.log(err);
//   });
module.exports = Product;
