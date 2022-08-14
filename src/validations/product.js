const { check } = require("express-validator");

const productValidation = {
  addProduct: [
    check("title")
      .not()
      .isEmpty()
      .withMessage("Title is required")
      .isLength({ min: 3 })
      .withMessage("Product should be at least 3 characters long"),
    check("price")
      .not()
      .isEmpty()
      .withMessage("Price is required")
      .isInt({ min: 1 })
      .withMessage("Price should be at least 1 USD"),
    check("rate")
      .not()
      .isEmpty()
      .withMessage("Rate is required")
      .isInt({ min: 1 })
      .withMessage("Rate should be at least 1 star"),
    check("quantity")
      .not()
      .isEmpty()
      .withMessage("Quantity is required")
      .isInt({ min: 1 })
      .withMessage("Quantity should be at least 1 stock"),
    check("brandId")
      .not()
      .isEmpty()
      .withMessage("Brand ID is required")
      .isInt({ min: 1 })
      .withMessage("Brand with ID 0  doesn't exist"),
    check("manufactureId")
      .not()
      .isEmpty()
      .withMessage("Manufacture ID is required")
      .isInt({ min: 1 })
      .withMessage("Manufacture with ID 0  doesn't exist"),
    check("countryId")
      .not()
      .isEmpty()
      .withMessage("Country ID is required")
      .isInt({ min: 1 })
      .withMessage("Country with ID 0  doesn't exist"),
    check("typeId")
      .not()
      .isEmpty()
      .withMessage("Type ID is required")
      .isInt({ min: 1 })
      .withMessage("Type with ID 0  doesn't exist"),
    check("categoryId")
      .not()
      .isEmpty()
      .withMessage("Category ID is required")
      .isInt({ min: 1 })
      .withMessage("Category with ID 0  doesn't exist"),
    check("colorIds")
      .not()
      .isEmpty()
      .withMessage("Colors are required")
      .isArray()
      .withMessage("Color IDs should be an array")
      .isLength({ min: 1 })
      .withMessage("Color IDs should not be empty"),
    check("sizeIds")
      .not()
      .isEmpty()
      .withMessage("Sizes are required")
      .isArray()
      .withMessage("Size IDs should be an array")
      .isLength({ min: 1 })
      .withMessage("Size IDs should not be empty"),
  ],
};

module.exports = productValidation;
