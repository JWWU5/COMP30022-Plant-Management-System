const { Plant } = require('./../models');

exports.displayPlantLibrary = async (req, res, next) => {
    var plants = await Plant.find().lean()
};

exports.list = async (req, res, next) => {
    const result = await Plant.find();
    res.status(200).json(result);
};
