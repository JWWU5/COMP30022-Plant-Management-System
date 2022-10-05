const mongoose = require("mongoose");

const CustomPlantSchema = mongoose.Schema({
	image: { type: String},
	name: { type: String },
	waterPeriod: { type: String },
	lastWaterDate: { type: Date },
	sunPeriod: { type: String},
	lastSunDate: { type: Date },
	otherDetails: { type: String }
},{
	timestamps: { createdAt: "createTime", updatedAt: "updateTime" },
  });

module.exports = CustomPlantSchema;

