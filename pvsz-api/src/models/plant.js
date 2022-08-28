const mongoose = require('mongoose');

const PlantSchema = mongoose.Schema({
  plantId: { type: String },
  botanicalName: { type: String },
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
  growthCare: { type: String },
  light: { type: String },
  soil: { type: String },
  water: { type: String },
  temperatureAndHumidity: { type: String },
  fertilizer: { type: String },
});

module.exports = PlantSchema;
