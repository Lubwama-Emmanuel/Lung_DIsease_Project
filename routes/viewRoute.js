const express = require('express');
const router = express.Router();
const viewController = require('../controller/viewController')

router.get('/logIn', viewController.logIn)
router.get('/signUp', viewController.signUp)

module.exports = router;