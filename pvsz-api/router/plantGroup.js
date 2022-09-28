const express = require("express");
const router = express.Router();
const plantGroupController = require("../controllers/plantGroupController");

router.post("/add", plantGroupController.add);
router.post("/dels", plantGroupController.dels);
module.exports = router;
