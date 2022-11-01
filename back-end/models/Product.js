const mongoose = require("mongoose");
const Brand = require("../models/Brand");
const Category = require("../models/Category");
mongoose.connect("mongodb://localhost/DATN");

const ProductSchema = mongoose.Schema(
  {
    productName: { type: String },
    brandId: { type: String, ref: "brands" },
    categoryId: { type: String, ref: "category" },
    thump: {
      type: String,
      default:
        "https://protkd.com/wp-content/uploads/2017/04/default-image-720x530.jpg",
    },
   
    price: { type: Number, default: 0 },
    totalStorage: { type: Number, default: 0 },
    sold: { type: Number, default: 0 },
    public: { type: Boolean, default: true },
  },
  { timestamps: true },
  { collection: "product" }
);
const Product = mongoose.model("product", ProductSchema);

module.exports = Product;
