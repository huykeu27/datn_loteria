var express = require("express");
var router = express.Router();
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    //Xu li save file
    cb(null, "./public/images");
  },
  filename: function (req, file, cb) {
    //update ten file
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, `${uniqueSuffix}_${file.originalname}`);
  },
});

const upload = multer({ storage: storage });
/* GET home page. */

router.post("/", upload.single("myfile"), function (req, res, next) {
  console.log(req.file, req.body);
  res.json("ok");
});
module.exports = router;
