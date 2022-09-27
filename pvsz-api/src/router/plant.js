const express = require("express");
const router = express.Router();
const plantController = require("./../controllers/plantController");

router.post("/list",plantController.list)

module.exports = router;
