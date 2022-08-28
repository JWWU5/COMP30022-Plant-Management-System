const express = require("express");
const router = express.Router();
const plantController = require("./../controllers/plantController");

router.post("/add", plantController.register).get("/", plantController.list);

module.exports = router;
