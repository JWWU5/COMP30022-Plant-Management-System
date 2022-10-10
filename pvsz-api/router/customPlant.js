const express = require("express");
const router = express.Router();
const plantController = require("../controllers/customPlantController");

router.post("/add",plantController.add)
router.post("/dels",plantController.dels)
router.post("/getPlant", plantController.getPlant)
router.post("/setCustomPlant", plantController.setCustomPlant)
router.post("/update", plantController.update)
module.exports = router;
