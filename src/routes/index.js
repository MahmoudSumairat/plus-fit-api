const express = require("express");

const router = express.Router();

const auth = require("./auth");
const products = require("./products");
const lookups = require("./lookups");
const bagItems = require("./bagItems");
const addresses = require("./addresses");
const overviews = require("./overviews");
const reviews = require("./reviews");
const sales = require("./sales");
const orders = require("./orders");
const visits = require("./visits");

router.use("/auth", auth);
router.use("/products", products);
router.use("/lookups", lookups);
router.use("/bagItems", bagItems);
router.use("/addresses", addresses);
router.use("/overviews", overviews);
router.use("/reviews", reviews);
router.use("/sales", sales);
router.use("/orders", orders);
router.use("/visits", visits);
module.exports = router;
