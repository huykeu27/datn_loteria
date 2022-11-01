require("dotenv").config();
const express = require("express");
const userRoute = require("./route/userRoute");
const brandRoute = require("./route/brandRoute");
const categoryRoute = require("./route/categoryRoute");
const productRoute = require("./route/productRoute");
const indexRoute = require("./route/indexRoute");
const cookiParser = require("cookie-parser");
const path = require("path");
const app = express(); //khoi tao app

app.use("/public", express.static(path.join(__dirname, "./public")));
//setup body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.raw({ extended: true }));
app.use(cookiParser());
//

app.use("", indexRoute);
app.use("/user", userRoute);
app.use("/brand", brandRoute);
app.use("/category", categoryRoute);
app.use("/product", productRoute);
app.listen(process.env.PORT || 4000, () => {
  console.log(process.env.PORT || 4000);
});
