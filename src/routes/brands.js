const express = require("express");
const router = express.Router();
const {
  addBrand,
  getAllBrands,
  deleteBrand,
  updateBrand,
} = require("../controllers/brands");
const validationCheck = require("../middleware/validationCheck");
const lookupsValidations = require("../validations/lookups");

router.post("/", lookupsValidations.addLookup, validationCheck, addBrand);
router.get("/", getAllBrands);
router.put(
  "/:id",
  lookupsValidations.updateLookup,
  validationCheck,
  updateBrand
);
router.delete(
  "/:id",
  lookupsValidations.deleteLookup,
  validationCheck,
  deleteBrand
);

module.exports = router;
