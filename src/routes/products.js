const express = require("express");
const { addProduct } = require("../controllers/products");
const router = express.Router();
const productValidation = require("../validations/product");
const validationCheck = require("../middleware/validationCheck");

router.post("/", productValidation.addProduct, validationCheck, addProduct);

module.exports = router;
