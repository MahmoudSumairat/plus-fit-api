const express = require("express");
const router = express.Router();
const {
  addType,
  getAllTypes,
  updateType,
  deleteType,
} = require("../controllers/types");

router.post("/", lookupsValidations.addLookup, validationCheck, addType);
router.get("/", getAllTypes);
router.put(
  "/:id",
  lookupsValidations.updateLookup,
  validationCheck,
  updateType
);
router.delete(
  "/:id",
  lookupsValidations.deleteLookup,
  validationCheck,
  deleteType
);

module.exports = router;
