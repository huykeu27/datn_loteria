const express = require("express");
const router = express.Router();
const Product = require("../models/Product");
const Category = require("../models/Category");
//get all product
router.get("/get-all-product", (req, res) => {
  Product.find()
    .populate({ path: "categoryId" })
    .then((listProducts) => res.json({ listProducts }))
    .catch((err) => res.json({ err }));
});
//create product
router.post("/create-product/", async (req, res) => {
  try {
    if (!req.body.name || !req.body.categoryId || req.body.price === 0) {
      return res.status(400).json({ message: "Value null", errCode: 1 });
    } else {
      let data = await Product.findOne({
        name: req.body.name,
        categoryId: req.body.categoryId,
      });
      if (data)
        return res
          .status(400)
          .json({ message: "Wrong product name", errCode: 2 });
      let product = await Product.create({
        name: req.body.name,
        categoryId: req.body.categoryId,
        price: req.body.price,
        image: req.body.image,
      });
      res.status(200).json({ product });
    }
  } catch (error) {
    res.json(error);
  }
});
//get product by id
router.get("/get-one-product/:id", async (req, res) => {
  try {
    let product = await Product.findOne({ _id: req.params.id }).populate({
      path: "categoryId",
    });
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

//find product by name
router.get("/get-product-by-name/:productName", async (req, res) => {
  try {
    let data = await Product.find({
      productName: { $regex: `${req.params.productName}`, $options: "i" },
    }).populate({ path: "categoryId" });
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
    let product = await Product.findOne({ _id: req.params.id });
    if (product) {
      await product.remove();
      res.json("success");
    }
  } catch (error) {
    res.json({ error });
  }
});

//update product
router.put("/update-product/:id", async (req, res) => {
  try {
    const product = await Product.findOne({ _id: req.params.id });
    if (product) {
      if (!req.body.name || req.body.price === 0) {
        return res.status(400).json({ errcode: 1, message: "Value null" });
      } else {
        let check = await Product.findOne({
          name: req.body.name,
          price: req.body.price,
        });
        if (check) {
          return res.status(400).json({ errcode: 2, message: "Already exist" });
        } else {
          let update = await product.update({
            name: req.body.name,
            price: req.body.price,
          });
          res.status(200).json(update);
        }
      }
    }
  } catch (error) {
    res.status(400).json({ error });
  }
});
module.exports = router;
