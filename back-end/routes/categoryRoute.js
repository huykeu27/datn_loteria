const express = require("express");
const router = express.Router();
const Category = require("../models/Category");
var ObjectId = require("mongodb").ObjectId;
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

//update
router.put("/update-category/:id", async (req, res) => {
  try {
    const category = await Category.findOne({ _id: req.params.id });
    if (category) {
      if (!req.body.categoryName) {
        return res.status(400).json({ errcode: 1, message: "Value null" });
      } else {
        let check = await Category.findOne({
          categoryName: req.body.categoryName,
        });
        if (check) {
          return res.status(400).json({ errcode: 2, message: "da ton tai" });
        } else {
          let update = await category.update({
            categoryName: req.body.categoryName,
          });
          res.status(200).json(update);
        }
      }
    }
    // const category = await Category.findByIdAndUpdate(req.params.id, {
    //   categoryName: req.body.categoryName,
    // });
    // let check = await Category.findOne({
    //   categoryName: category.categoryName,
    // });
    // if (check) {
    //   res
    //     .status(400)
    //     .json({ errcode: 2, message: "Ten danh muc da ton tai" });
    // } else {
    //   res.json("success");
    // }
  } catch (error) {
    res.json({ error });
  }
});
//delete category

router.delete("/delete-category/:id", async (req, res) => {
  try {
    let category = await Category.findOne({ _id: req.params.id });
    if (category) {
      await category.remove();
      res.json("success");
    }
  } catch (error) {
    console.log(0);
    res.json({ error });
  }
});

module.exports = router;
