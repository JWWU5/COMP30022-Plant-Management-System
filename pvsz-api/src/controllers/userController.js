const { User } = require("./../models");

// 注册
exports.register = async (req, res, next) => {
    console.log(req.body, "data");
    const userModel = new User(req.body);
    const result = await userModel.save();
    res.status(201).json(result);
};

exports.list = async (req, res, next) => {
    const result = await User.find();
    res.status(200).json(result);
};
