const mongoose = require("mongoose");

const UserSchema = mongoose.Schema(
    {
        userId: { type: String },
        password: { type: String },
        firstName: { type: String },
        lastName: { type: String },
        userName: { type: String },
        dateOfBirth: { type: String },
        email: { type: String },
        plantList:[{type: mongoose.Schema.Types.ObjectId, ref: 'CustomPlant'}],
        groups:[{type: mongoose.Schema.Types.ObjectId, ref: 'PlantGroup'}],
    },
    {
        timestamps: { createdAt: "createTime", updatedAt: "updateTime" },
    }
);

module.exports = UserSchema;
