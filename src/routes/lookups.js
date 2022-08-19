const express = require("express");
const {
  addBrand,
  getAllBrands,
  deleteBrand,
  updateBrand,
} = require("../controllers/brands");
const {
  addCategory,
  getAllCategories,
  updateCategory,
  deleteCategory,
} = require("../controllers/categories");
const {
  addColor,
  getAllColors,
  updateColor,
  deleteColor,
} = require("../controllers/colors");
const router = express.Router();
const lookupsValidations = require("../validations/lookups");
const validationCheck = require("../middleware/validationCheck");

// BRANDS
router.post("/brands", lookupsValidations.addLookup, validationCheck, addBrand);
router.get("/brands", getAllBrands);
router.put(
  "/brands/:id",
  lookupsValidations.updateLookup,
  validationCheck,
  updateBrand
);
router.delete(
  "/brands/:id",
  lookupsValidations.deleteLookup,
  validationCheck,
  deleteBrand
);

// CATEGORY
router.post(
  "/categories",
  lookupsValidations.addLookup,
  validationCheck,
  addCategory
);
router.get("/categories", getAllCategories);
router.put(
  "/categories/:id",
  lookupsValidations.updateLookup,
  validationCheck,
  updateCategory
);
router.delete(
  "/categories/:id",
  lookupsValidations.deleteLookup,
  validationCheck,
  deleteCategory
);

// COLORS
router.post("/colors", lookupsValidations.addLookup, validationCheck, addColor);
router.get("/colors", getAllColors);
router.put(
  "/colors/:id",
  lookupsValidations.updateLookup,
  validationCheck,
  updateColor
);
router.delete(
  "/colors/:id",
  lookupsValidations.deleteLookup,
  validationCheck,
  deleteColor
);

module.exports = router;
