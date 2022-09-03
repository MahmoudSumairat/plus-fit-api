const express = require("express");

const router = express.Router();

const auth = require("./auth");
const products = require("./products");
const lookups = require("./lookups");
const bagItems = require("./bagItems");
router.use("/auth", auth);
router.use("/products", products);
router.use("/lookups", lookups);
router.use("/bagItems", bagItems);

module.exports = router;
