const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/DATN");

const CategorySchema = mongoose.Schema(
  {
    categoryName: String,
    image: String,
    enable: { type: Boolean, default: true },
  },
  { timestamps: true },
  { collection: "category" }
);
const Category = mongoose.model("category", CategorySchema);
// Category.create({
//   categoryName: "Gà rán",
//   image:
//     "https://www.lotteria.vn/media/catalog/tmp/category/BG-Menu-Chicken-01-01_1.jpg",
// })
//   .then((data) => {
//     console.log(data);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

module.exports = Category;
