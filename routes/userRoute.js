const express = require("express");
const router = express.Router();
const authController = require("../controller/authController");

router.post("/signUp", authController.signUp);
router.post("/logIn", authController.logIn);

module.exports = router;
