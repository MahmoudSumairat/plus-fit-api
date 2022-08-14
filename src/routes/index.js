const express = require("express");

const router = express.Router();

const auth = require("./auth");
const products = require("./products");
router.use("/auth", auth);
router.use("/products", products);

module.exports = router;
