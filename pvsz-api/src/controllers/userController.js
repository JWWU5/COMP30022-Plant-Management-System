const { User } = require("./../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.register = async (req, res, next) => {
    console.log(req.body, "data");
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        console.log(hashedPassword, "after hashing");
        const user = new User({
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
    User.findOne({ userName: req.body.userName })

        // if email exists
        .then((user) => {
            // compare the password entered and the hashed password found
            bcrypt
                .compare(req.body.password, user.password)

                // if the passwords match
                .then((passwordCheck) => {
                    // check if password matches
                    if (!passwordCheck) {
                        return response.status(400).send({
                            message: "Passwords does not match",
                            error,
                        });
                    }

                    //   create JWT token
                    const token = jwt.sign(
                        {
                            userId: user._id,
                            userName: user.userName,
                        },
                        "RANDOM-TOKEN",
                        { expiresIn: "24h" }
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
                        message: "Passwords does not match",
                        error,
                    });
                });
        })
        // catch error if email does not exist
        .catch((e) => {
            res.status(404).send({
                message: "User not found",
                e,
            });
        });
};
exports.list = async (req, res, next) => {
    const result = await User.find();
    res.status(200).json(result);
};
