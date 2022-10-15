const mongoose = require("mongoose");

const PlantSchema = mongoose.Schema({
	botanicalName: { type: String },
	commonName: { type: String },
	family: { type: String },
	plantType: { type: String },
	matureSize: { type: String },
	sunExposure: { type: String },
	waterPeriod: { type : String},
	soilType: { type: String },
	soilpH: { type: String },
	bloomType: { type: String },
	flowerColor: { type: String },
	hardinessZones: { type: String },
	nativeArea: { type: String },
	toxicity: { type: String},
	growthCare: { type: String },
	imageSourse: { type: String },
},{
	timestamps: { createdAt: "createTime", updatedAt: "updateTime" },
  });

module.exports = PlantSchema;


