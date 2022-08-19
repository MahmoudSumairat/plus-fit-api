const { body, param } = require("express-validator");

const lookupsValidations = {
  addLookup: [
    body("title").not().isEmpty().withMessage("Lookup title is required."),
  ],
  deleteLookup: [
    param("id")
      .not()
      .isEmpty()
      .withMessage("Lookup ID is required")
      .isInt({ min: 1 })
      .withMessage("Lookup ID should be greater than or equal 1"),
  ],
  updateLookup: [
    param("id")
      .not()
      .isEmpty()
      .withMessage("Lookup ID is required")
      .isInt({ min: 1 })
      .withMessage("Lookup ID should be greater than or equal 1"),
    body("title").not().isEmpty().withMessage("Lookup title is required"),
  ],
};

module.exports = lookupsValidations;
