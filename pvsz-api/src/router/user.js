const express = require('express');
const router = express.Router();
const userController = require('.././controllers/userController');

router.post('/register', userController.register)
router.post('/login', userController.login)
router.post('/getUserinfo', userController.getUserinfo)
 
module.exports = router;
