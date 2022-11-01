const express = require("express");
const router = express.Router();
const Product = require("../models/Product");

//get all product
router.get("/get-all-product", (req, res) => {
  Product.find()
    .populate({ path: "brandId" })
    .populate({ path: "categoryId" })
    .then((listProducts) => res.json({ listProducts }))
    .catch((err) => res.json({ err }));
});
//create product
router.post("/create-product/", async (req, res) => {
  try {
    let data = await Product.findOne({ productName: req.body.productName });
    if (data) return res.json({ message: "wrong productName" });
    let product = await Product.create({
      productName: req.body.productName,
      brandId: req.body.brandId,
      categoryId: req.body.categoryId,
      thump: req.body.thump,
      listImg: req.body.img,
      sold: req.body.sold,
    });
    res.json({ product });
  } catch (error) {
    res.json(error);
  }
});
//get product by id
router.get("/get-one-product/:id", async (req, res) => {
  try {
    let product = await Product.findOne({ _id: req.params.id })
      .populate({ path: "brandId" })
      .populate({ path: "categoryId" });
    // if (!product) return res.json({ message: "No product with id" });
    res.json({ product });
  } catch (error) {
    res.json(error);
  }
});
//get product by categoryId
router.get("/get-product-by-category/:id", async (req, res) => {
  try {
    let product = await Product.find({ categoryId: req.params.id })
      .populate({ path: "brandId" })
      .populate({ path: "categoryId" });
    if (product.length === 0)
      return res.json({ message: "No products under this category" });
    res.json({ product });
  } catch (error) {
    res.json(error);
  }
});

//get product by brandId
router.get("/get-product-by-brand/:id", async (req, res) => {
  try {
    let listproduct = await Product.find({ brandId: req.params.id })
      .populate({ path: "brandId" })
      .populate({ path: "categoryId" });
    if (listproduct.length === 0)
      return res.json({ message: "No products under this brand" });
    res.json({ listproduct });
  } catch (error) {
    res.json(error);
  }
});

//find product by name

router.get("/get-product-by-name/:productName", async (req, res) => {
  try {
    let data = await Product.find({
      productName: { $regex: `${req.params.productName}`, $options: "i" },
    })
      .populate({ path: "brandId" })
      .populate({ path: "categoryId" });
    res.json({ data });
  } catch (error) {
    res.json(error);
  }
});

//add product thump
router.patch("/add-product-thump/:id", async (req, res) => {
  try {
    let product = await Product.findOneAndUpdate(
      { _id: req.params.id },
      { thump: req.body.newthump }
    );
    res.json({ message: "Add thumpp success" });
  } catch (error) {
    res.json(error);
  }
});

//delete product
router.delete("/delete-product/:id", async (req, res) => {
  try {
    let product = await Product.findOneAndRemove({ _id: req.params.id });
    if (!product) return res.json({ message: "Product not found" });
    res.json({ message: "Delete product success" });
  } catch (error) {
    res.json(error);
  }
});
module.exports = router;
