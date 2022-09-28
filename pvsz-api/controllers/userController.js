const { User } = require("./../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const jwtKey = "RANDOM-TOKEN";
const mongoose = require("mongoose");

exports.register = async (req, res, next) => {
    console.log(req.body, "data");
    let user = await User.findOne({
        email: req.body.email,
    });
    console.log("user = ", user);
    if (user) {
        res.status(500).send({
            message: "The mailbox already exists",
        });
        return;
    }
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        console.log(hashedPassword, "after hashing");
        const user = new User({
            image: req.body.image,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            userId: req.body.userName,
            dateOfBirth: req.body.birthdayDate,
            email: req.body.email,
            password: hashedPassword,
        });
        const result = await user.save();
        console.log(result, "register result");
        res.status(201).send({
            message: "User Created Successfully",
            result,
        });
    } catch (e) {
        console.log(e, "fail");
        res.status(200).json({
            code: 1,
            message: "register fail",
        });
    }
};

exports.login = async (req, res, next) => {
    console.log(req.body, "data");
    User.findOne({
        email: req.body.email,
    })
        // if email exists
        .then((user) => {
            // compare the password entered and the hashed password found
            console.log("user8888 = ", user);
            bcrypt
                .compare(req.body.password, user.password)

                // if the passwords match
                .then((passwordCheck) => {
                    // check if password matches
                    if (!passwordCheck) {
                        return res.status(400).send({
                            message:
                                "Login failed! Please check your email and password.",
                            error,
                        });
                    }
                    //   create JWT token
                    const token = jwt.sign(
                        {
                            userId: user._id,
                            userName: user.userName,
                        },
                        jwtKey,
                        {
                            expiresIn: "24h",
                        }
                    );

                    //   return success response
                    res.status(200).send({
                        message: "Login Successful",
                        userName: user.userName,
                        token,
                    });
                })
                // catch error if password does not match
                .catch((error) => {
                    res.status(400).send({
                        message:
                            "Login failed! Please check your email and password.",
                        error,
                    });
                });
        })
        // catch error if email does not exist
        .catch((e) => {
            res.status(404).send({
                message: "Login failed! Please check your email and password.",
            });
        });
};

exports.getUserInfo = async (req, res, next) => {
    let token = req.get("Authorization");
    if (!token) {
        res.status(401).send({
            message: "Unauthenticated request",
        });
        return;
    }
    token = token.split("Bearer ")[1];
    console.log("token = ", token);
    jwt.verify(token, jwtKey, async (err, decode) => {
        console.log("err = ", err);
        console.log("decode = ", decode);
        if (err) {
            res.status(401).send({
                message: "Unauthenticated request",
            });
        } else {
            let userId = decode.userId;
            try {
                let userItem = await User.findById(userId).populate(
                    "plantList"
                );
                let userGroup = await User.findById(userId).populate("groups");

                res.json({
                    code: 200,

                    data: userItem,
                });
            } catch (error) {
                res.status(500).send("Exceptions in server query");
            }
        }
    });
};
exports.getUserGroupInfo = async (req, res, next) => {
    let token = req.get("Authorization");
    if (!token) {
        res.status(401).send({
            message: "Unauthenticated request",
        });
        return;
    }
    token = token.split("Bearer ")[1];
    console.log("token = ", token);
    jwt.verify(token, jwtKey, async (err, decode) => {
        console.log("err = ", err);
        console.log("decode = ", decode);
        if (err) {
            res.status(401).send({
                message: "Unauthenticated request",
            });
        } else {
            let userId = decode.userId;
            try {
                let userGroup = await User.findById(userId).populate("groups");

                res.json({
                    code: 200,

                    data: userGroup,
                });
            } catch (error) {
                res.status(500).send("Exceptions in server query");
            }
        }
    });
};
exports.setUserInfo = async (req, res, next) => {
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
            User.findByIdAndUpdate(
                {
                    _id: userId,
                },
                {
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    userName: req.body.userName,
                },
                (err, doc) => {
                    if (err) {
                        res.status(500).send("Exceptions in server");
                        return;
                    }
                    res.status(201).send({
                        message: "User Changed Successfully",
                    });
                    console.log(doc);
                }
            );
        }
    });
};
