const { PlantGroup, User } = require("../models");

const jwt = require("jsonwebtoken");
const jwtKey = "RANDOM-TOKEN";

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
            let plantGroup = new PlantGroup(req.body);
            plantGroup.save((err, item) => {
                if (err) {
                    res.status(500).send("Exceptions in server");
                } else {
                    let itemId = item.id;
                    // add user plant group
                    User.updateOne(
                        {
                            _id: userId,
                        },
                        {
                            $push: {
                                groups: itemId,
                            },
                        },
                        (err, doc) => {
                            if (err) {
                                res.status(500).send("Exceptions in server");
                                return;
                            }

                            res.json({
                                code: 200,
                                data: plantGroup,
                            });
                        }
                    );
                }
            });
        }
    });
};

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
                            groups: idsArr,
                        },
                    }
                );
                let r2 = await PlantGroup.deleteMany({
                    _id: { $in: idsArr },
                });
                res.json({
                    code: 200,
                });
            } catch (error) {
                res.status(500).send("Exceptions in server");
            }
        }
    });
};
exports.addPlantToGroup = async (req, res, next) => {
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
            PlantGroup.updateOne(
                {
                    _id: req.body.groupId,
                },
                {
                    $push: {
                        plants: { $each: req.body.plants },
                    },
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

exports.getPlantGroupList = async (req, res, next) => {
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
            let groupId = req.body.groupId;
            try {
                let plants = await PlantGroup.findById(groupId).populate(
                    "plants"
                );

                res.json({
                    code: 200,

                    data: plants,
                });
            } catch (error) {
                res.status(500).send("Exceptions in server query");
            }
        }
    });
};

exports.delPlantInGroup = async (req, res, next) => {
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
            PlantGroup.updateOne(
                {
                    _id: req.body.groupId,
                },
                {
                    $pullAll: {
                        plants: req.body.idsArr,
                    },
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

exports.changeLiked = async (req, res, next) => {
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
            PlantGroup.findByIdAndUpdate(
                {
                    _id: req.body.groupId,
                },
                {
                    like: req.body.like,
                },
                (err, doc) => {
                    if (err) {
                        res.status(500).send("Exceptions in server");
                        return;
                    }
                    res.status(201).send({
                        message: "liked Changed Successfully",
                    });
                }
            );
        }
    });
};

exports.update = async (req, res, next) => {
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
            PlantGroup.findByIdAndUpdate(
                {
                    _id: req.body.groupId,
                },
                {
                    groupname: req.body.groupname,
                },
                (err, doc) => {
                    if (err) {
                        res.status(500).send("Exceptions in server");
                        return;
                    }
                    res.status(201).send({
                        message: "update Successfully",
                    });
                }
            );
        }
    });
};
