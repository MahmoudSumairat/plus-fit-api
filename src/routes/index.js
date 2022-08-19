const express = require("express");

const router = express.Router();

const auth = require("./auth");
const products = require("./products");
const lookups = require("./lookups");
router.use("/auth", auth);
router.use("/products", products);
router.use("/lookups", lookups);

module.exports = router;
