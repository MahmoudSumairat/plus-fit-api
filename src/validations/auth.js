const { check } = require("express-validator");

const authValidations = {
  login: [
    check("email").not().isEmpty().withMessage("email is required"),
    check("email").isEmail().withMessage("email is not valid"),
    check("password").not().isEmpty().withMessage("password is required"),
    check("password")
      .isLength({ min: 8 })
      .withMessage("password should be at least 8 characters long"),
  ],

  register: [
    check("firstName").not().isEmpty().withMessage("first name is required"),
    check("lastName").not().isEmpty().withMessage("last name is required"),
    check("email").not().isEmpty().withMessage("email is required"),
    check("email").isEmail().withMessage("email is not valid"),
    check("password").not().isEmpty().withMessage("password is required"),
    check("password")
      .isLength({ min: 8 })
      .withMessage("password should be at least 8 characters long"),
  ],
};

module.exports = authValidations;
