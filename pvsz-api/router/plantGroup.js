const express = require("express");
const router = express.Router();
const plantGroupController = require("../controllers/plantGroupController");

router.post("/add", plantGroupController.add);
router.post("/dels", plantGroupController.dels);
router.post("/addPlantToGroup", plantGroupController.addPlantToGroup);
router.post("/getPlantGroupList", plantGroupController.getPlantGroupList);
router.post("/delPlantInGroup", plantGroupController.delPlantInGroup);
router.post("/changeLiked", plantGroupController.changeLiked);

module.exports = router;
