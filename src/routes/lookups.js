const express = require("express");
const {
  addBrand,
  getAllBrands,
  deleteBrand,
  updateBrand,
} = require("../controllers/brands");
const router = express.Router();
const brandsValidation = require("../validations/brands");
const validationCheck = require("../middleware/validationCheck");

// BRANDS
router.get("/brands", getAllBrands);
router.post("/brands", brandsValidation.addBrand, validationCheck, addBrand);
router.delete(
  "/brands/:brandId",
  brandsValidation.deleteBrand,
  validationCheck,
  deleteBrand
);
router.put(
  "/brands/:brandId",
  brandsValidation.updateBrand,
  validationCheck,
  updateBrand
);
module.exports = router;
