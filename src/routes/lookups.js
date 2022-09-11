const express = require("express");
const router = express.Router();
const brandsRoutes = require("./brands");
const categoriesRoutes = require("./categories");
const colorsRoutes = require("./colors");
const countriesRoutes = require("./countries");
const manufacturesRoutes = require("./manufactures");
const typesRoutes = require("./types");
const sizesRoutes = require("./sizes");

router.use("/brands", brandsRoutes);
router.use("/categories", categoriesRoutes);
router.use("/colors", colorsRoutes);
router.use("/countries", countriesRoutes);
router.use("/manufactures", manufacturesRoutes);
router.use("/types", typesRoutes);
router.use("/sizes", sizesRoutes);
module.exports = router;
