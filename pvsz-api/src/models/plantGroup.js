const mongoose = require("mongoose");

const PlantGroupSchema = mongoose.Schema({
    groupname: { type: String },
    plants:[{type: mongoose.Schema.Types.ObjectId, ref: 'CustomPlant'}]
},{
    timestamps: { createdAt: "createTime", updatedAt: "updateTime" },
  });

module.exports = PlantGroupSchema;


