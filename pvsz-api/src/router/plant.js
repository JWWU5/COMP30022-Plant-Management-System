const express = require("express");
const router = express.Router();
const plantController = require("./../controllers/plantController");

router.post("/select-plants",plantController.displayPlantLibrary)

module.exports = router;
