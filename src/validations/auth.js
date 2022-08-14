const { body } = require("express-validator");

const authValidations = {
  login: [
    body("email").not().isEmpty().withMessage("email is required"),
    body("email").isEmail().withMessage("email is not valid"),
    body("password").not().isEmpty().withMessage("password is required"),
    body("password")
      .isLength({ min: 8 })
      .withMessage("password should be at least 8 characters long"),
  ],

  register: [
    body("firstName").not().isEmpty().withMessage("first name is required"),
    body("lastName").not().isEmpty().withMessage("last name is required"),
    body("email").not().isEmpty().withMessage("email is required"),
    body("email").isEmail().withMessage("email is not valid"),
    body("password").not().isEmpty().withMessage("password is required"),
    body("password")
      .isLength({ min: 8 })
      .withMessage("password should be at least 8 characters long"),
  ],
};

module.exports = authValidations;
