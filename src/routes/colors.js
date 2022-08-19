const express = require("express");
const router = express.Router();
const {
  addColor,
  getAllColors,
  updateColor,
  deleteColor,
} = require("../controllers/colors");
const lookupsValidations = require("../validations/lookups");
const validationCheck = require("../middleware/validationCheck");

router.post("/", lookupsValidations.addLookup, validationCheck, addColor);
router.get("/", getAllColors);
router.put(
  "/:id",
  lookupsValidations.updateLookup,
  validationCheck,
  updateColor
);
router.delete(
  "/:id",
  lookupsValidations.deleteLookup,
  validationCheck,
  deleteColor
);

module.exports = router;
