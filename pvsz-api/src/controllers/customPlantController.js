const {
    CustomPlant,
    User
} = require('../models');
const jwt = require("jsonwebtoken");
const jwtKey = 'RANDOM-TOKEN';

exports.add = async (req, res, next) => {
    let token = req.get('Authorization');
    if (!token) {
        res.status(401).send({
            message: "Unauthenticated request",
        });
        return;
    }
    token = token.split('Bearer ')[1];
    jwt.verify(token, jwtKey, (err, decode) => {
        if (err) {
            res.status(401).send({
                message: "Unauthenticated request",
            });
        } else {
            let userId = decode.userId;
            console.log("body = ", req.body)
            let cusPlant = new CustomPlant(req.body);
            cusPlant.save((err, item) => {
                if (err) {
                    res.status(500).send('Exceptions in server');
                } else {
                    console.log("item = ", item.id)
                    let itemId = item.id;
                    // add user customPlant
                    User.updateOne({
                        '_id': userId
                    }, {
                        '$push': {
                            plantList: itemId
                        }
                    }, (err, doc) => {
                        if (err) {
                            res.status(500).send('Exceptions in server');
                            return
                        }

                        res.json({
                            code: 200,
                        })
                        console.log(doc)
                    })
                }
            });
        }
    })
};

exports.dels = async (req, res, next) => {
    let idsArr = req.body;
    let token = req.get('Authorization');
    if (!token) {
        res.status(401).send({
            message: "Unauthenticated request",
        });
        return;
    }
    token = token.split('Bearer ')[1];
    jwt.verify(token, jwtKey, async (err, decode) => {
        if (err) {
            res.status(401).send({
                message: "Unauthenticated request",
            });
        } else {
            let userId = decode.userId;
            // add user customPlant
            User.updateOne({
                '_id': userId
            }, {
                '$pullAll': {
                    plantList: idsArr
                }
            }, (err, doc) => {
                if (err) {
                    res.status(500).send('Exceptions in server');
                    return
                }
                res.json({
                    code: 200,
                })
                console.log(doc)
            })
        }
    })
};