const { body, param } = require("express-validator");

const salesValidations = {
  addSale: [
    body("value")
      .not()
      .isEmpty()
      .withMessage("value should be provided")
      .isInt({ min: 1 })
      .withMessage("value should be greater than 0"),
    body("productId")
      .not()
      .isEmpty()
      .withMessage("productId should be provided")
      .isInt({ min: 1 })
      .withMessage("productId should be greater than 0"),
  ],
  getProductSale: [
    param("productId")
      .not()
      .isEmpty()
      .withMessage("productId should be provided")
      .isInt({ min: 1 })
      .withMessage("productId should be greater than 0"),
  ],
  updateSale: [
    body("value")
      .not()
      .isEmpty()
      .withMessage("value should be provided")
      .isInt({ min: 1 })
      .withMessage("value should be greater than 0"),
    param("saleId")
      .not()
      .isEmpty()
      .withMessage("saleId should be provided")
      .isInt({ min: 1 })
      .withMessage("saleId should be greater than 0"),
  ],
  deleteSale: [
    param("saleId")
      .not()
      .isEmpty()
      .withMessage("saleId should be provided")
      .isInt({ min: 1 })
      .withMessage("saleId should be greater than 0"),
  ],
};

module.exports = salesValidations;
