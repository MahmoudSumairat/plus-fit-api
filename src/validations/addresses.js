const { body, query, param } = require("express-validator");

const addressesValidations = {
  addAddresses: [
    body("firstName").not().isEmpty().withMessage("First Name is required"),
    body("lastName").not().isEmpty().withMessage("Last Name is required"),
    body("email")
      .not()
      .isEmpty()
      .withMessage("Rate is required")
      .isEmail()
      .withMessage("Address email is not valid"),
    body("countryId")
      .not()
      .isEmpty()
      .withMessage("Country ID is required")
      .isInt({ min: 1 })
      .withMessage("Country ID should be at least 1 stock"),
    body("address1").not().isEmpty().withMessage("address 1 is required"),
    body("city").not().isEmpty().withMessage("City is required"),
    body("zipCode").not().isEmpty().withMessage("zipCode is required"),
    body("mobilePhone")
      .not()
      .isEmpty()
      .withMessage("mobilePhone ID is required"),
  ],

  getAddressDetails: [
    param("addressId")
      .not()
      .isEmpty()
      .withMessage("Address ID is required")
      .isInt({ min: 1 })
      .withMessage("Address ID should be greater than 0"),
  ],

  updateProduct: [
    param("addressId")
      .not()
      .isEmpty()
      .withMessage("Address ID is required")
      .isInt({ min: 1 })
      .withMessage("Address ID should be greater than 0"),
    body("addressData")
      .custom((value) => {
        return Object.values(value).length;
      })
      .withMessage("Address Data should have at least a field to be updated"),
  ],

  deleteAddress: [
    param("addressId")
      .not()
      .isEmpty()
      .withMessage("Address ID is required")
      .isInt({ min: 1 })
      .withMessage("Address ID should be greater than 0"),
  ],
};

module.exports = addressesValidations;
