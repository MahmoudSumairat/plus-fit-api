const { body, query, param } = require("express-validator");

const productValidation = {
  addProduct: [
    body("title")
      .not()
      .isEmpty()
      .withMessage("Title is required")
      .isLength({ min: 3 })
      .withMessage("Product should be at least 3 characters long"),
    body("price")
      .not()
      .isEmpty()
      .withMessage("Price is required")
      .isInt({ min: 1 })
      .withMessage("Price should be at least 1 USD"),
    body("rate")
      .not()
      .isEmpty()
      .withMessage("Rate is required")
      .isInt({ min: 1 })
      .withMessage("Rate should be at least 1 star"),
    body("quantity")
      .not()
      .isEmpty()
      .withMessage("Quantity is required")
      .isInt({ min: 1 })
      .withMessage("Quantity should be at least 1 stock"),
    body("brandId")
      .not()
      .isEmpty()
      .withMessage("Brand ID is required")
      .isInt({ min: 1 })
      .withMessage("Brand with ID 0  doesn't exist"),
    body("manufactureId")
      .not()
      .isEmpty()
      .withMessage("Manufacture ID is required")
      .isInt({ min: 1 })
      .withMessage("Manufacture with ID 0  doesn't exist"),
    body("countryId")
      .not()
      .isEmpty()
      .withMessage("Country ID is required")
      .isInt({ min: 1 })
      .withMessage("Country with ID 0  doesn't exist"),
    body("typeId")
      .not()
      .isEmpty()
      .withMessage("Type ID is required")
      .isInt({ min: 1 })
      .withMessage("Type with ID 0  doesn't exist"),
    body("categoryId")
      .not()
      .isEmpty()
      .withMessage("Category ID is required")
      .isInt({ min: 1 })
      .withMessage("Category with ID 0  doesn't exist"),
    body("colorIds")
      .not()
      .isEmpty()
      .withMessage("Colors are required")
      .isArray()
      .withMessage("Color IDs should be an array")
      .isLength({ min: 1 })
      .withMessage("Color IDs should not be empty"),
    body("sizeIds")
      .not()
      .isEmpty()
      .withMessage("Sizes are required")
      .isArray()
      .withMessage("Size IDs should be an array")
      .isLength({ min: 1 })
      .withMessage("Size IDs should not be empty"),
  ],

  getProducts: [
    query("pageNumber")
      .not()
      .isEmpty()
      .withMessage("Page Size is required")
      .isInt({ min: 1 })
      .withMessage("There is not page 0"),
    query("pageSize")
      .not()
      .isEmpty()
      .withMessage("Page Size is required")
      .isInt({ min: 1 })
      .withMessage("Can't get 0 products of the page"),
  ],

  getProductDetails: [
    param("productId")
      .not()
      .isEmpty()
      .withMessage("Product ID is required")
      .isInt({ min: 1 })
      .withMessage("Product ID should be greater than 0"),
  ],
};

module.exports = productValidation;
