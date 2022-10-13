const express = require("express");
const router = express.Router();
const userController = require(".././controllers/userController");

router.post("/register", userController.register);
router.post("/login", userController.login);
router.post("/getUserInfo", userController.getUserInfo);
router.post("/setUserInfo", userController.setUserInfo);
router.post("/changePassword", userController.changePassword);
router.post("/dels", userController.dels);

module.exports = router;
