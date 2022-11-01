const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/DATN");

const CategorySchema = mongoose.Schema(
  {
    categoryName: String,
    thump: String,
    enable: { type: Boolean, default: true },
  },
  { timestamps: true },
  { collection: "category" }
);
const Category = mongoose.model("category", CategorySchema);
Category.create(
  {
    categoryName: "Burger",
    thump:
      "https://www.lotteria.vn/media/catalog/tmp/category/Promotion-04_1.jpg",
  },
  {
    categoryName: "Gà rán",
    thump:
      "https://www.lotteria.vn/media/catalog/tmp/category/BG-Menu-Chicken-01-01_1.jpg",
  },
  {
    categoryName: "Cơm-Mì Ý",
    thump:
      "https://www.lotteria.vn/media/catalog/tmp/category/Promotion-08_1.jpg",
  },
  {
    categoryName: "Thức ăn nhẹ",
    thump:
      "https://www.lotteria.vn/media/catalog/tmp/category/BG-Menu-09_1.jpg",
  },
  {
    categoryName: "Thức uống",
    thump:
      "https://www.lotteria.vn/media/catalog/tmp/category/Promotion-10_1.jpg",
  }
)
  .then((data) => {
    console.log(data);
  })
  .catch((err) => {
    console.log(err);
  });
module.exports = Category;
