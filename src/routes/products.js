const express = require("express");
const {
  addProduct,
  getAllProducts,
  getProductDetails,
  uploadProductImages,
  updateProduct,
} = require("../controllers/products");
const router = express.Router();
const productValidation = require("../validations/product");
const validationCheck = require("../middleware/validationCheck");

router.post("/", productValidation.addProduct, validationCheck, addProduct);
router.post("/images", uploadProductImages);
router.get(
  "/:productId",
  productValidation.getProductDetails,
  validationCheck,
  getProductDetails
);
router.get("/", productValidation.getProducts, validationCheck, getAllProducts);
router.get(
  "/:productType",
  productValidation.getProducts,
  validationCheck,
  getAllProducts
);

router.put(
  "/:productId",
  productValidation.updateProduct,
  validationCheck,
  updateProduct
);

module.exports = router;
