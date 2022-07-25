const express = require("express");
const router = express.Router();
const authController = require("../controller/authController");
const viewController = require("../controller/viewController");

router.post("/signUp", authController.signUp);
router.post("/signIn", authController.signIn);

module.exports = router;
