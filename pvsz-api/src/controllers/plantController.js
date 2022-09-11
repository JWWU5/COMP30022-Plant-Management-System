const { Plant } = require('./../models');

exports.register = async (req, res, next) => {
  console.log(req.body, 'data');
  const plantModel = new Plant(req.body);
  const result = await plantModel.save();
  res.status(201).json(result);
};

exports.list = async (req, res, next) => {
  const result = await Plant.find();
  res.status(200).json(result);
};
