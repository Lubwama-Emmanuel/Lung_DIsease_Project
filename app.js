const path = require("path");
const express = require("express");
const logger = require("morgan");

const AppError = require("./utils/appError");
const errorHandler = require("./controller/errorHandler");
const userRoute = require("./routes/userRoute");
const viewRoute = require("./routes/viewRoute");

const app = express();

app.use(express.static(path.join(__dirname, "public")));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(express.json());
app.use(logger('dev'));

// app.get('/', (req, res) => {
//   res.render('logIn')
// })

app.use("/api/v1/fyp/", userRoute);
app.use("/api/v1/views/", viewRoute);

app.all("*", (req, res, next) => {
  return next(
    new AppError(`This route ${req.originalUrl} is not defined`, 404)
  );
});
app.use(errorHandler);
module.exports = app;
