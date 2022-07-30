const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const User = require("../models/userModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/AppError");

const signToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);

  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  if (process.env.NODE_ENV === "production") cookieOptions.secure = true;

  res.cookie("jwt", token, cookieOptions);

  // Remove password from output
  user.password = undefined;

  res.status(statusCode).json({
    status: "success",
    token,
    data: {
      user,
    },
  });
};
exports.signUp = catchAsync(async (req, res, next) => {
  if (!req.body) {
    console.log("Failed");
    return next(new AppError("Please provide body ", 400));
  }
  const newUser = await User.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
  });
  createSendToken(newUser, 201, res);
});

exports.logIn = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  // 1) Check if user provided email and password

  if (!email || !password) {
    return next(new AppError("Please provide your Email and Password", 400));

  }
  // check if user exists
  const user = await User.findOne({ email }).select('+password')
  const correct = await user.correctPassword(password, user.password);
  
  if (!user || !correct) {
    return next(new AppError("Incorrect email or password", 400));
  }
  const userResponse = await User.findOne({ email })
  createSendToken(userResponse, 201, res);
});

exports.protect = catchAsync(async (req, res, next) => {
  // 1) Checking if the token exists in the headers
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = await req.headers.authorization.split(" ")[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }
  if (!token) {
    return next(new AppError("You are Not Logged in", 400));
  }
  // 2) Verifying the token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  const currentUser = await User.findById(decoded.id);

  if (!currentUser) {
    return next(
      new AppError("The User belonging to this token nolonger exists", 404)
    );
  }

  req.user = currentUser;
  next();
});

exports.isLoggedIn = catchAsync(async (req, res, next) => {
  if (req.cookies.jwt) {
    // 1) Verifying if token on the cookie is valid
    const decoded = await promisify(jwt.verify)(
      req.cookies.jwt,
      process.env.JWT_SECRET
    );

    // 2) Check if user still exists
    const currentUser = await User.findById(decoded.id);
      console.log(currentUser)
    if (!currentUser) {
      return next();
    }

    // 3) Giving the templates access to the user details
    res.locals.user = currentUser;
    return next();
  }
  next();
});
