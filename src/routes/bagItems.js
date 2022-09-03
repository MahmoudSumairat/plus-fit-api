const express = require("express");
const {
  addBagItem,
  getBagItems,
  updateBagItem,
  deleteBagItem,
} = require("../controllers/bagItems");
const authToken = require("../middleware/authToken");
const router = express.Router();
const validationCheck = require("../middleware/validationCheck");
const bagItemsValidations = require("../validations/bagItems");

router.post(
  "/",
  authToken,
  bagItemsValidations.addBagItem,
  validationCheck,
  addBagItem
);
router.get("/", authToken, getBagItems);
router.put(
  "/:bagItemId",
  authToken,
  bagItemsValidations.updateBagItem,
  validationCheck,
  updateBagItem
);
router.delete(
  "/:bagItemId",
  authToken,
  bagItemsValidations.deleteBagItem,
  validationCheck,
  deleteBagItem
);

module.exports = router;
