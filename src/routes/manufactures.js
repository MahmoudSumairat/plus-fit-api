const express = require("express");
const router = express.Router();
const {
  addManufacture,
  getAllManufactures,
  updateManufacture,
  deleteManufacture,
} = require("../controllers/");

router.post("/", lookupsValidations.addLookup, validationCheck, addManufacture);
router.get("/", getAllManufactures);
router.put(
  "/:id",
  lookupsValidations.updateLookup,
  validationCheck,
  updateManufacture
);
router.delete(
  "/:id",
  lookupsValidations.deleteLookup,
  validationCheck,
  deleteManufacture
);

module.exports = router;
