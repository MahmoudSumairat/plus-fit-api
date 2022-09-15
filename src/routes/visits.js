const express = require("express");
const { reportVisit } = require("../controllers/visits");
const router = express.Router();

router.get("/", reportVisit);

module.exports = router;
