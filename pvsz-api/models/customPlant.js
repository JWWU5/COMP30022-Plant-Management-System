const mongoose = require("mongoose");

const CustomPlantSchema = mongoose.Schema(
    {
        image: { type: String },
        name: { type: String },
        waterPeriod: { type: String },
        lastWaterDate: { type: String },
        sunPeriod: { type: String },
        lastSunDate: { type: String },
        otherDetails: { type: String },
        like: { type: Boolean, default: false },
    },
    {
        timestamps: { createdAt: "createTime", updatedAt: "updateTime" },
    }
);

module.exports = CustomPlantSchema;
