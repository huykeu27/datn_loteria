const express = require("express");
const router = express.Router();
const Order = require("../models/Order");
const Cart = require("../models/Cart");

//get all list order
router.get("/list", async (req, res) => {
  try {
    let order = await Order.find({ status: false });
    res.json(order);
  } catch (error) {
    res.json(error);
  }
});
//get order list waiting

router.get("/waiting/:id", async (req, res) => {
  try {
    let order = await Order.find({ cartId: req.params.id, status: false });
    res.json(order);
  } catch (error) {
    res.json(error);
  }
});
//get order list success
router.get("/success/:id", async (req, res) => {
  try {
    let order = await Order.find({ cartId: req.params.id, status: true });
    res.json(order);
  } catch (error) {
    res.json(error);
  }
});

//new order
router.post("/neworder", async (req, res) => {
  try {
    let order = await Order.create({
      userId: req.body.userId,
      listProducts: req.body.listProducts,
      total: req.body.total,
      address: req.body.address,
    });
    res.json(order);
  } catch (error) {
    res.status(400).json(error);
  }
});
module.exports = router;
