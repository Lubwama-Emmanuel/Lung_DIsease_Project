const User = require("../models/userModel");
const catchAsync = require('../utils/catchAsync')

exports.getUsers = catchAsync(async (req, res, next) => {
  console.log('we here')
  const users = await User.find();
  res.status(200).json({
    status: "success",
    data: {
      users,
    },
  });
});
exports.deleteAll = catchAsync(async(req, res, next) =>{
  const users = await User.deleteMany();
  res.status(200).json({
    status: 'Success'
  })
})