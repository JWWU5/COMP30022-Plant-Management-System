const express = require('express');
const router = express.Router();
const userController = require('./../controllers/userController');

// 使用验证器
router
  .post('/register', userController.register) // 注册用户
  .get('/', userController.list); // 用户列表
// 对外导出
module.exports = router;
