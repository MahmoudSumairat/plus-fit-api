const express = require("express");
const { addProduct, getAllProducts } = require("../controllers/products");
const router = express.Router();
const productValidation = require("../validations/product");
const validationCheck = require("../middleware/validationCheck");

router.post("/", productValidation.addProduct, validationCheck, addProduct);
router.get("/", productValidation.getProducts, validationCheck, getAllProducts);
module.exports = router;
