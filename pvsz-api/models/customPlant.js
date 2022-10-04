const mongoose = require("mongoose");

const CustomPlantSchema = mongoose.Schema({
	image: { type: String},
	name: { type: String },
	waterPeriod: { type: String },
	lastWaterDate: { type: Date },
	sunPeriod: { type: String},
	lastSunDate: { type: Date },
	// chooseGroup: { type: String },
	chooseGroup: [{type: mongoose.Schema.Types.ObjectId, ref: "plantGroup"}],
	// plants:[{type: mongoose.Schema.Types.ObjectId, ref: 'CustomPlant'}]
	otherDetails: { type: String }
},{
	timestamps: { createdAt: "createTime", updatedAt: "updateTime" },
  });

module.exports = CustomPlantSchema;

