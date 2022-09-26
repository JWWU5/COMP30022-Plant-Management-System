const mongoose = require("mongoose");

const CustomPlantSchema = mongoose.Schema({
	name: { type: String },
	waterPeriod: { type: String },
	lastWaterDate: { type: Date },
	sunPeriod: { type: String},
	lastSunDate: { type: Date },
	chooseGroup: { type: String },
	otherDetails: { type: String }
},{
	timestamps: { createdAt: "createTime", updatedAt: "updateTime" },
  });

module.exports = CustomPlantSchema;

