const express = require("express");
const {
  addSale,
  getProductSale,
  updateSale,
  deleteSale,
} = require("../controllers/sales");
const authToken = require("../middleware/authToken");
const salesValidation = require("../validations/sales");
const validationCheck = require("../middleware/validationCheck");
const router = express.Router();

router.post("/", authToken, salesValidation.addSale, validationCheck, addSale);
router.get(
  "/:productId",
  authToken,
  salesValidation.getProductSale,
  validationCheck,
  getProductSale
);
router.put(
  "/:saleId",
  authToken,
  salesValidation.updateSale,
  validationCheck,
  updateSale
);
router.delete(
  "/:saleId",
  authToken,
  salesValidation.deleteSale,
  validationCheck,
  deleteSale
);

module.exports = router;
