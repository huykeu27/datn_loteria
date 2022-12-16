var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var bodyParser = require("body-parser");
var app = express();
var indexRouter = require("./routes/indexRoute");
var userRouter = require("./routes/userRoute");
var productRouter = require("./routes/productRoute");
var categoryRouter = require("./routes/categoryRoute");
var cartRouter = require("./routes/cartRoute");
var orderRoute = require("./routes/orderRoute");

const cors = require("cors");
// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use("/public", express.static(path.join(__dirname, "public")));
// app.use(express.static(path.join(__dirname, "public")));
app.use(logger("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use(cors());
// app.use('/users', usersRouter);
app.use("/", indexRouter);
app.use("/user", userRouter);
app.use("/product", productRouter);
app.use("/category", categoryRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRoute);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
});

module.exports = app;
