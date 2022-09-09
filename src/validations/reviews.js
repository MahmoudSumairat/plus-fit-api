const { body, param, oneOf } = require("express-validator");

const reviewsValidations = {
  addReview: [
    body("content").not().isEmpty().withMessage("content should not be empty"),
    body("productId")
      .not()
      .isEmpty()
      .withMessage("productId should not be empty")
      .isInt({ min: 1 })
      .withMessage("productId should be greater than 0"),
    body("rate")
      .not()
      .isEmpty()
      .withMessage("rate should not be empty")
      .isInt({ min: 1 })
      .withMessage("rate should be greater than 0"),
  ],

  getProductReviews: [
    param("productId")
      .not()
      .isEmpty()
      .withMessage("productId should not be empty")
      .isInt({ min: 1 })
      .withMessage("productId should be greater than 0"),
  ],
  updateReview: [
    param("reviewId")
      .not()
      .isEmpty()
      .withMessage("reviewId should not be empty")
      .isInt({ min: 1 })
      .withMessage("reviewId should be greater than 0"),
    oneOf([
      body("content")
        .not()
        .isEmpty()
        .withMessage("content should not be empty"),
      body("rate")
        .not()
        .isEmpty()
        .withMessage("rate should not be empty")
        .custom((value) => value.newRate && value.oldRate),
    ]),
  ],
  deleteReview: [
    param("reviewId")
      .not()
      .isEmpty()
      .withMessage("reviewId should not be empty")
      .isInt({ min: 1 })
      .withMessage("reviewId should be greater than 0"),
  ],
};

module.exports = reviewsValidations;
