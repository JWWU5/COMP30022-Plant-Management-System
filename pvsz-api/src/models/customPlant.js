const mongoose = require("mongoose");

const CustomPlantSchema = mongoose.Schema({
	name: { type: String },
	waterPeriod: { type: Number },
	lastWaterDate: { type: Date },
	sunPeriod: { type: Number},
	lastSunDate: { type: Date },
	chooseGroup: { type: String },
	otherDetails: { type: String }
},{
	timestamps: { createdAt: "createTime", updatedAt: "updateTime" },
  });

module.exports = CustomPlantSchema;

