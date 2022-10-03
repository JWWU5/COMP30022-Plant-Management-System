const express = require("express");
const router = express.Router();

router.use("/user", require("./user"));
router.use("/plant", require("./plant"));
router.use("/customPlant", require("./customPlant"));
router.use("/plantGroup", require("./plantGroup"));

module.exports = router;
