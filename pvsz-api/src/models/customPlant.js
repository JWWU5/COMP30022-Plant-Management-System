const mongoose = require("mongoose");

const CustomPlantSchema = mongoose.Schema({
    name: { type: String },
    family: { type: String },
    plantType: { type: String },
    matureSize: { type: String },
    sunExposure: { type: String },
    soilType: { type: String },
    soilpH: { type: String },
    bloomType: { type: String },
    flowerColor: { type: String },
    hardinessZones: { type: String },
    nativeArea: { type: String },
    toxicity: { type: String},
    growthCare: { type: String },
},{
    timestamps: { createdAt: "createTime", updatedAt: "updateTime" },
  });

module.exports = CustomPlantSchema;
