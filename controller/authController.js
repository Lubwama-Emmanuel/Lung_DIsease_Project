const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const catchAsync = require("../utils/catchAsync");

const signToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

exports.signUp = catchAsync(async (req, res, next) => {
  const user = await User.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
  });
  const token = signToken(user._id);
  res.status(201).json({
    status: "success",
    token,
    data: {
      user,
    },
  });
});

exports.signIn = catchAsync(async (req, res, next) => {
  const { email, password } = await User.find(req.body);
  
  if (!email || !password) {
    return next(new AppError("Please provide your Email and Password", 400));
  }
  // check if user exists
  const user = await User.findOne({ email }).select("+password");

  if (!user || !(await correctPassword(password, user.password))) {
    return next(new AppError("Incorrect email or password", 401));
  }
  const token = signToken(user._id);
  res.status(201).json({
    status: "Success",
    token,
  });
});
