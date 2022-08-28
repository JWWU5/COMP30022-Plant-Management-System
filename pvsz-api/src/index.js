const express = require('express');
const cors = require('cors');

const mongoose = require('mongoose');

const app = express();
app.use(cors());
// 接收json数据
app.use(express.json());
// 可以接受表单数据
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.json({ code: 0, message: '成功11111' });
});

// 处理全部的路由
app.use('/api/v1', require('./router'));

app.listen(5000, () => {
  console.log('服务器已经启动:localhost:5000');
});
