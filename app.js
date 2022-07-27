const path = require("path");
const express = require("express");
const logger = require("morgan");
const cors = require("cors");

const errorHandler = require("./controller/errorHandler");
const AppError = require("./utils/AppError");
const userRoute = require("./routes/userRoute");
const viewRoute = require("./routes/viewRoute");

const app = express();

app.use(express.static(path.join(__dirname, "public")));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(cors());
app.use(express.json());
app.use(logger("dev"));

app.use("/api/v1/fyp/", userRoute);
app.use("/api/v1/views/", viewRoute);

app.all("*", (req, res, next) => {
  next(
    new AppError(`Can't find ${req.originalUrl} End point on this server!`, 404)
  );
  // res.status(404).json({
  //   status: "End point not found!",
  //   message: req.originalUrl,
  // });
});
app.use((err, req, res, next) => {
  console.log(err.stack);
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "Error";

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
});

// app.use(errorHandler);
module.exports = app;
