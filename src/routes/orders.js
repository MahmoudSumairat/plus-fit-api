const express = require("express");
const { createOrder } = require("../controllers/orders");
const authToken = require("../middleware/authToken");
const validationCheck = require("../middleware/validationCheck");
const orderValidations = require("../validations/orders");
const router = express.Router();

router.post(
  "/",
  authToken,
  orderValidations.createOrder,
  validationCheck,
  createOrder
);

module.exports = router;
