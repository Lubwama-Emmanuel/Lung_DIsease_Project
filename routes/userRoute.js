const express = require("express");
const router = express.Router();
const authController = require("../controller/authController");
const userController = require("../controller/userController");

router.post("/signUp", authController.signUp);
router.post("/logIn", authController.logIn);

router.get("/getUsers", authController.protect, userController.getUsers);
router.delete("/deleteUsers", userController.deleteAll);

module.exports = router;
