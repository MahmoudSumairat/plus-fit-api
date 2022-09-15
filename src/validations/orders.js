const { body } = require("express-validator");

const ordersValidation = {
  createOrder: [
    body("rows")
      .not()
      .isEmpty()
      .withMessage("rows should be provided and should not be an empty array"),
  ],
};

module.exports = ordersValidation;
