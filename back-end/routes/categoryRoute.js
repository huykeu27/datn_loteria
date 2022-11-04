const express = require("express");
const router = express.Router();
const Category = require("../models/Category");
//get all category
router.get("/get-all-category", (req, res) => {
  Category.find()
    .then((listCategories) => res.json({ listCategories }))
    .catch((err) => res.json({ err }));
});
//create category
router.post("/create-category", async (req, res) => {
  if (!req.body.categoryName) {
    return res.status(400).json({ message: "Categoryname null", errcode: 1 });
  }
  try {
    let data = await Category.findOne({
      categoryName: req.body.categoryName,
    });
    if (data) {
      return res.status(400).json({ errcode: 2, message: "Category none" });
    } else {
      let newcategory = await Category.create({
        categoryName: req.body.categoryName,
      });
      res.status(200).json({ message: "Create category success", errcode: 0 });
    }
  } catch (error) {
    res.json(error);
  }
});

//get category by id
router.get("/get-category-by-id/:id", async (req, res) => {
  try {
    let category = await Category.findOne({ _id: req.params.id });
    res.json({ category });
  } catch (error) {
    res.json(error);
  }
});

//change category name
router.patch("/change-category-name/:id", async (req, res) => {
  try {
    let category = await Category.findOneAndUpdate(
      { _id: req.params.id },
      {
        categoryName: req.body.newCategoryname,
      }
    );
    res.json({ message: "Update categoryname success" });
  } catch (error) {
    res.json(error);
  }
});

//change category thump
router.patch("/change-category-thump/:id", async (req, res) => {
  try {
    let category = await Category.findOneAndUpdate(
      { _id: req.params.id },
      {
        thump: req.body.newthump,
      }
    );
    res.json({ message: "Update thump success" });
  } catch (error) {
    res.json(error);
  }
});

module.exports = router;
