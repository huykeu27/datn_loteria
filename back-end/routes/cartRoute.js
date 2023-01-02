const express = require("express");
const router = express.Router();
const Cart = require("../models/Cart");

//tạo giỏ hàng default
router.post("/default", async (req, res) => {
  try {
    let userCart = await Cart.findOne({ userId: req.body.id });
    if (!userCart) {
      let cart = await Cart.create({
        userId: req.body.id,
        listProduct: [],
      });
      res.json(cart);
    } else {
      res.json(userCart);
    }
  } catch (error) {
    res.json({ error, message: "Gio hang da ton tai" });
  }
});
//lấy về giở hàng của người dùng đang đăng nhập
router.get("/mycart/:id", async (req, res) => {
  try {
    const mycart = await Cart.findOne({ userId: req.params.id })
      //   .populate({
      //     path: "userId",
      //   })
      .populate({ path: "listProduct.productId" });
    res.json(mycart);
  } catch (error) {
    res.json(error);
  }
});
//them san pham vao gio hang
router.patch("/add-product/:id", async (req, res) => {
  try {
    const myCart = await Cart.findOne({ userId: req.params.id });
    if (myCart) {
      let check = await Cart.findOne({
        listProduct: { $elemMatch: { productId: req.body.productId } },
      });
      // res.json(check);
      if (!check) {
        let update = await myCart
          .updateOne({
            $push: { listProduct: { productId: req.body.productId } },
          })
          .populate({ path: "listProduct.productId" });
      }

      res.json(myCart);
    }
  } catch (error) {
    res.json({ error });
  }
});

///xóa sản phẩm khỏi giỏ hàng

router.patch("/remove-product/:id", async (req, res) => {
  try {
    const data = await Cart.findOneAndUpdate(
      { userId: req.params.id },
      { $pull: { listProduct: { productId: req.body.productId } } },
      { safe: true, multi: false }
    );
    res.status(200).json(data);
  } catch (error) {
    res.json(error);
  }
});
//tăng số lượng
router.patch("/increase/:id", async (req, res) => {
  try {
    let cart = await Cart.updateOne(
      { userId: req.params.id, "listProduct.productId": req.body.productId },
      { $inc: { "listProduct.$.quantity": 1 } }
    );
    res.json(cart);
  } catch (error) {
    res.json(error);
  }
});
//giam so luong
router.patch("/decrement/:id", async (req, res) => {
  try {
    let quantity = req.body.quantity;
    if (quantity > 1) {
      let cart = await Cart.updateOne(
        { userId: req.params.id, "listProduct.productId": req.body.productId },
        { $inc: { "listProduct.$.quantity": -1 } }
      );
      res.json(cart);
    }
  } catch (error) {
    res.json(error);
  }
});
//clear cart
router.delete("/clear/:id", async (req, res) => {
  try {
    let updateCart = await Cart.updateOne(
      { _id: req.params.id },
      { $set: { listProduct: [] } },
      { multi: true }
    );
    res.json(updateCart);
  } catch (error) {
    res.json(error);
  }
});
//db.yourCollectionName.update({}, { $set : {"yourFieldName": [] }} , {multi:true} );
module.exports = router;
