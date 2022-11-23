const express = require("express");
const router = express.Router();
const Category = require("../models/Category");
const multer = require("multer");

let fs = require("fs");
//upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    //Xu li save file
    cb(null, "./public/imagesCategory");
  },
  filename: function (req, file, cb) {
    //update ten file
    const uniqueSuffix = "loteria" + "-" + Math.round(Math.random() * 1e9);
    cb(null, `${uniqueSuffix}_${file.originalname}`);
  },
});
const upload = multer({ storage: storage });
//get all category
router.get("/get-all-category", (req, res) => {
  Category.find()
    .then((listCategories) => res.json({ listCategories }))
    .catch((err) => res.json({ err }));
});

router.post(
  "/create-category",
  upload.single("categorythump"),
  async (req, res) => {
    try {
      console.log(72, req.file);
      console.log(71, req.body.categoryName);

      if (!req.body.categoryName || !req.file) {
        return res.status(400).json({ message: "Value null", errcode: 1 });
      } else {
        let data = await Category.findOne({
          categoryName: req.body.categoryName,
        });

        if (data) {
          return res.status(400).json({ message: "Already exist", errcode: 2 });
        } else {
          let newcategory = await Category.create({
            categoryName: req.body.categoryName,
            imageUrl: `${process.env.SERVER_NAME}/public/imagesCategory/${req.file.filename}`,
          });
          res.status(200).json({
            newcategory,
            message: "Create category success",
            errcode: 0,
          });
        }
      }
    } catch (error) {
      res.status(404).json(error);
    }
  }
);

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
router.put(
  "/update-category/:id",
  upload.single("categorythump"),
  async (req, res) => {
    try {
      const category = await Category.findOne({ _id: req.params.id });
      if (category) {
        if (!req.body.categoryName) {
          return res.status(400).json({ errcode: 1, message: "Value null" });
        } else {
          let check = await Category.findOne({
            categoryName: req.body.categoryName,
            enable: req.body.enable,
            imageUrl: `${process.env.SERVER_NAME}/public/imagesCategory/${req.file.filename}`,
          });
          if (check) {
            return res
              .status(400)
              .json({ errcode: 2, message: "Already exist" });
          } else {
            let update = await category.update({
              categoryName: req.body.categoryName,
              imageUrl: `${process.env.SERVER_NAME}/public/imagesCategory/${req.file.filename}`,
              enable: req.body.enable,
            });
            res.status(200).json(update);
          }
        }
      }
    } catch (error) {
      res.status(400).json({ error });
    }
  }
);
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
