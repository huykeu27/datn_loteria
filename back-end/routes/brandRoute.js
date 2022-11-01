const express = require("express");
const router = express.Router();
const Brand = require("../models/Brand");

//create brand
router.post("/create-brand", async (req, res) => {
  try {
    let brand = Brand.create({
      brandName: req.body.brandName,
      thump: req.body.thump,
    });
    res.json({ message: "Create brand success" });
  } catch (error) {
    res.json(error);
  }
});
//get all brand
router.get("/get-all-brand", (req, res) => {
  Brand.find()
    .then((brand) => res.json({ brand }))
    .catch((err) => res.json({ err }));
});
//get brand by id
router.get("/get-brand-by-id/:id", async (req, res) => {
  try {
    let brand = await Brand.findOne({ _id: req.params.id });
    res.json({ brand });
  } catch (error) {
    res.json(error);
  }
});
//update brand info
router.patch("/update-brand/:id", async (req, res) => {
  try {
    let brand = await Brand.findOneAndUpdate(
      { _id: req.params.id },
      {
        brandName: req.body.newbrandName,
        thump: req.body.newthump,
      }
    );
    res.json({ message: "Update info success" });
  } catch (error) {
    res.json(error);
  }
});
module.exports = router;
