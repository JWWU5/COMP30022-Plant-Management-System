const { Plant } = require('./../models');

exports.list = async (req, res, next) => {
    try {
        const result = await Plant.find();
        res.status(200).json({
            data: result,
            code: 200
        });
    } catch (error) {
        res.status(500).send("Exceptions in server query");
    }

};
