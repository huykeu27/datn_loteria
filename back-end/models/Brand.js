const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/DATN");

const BrandSchema = mongoose.Schema(
  {
    brandName: { type: String, default: "NoBrand" },
    thump: {
      type: String,
      default:
        "https://protkd.com/wp-content/uploads/2017/04/default-image-720x530.jpg",
    },
  },
  { timestamps: true },
  { collection: "brands" }
);
const Brand = mongoose.model("brands", BrandSchema);

// Brand.create({})
//   .then((data) => {
//     console.log(data);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

module.exports = Brand;
