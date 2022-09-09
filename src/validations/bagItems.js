const { body, param } = require("express-validator");

const bagItemsValidations = {
  addBagItem: [
    body("productId")
      .not()
      .isEmpty()
      .withMessage("productId should be provided")
      .isInt({ min: 1 })
      .withMessage("productId should be greater than 0"),
    body("quantity")
      .not()
      .isEmpty()
      .withMessage("quantity should be provided")
      .isInt({ min: 1 })
      .withMessage("quantity should be greater than 0"),
    body("sizeId")
      .not()
      .isEmpty()
      .withMessage("sizeId should be provided")
      .isInt({ min: 1 })
      .withMessage("sizeId should be greater than 0"),
    body("colorId")
      .not()
      .isEmpty()
      .withMessage("colorId should be provided")
      .isInt({ min: 1 })
      .withMessage("colorId should be greater than 0"),
    body("price")
      .not()
      .isEmpty()
      .withMessage("price should be provided")
      .isInt({ min: 1 })
      .withMessage("price should be greater than 0"),
  ],

  updateBagItem: [
    param("bagItemId")
      .not()
      .isEmpty()
      .withMessage("bagItemId should be provided")
      .isInt({ min: 1 })
      .withMessage("bagItemId should be greater than 0"),
    body("updateField")
      .not()
      .isEmpty()
      .withMessage("updateField should be provided")
      .isString()
      .withMessage("updateField should be string"),
    body("updateValue")
      .not()
      .isEmpty()
      .withMessage("updateValue should be provided"),
  ],

  deleteBagItem: [
    param("bagItemId")
      .not()
      .isEmpty()
      .withMessage("bagItemId should be provided")
      .isInt({ min: 1 })
      .withMessage("bagItemId should be greater than 0"),
  ],
};

module.exports = bagItemsValidations;
