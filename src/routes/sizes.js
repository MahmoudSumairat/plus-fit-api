const express = require("express");
const router = express.Router();

const { getAllSizes } = require("../controllers/sizes");

router.get("/", getAllSizes);

module.exports = router;
