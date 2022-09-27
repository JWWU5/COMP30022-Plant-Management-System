const { Plant } = require('./../models');

exports.list = async (req, res, next) => {
    const result = await Plant.find();
    res.status(200).json({
        data: result,
        code: 200
    });
};
