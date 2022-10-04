const { CustomPlant, User, PlantGroup, Plant } = require("../models");
const jwt = require("jsonwebtoken");
const jwtKey = "RANDOM-TOKEN";
const mongoose = require("mongoose");

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
            console.log("body = ", req.body);
            let cusPlant = new CustomPlant(req.body);
            cusPlant.save(async(err, item) => {
                if (err) {
                    res.status(500).send("Exceptions in server");
                } else {
                    console.log("item = ", item.id);
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
                res.json({
                    code: 200,
                });
            } catch (error) {
                res.status(500).send("Exceptions in server");
            }

            // // add user customPlant
            // User.updateOne({
            //     '_id': userId
            // }, {
            //     '$pullAll': {
            //         plantList: idsArr
            //     }
            // }, (err, doc) => {
            //     if (err) {
            //         res.status(500).send('Exceptions in server');
            //         return
            //     }
            //     // res.json({
            //     //     code: 200,
            //     // })
            //     console.log(doc)
            //     CustomPlant.deleteMany({
            //         _id: {$in: idsArr}
            //     }, (err, doc) => {
            //         if (err) {
            //             res.status(500).send('Exceptions in server');
            //             return
            //         }
            //         res.json({
            //             code: 200,
            //         })
            //         console.log(doc)
            //     })
            // })
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
            console.log(req.body);
            let plantId = req.body.plantId;

            try {
                let plant = await CustomPlant.findById(plantId);

                res.json({
                    code: 200,

                    data: plant,
                });
            } catch (error) {
                res.status(500).send("Exceptions in server query");
            }
        }
    });
};