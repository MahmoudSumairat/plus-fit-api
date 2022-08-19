const express = require("express");
const router = express.Router();
const {
  addCategory,
  getAllCategories,
  updateCategory,
  deleteCategory,
} = require("../controllers/categories");
const lookupsValidations = require("../validations/lookups");
const validationCheck = require("../middleware/validationCheck");

router.post("/", lookupsValidations.addLookup, validationCheck, addCategory);
router.get("/", getAllCategories);
router.put(
  "/:id",
  lookupsValidations.updateLookup,
  validationCheck,
  updateCategory
);
router.delete(
  "/:id",
  lookupsValidations.deleteLookup,
  validationCheck,
  deleteCategory
);

module.exports = router;
