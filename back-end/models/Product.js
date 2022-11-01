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
    image: {
      type: String,
      require: [true, "Please Enter product image"],
      default: "12ew",
    },
  },
  { timestamps: true },
  { collection: "product" }
);
const Product = mongoose.model("product", ProductSchema);
// Product.create({
//   name: "Gà HS",
//   categoryId: "6360d728bd49e85fce8d84f1",
//   price: 56000,
//   image:
//     "https://dscnnwjxnwl3f.cloudfront.net/media/catalog/product/5/3/534x374px_hs-1.png",
// })
//   .then((data) => {
//     console.log(data);
//   })
//   .catch((err) => {
//     console.log(err);
//   });
module.exports = Product;
