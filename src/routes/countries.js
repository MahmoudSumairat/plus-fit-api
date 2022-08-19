const express = require("express");
const router = express.Router();
const {
  addCountry,
  updateCountry,
  deleteCountry,
  getAllCountries,
} = require("../controllers/countries");
const lookupsValidations = require("../validations/lookups");
const validationCheck = require("../middleware/validationCheck");

router.post("/", lookupsValidations.addLookup, validationCheck, addCountry);
router.get("/", getAllCountries);
router.put(
  "/:id",
  lookupsValidations.updateLookup,
  validationCheck,
  updateCountry
);
router.delete(
  "/:id",
  lookupsValidations.deleteLookup,
  validationCheck,
  deleteCountry
);

module.exports = router;
