const { body, param } = require("express-validator");

const lookupsValidations = {
  addBrand: [
    body("title").not().isEmpty().withMessage("Brand title is required."),
  ],
  deleteBrand: [
    param("brandId")
      .not()
      .isEmpty()
      .withMessage("Brand ID is required")
      .isInt({ min: 1 })
      .withMessage("Brand ID should be greater than or equal 1"),
  ],
  updateBrand: [
    param("brandId")
      .not()
      .isEmpty()
      .withMessage("Brand ID is required")
      .isInt({ min: 1 })
      .withMessage("Brand ID should be greater than or equal 1"),
    body("title").not().isEmpty().withMessage("Brand title is required"),
  ],
};

module.exports = lookupsValidations;
