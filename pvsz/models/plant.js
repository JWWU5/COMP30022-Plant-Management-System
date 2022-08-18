const mongoose = require ('mongoose')

const schema = new mongoose.Schema({
    plantId: { type: String },
    botanicalName: { type: String, required: true },
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
})

const Plant = mongoose.model('plant', schema)
module.exports = Plant