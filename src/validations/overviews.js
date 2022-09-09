const { body, param } = require("express-validator");

const overViewValidations = {
  addOverview: [
    body("rows")
      .not()
      .isEmpty()
      .withMessage("rows should be provided and not be empty"),
    body("productId")
      .not()
      .isEmpty()
      .withMessage("productId should be provided")
      .isInt({ min: 1 })
      .withMessage("productId should be greater than 0"),
  ],
  getProductOverviews: [
    param("productId")
      .not()
      .isEmpty()
      .withMessage("productId should be provided")
      .isInt({ min: 1 })
      .withMessage("productId should be greater than 0"),
  ],
  updateOverview: [
    param("overviewId")
      .not()
      .isEmpty()
      .withMessage("overviewId should be provided")
      .isInt({ min: 1 })
      .withMessage("overviewId should be greater than 0"),
    body("content").not().isEmpty().withMessage("content should be provided"),
  ],
  deleteOverview: [
    param("overviewId")
      .not()
      .isEmpty()
      .withMessage("overviewId should be provided")
      .isInt({ min: 1 })
      .withMessage("overviewId should be greater than 0"),
  ],
};

module.exports = overViewValidations;
