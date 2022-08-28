const mongoose = require('mongoose');

const main = async () => {
  await mongoose.connect(
    'mongodb+srv://ZhenchenWan:wanzhenchen1021@cluster0.4kw9qmj.mongodb.net/PvsZ?retryWrites=true&w=majority',
    { useNewUrlParser: true, useUnifiedTopology: true }
  );
};

main()
  .then((res) => {
    console.log('mongodb连接成功');
  })
  .catch((err) => {
    console.log('mongodb连接失败');
  });

module.exports = {
  User: mongoose.model('User', require('./user'), 'user'),
  Plant: mongoose.model('Plant', require('./plant'), 'plant'),
};
