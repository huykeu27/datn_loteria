const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/DATN");

const CategorySchema = mongoose.Schema(
  {
    categoryName: String,
    imageUrl: String,
    enable: { type: Boolean, default: true },
  },
  { timestamps: true },
  { collection: "category" }
);
const Category = mongoose.model("category", CategorySchema);

module.exports = Category;
