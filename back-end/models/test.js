const mongoose = require("mongoose");
const Brand = require("../models/Brand");
const Category = require("../models/Category");
mongoose.connect("mongodb://localhost/DATN");

const TestSchema = mongoose.Schema(
  {
    name: { type: String },
    img: {
      type: String,
      default:
        "https://protkd.com/wp-content/uploads/2017/04/default-image-720x530.jpg",
    },
    price: { type: Number, default: 0 },
  },

  { collection: "test" }
);
const Test = mongoose.model("test", TestSchema);
// Test.create(
//   {
//     name: "Burger Double Double",
//     img: "https://dscnnwjxnwl3f.cloudfront.net/media/catalog/product/b/u/burger-534x374px_ddouble-burger_1.png",
//     price: 59000,
//   },
//   {
//     name: "Burger Mozzarella",
//     img: "https://dscnnwjxnwl3f.cloudfront.net/media/catalog/product/b/u/burger-534x374px_mozzarella-burger_3.png",
//     price: 62000,
//   },
//   {
//     name: "Burger Tôm",
//     img: "https://dscnnwjxnwl3f.cloudfront.net/media/catalog/product/b/u/burger-534x374px_shrimp-burger_1.png",
//     price: 46000,
//   },
//   {
//     name: "Burger Gà Thượng Hạng",
//     img: "https://dscnnwjxnwl3f.cloudfront.net/media/catalog/product/b/u/burger-534x374px_chicken-burger_1.png",
//     price: 46000,
//   },
//   {
//     name: "Burger Bulgogi",
//     img: "https://dscnnwjxnwl3f.cloudfront.net/media/catalog/product/b/u/burger-534x374px_bulgogi-burger_1.png",
//     price: 45000,
//   }
// )
//   .then((product) => {
//     console.log(product);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

module.exports = Test;
