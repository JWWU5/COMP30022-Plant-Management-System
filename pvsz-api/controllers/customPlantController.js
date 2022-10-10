const { CustomPlant, User, PlantGroup } = require("../models");
const jwt = require("jsonwebtoken");
const jwtKey = "RANDOM-TOKEN";
const moment = require("moment");

exports.add = async (req, res, next) => {
    let token = req.get("Authorization");
    if (!token) {
        res.status(401).send({
            message: "Unauthenticated request",
        });
        return;
    }
    token = token.split("Bearer ")[1];
    jwt.verify(token, jwtKey, (err, decode) => {
        if (err) {
            res.status(401).send({
                message: "Unauthenticated request",
            });
        } else {
            let userId = decode.userId;
            let cusPlant = new CustomPlant(req.body);
            cusPlant.save(async (err, item) => {
                if (err) {
                    res.status(500).send("Exceptions in server");
                } else {
                    let itemId = item.id;
                    // add user customPlant
                    try {
                        let r1 = await User.updateOne(
                            {
                                _id: userId,
                            },
                            {
                                $push: {
                                    plantList: itemId,
                                },
                            });
                        let r2 = await PlantGroup.updateMany(
                            {
                                _id: req.body.groups,
                            },
                            {
                                $push: {
                                    plants: itemId,
                                },
                            }
                        )
                        res.json({
                            code: 200,
                        });
                    } catch (error) {
                        res.status(500).send("Exceptions in server");
                    }
                }
            })
        }
    });
}


exports.dels = async (req, res, next) => {
    let idsArr = req.body;
    let token = req.get("Authorization");
    if (!token) {
        res.status(401).send({
            message: "Unauthenticated request",
        });
        return;
    }
    token = token.split("Bearer ")[1];
    jwt.verify(token, jwtKey, async (err, decode) => {
        if (err) {
            res.status(401).send({
                message: "Unauthenticated request",
            });
        } else {
            let userId = decode.userId;

            try {
                let r1 = await User.updateOne(
                    {
                        _id: userId,
                    },
                    {
                        $pullAll: {
                            plantList: idsArr,
                        },
                    }
                );
                let r2 = await CustomPlant.deleteMany({
                    _id: { $in: idsArr },
                });
                for (const id of idsArr) {
                    let r3 = await PlantGroup.updateMany(
                        {
                            plants: id
                        },
                        {
                            $pull: {
                                plants: id,
                            },
                        }
                    );
                }
                res.json({
                    code: 200,
                });
            } catch (error) {
                res.status(500).send("Exceptions in server");
            }
        }
    });
};

exports.getPlant = async (req, res, next) => {

    let token = req.get("Authorization");
    if (!token) {
        res.status(401).send({
            message: "Unauthenticated request",
        });
        return;
    }
    token = token.split("Bearer ")[1];

    jwt.verify(token, jwtKey, async (err, decode) => {
        if (err) {
            res.status(401).send({
                message: "Unauthenticated request",
            });
        } else {
            let plantId = req.body.plantId;
            try {
                let plant = await CustomPlant.findById(plantId);
                let group = await PlantGroup.find({ plants: plantId });
                let groupname = group.map(doc => doc.groupname)
                res.json({
                    code: 200,
                    data: plant,
                    group: groupname,
                });
            } catch (error) {
                res.status(500).send("Exceptions in server query");
            }
        }
    });
};

exports.setCustomPlant = async (req, res, next) => {
    let token = req.get("Authorization");
    if (!token) {
        res.status(401).send({
            message: "Unauthenticated request",
        });
        return;
    }
    token = token.split("Bearer ")[1];
    jwt.verify(token, jwtKey, (err, decode) => {
        if (err) {
            res.status(401).send({
                message: "Unauthenticated request",
            });
        } else {
            let plantId = req.body.plantId;
            CustomPlant.findByIdAndUpdate(
                {
                    _id: plantId,
                },
                {
                    otherDetails: req.body.otherDetails,
                    image: req.body.plantImage,
                    name: req.body.plantName,
                },
                (err, doc) => {
                    if (err) {
                        res.status(500).send("Exceptions in server");
                        return;
                    }
                    res.status(201).send({
                        message: "User Changed Successfully",
                    });
                }
            );
        }
    });
};

exports.update = async (req, res, next) => {
    let { idsArr, type } = req.body;
    console.log("req.body = ", req.body)
    let setObj = {};
    let now = moment().format('YYYY-MM-DD');
    if (type == 'water') {
        setObj.lastWaterDate = now;
    }
    if (type == 'sun') {
        setObj.lastSunDate = now;
    }
    let token = req.get("Authorization");
    if (!token) {
        res.status(401).send({
            message: "Unauthenticated request",
        });
        return;
    }
    token = token.split("Bearer ")[1];
    jwt.verify(token, jwtKey, async (err, decode) => {
        if (err) {
            res.status(401).send({
                message: "Unauthenticated request",
            });
        } else {
            try {
                let result = await CustomPlant.updateMany({ "_id": { $in: idsArr } }, { $set: setObj })
                res.json({
                    code: 200,
                    result
                });
            } catch (error) {
                res.status(500).send("Exceptions in server");
            }
        }
    });
};