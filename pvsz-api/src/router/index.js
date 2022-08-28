const express = require("express");
const router = express.Router();

router.use("/user", require("./user"));
router.use("/plant", require("./plant"));

module.exports = router;
