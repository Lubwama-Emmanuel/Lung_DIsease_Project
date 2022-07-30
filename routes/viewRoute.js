const express = require("express");
const router = express.Router();
const viewController = require("../controller/viewController");
const authController = require("../controller/authController");

router.get("/logIn", viewController.logIn);
router.get("/signUp", viewController.signUp);
router.get("/test", viewController.test);

router.get("/dashboard", authController.isLoggedIn, viewController.home);

module.exports = router;
