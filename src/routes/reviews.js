const express = require("express");
const {
  addReview,
  getProductReviews,
  updateReview,
  deleteReview,
} = require("../controllers/reviews");
const authToken = require("../middleware/authToken");
const reviewsValidations = require("../validations/reviews");
const validationCheck = require("../middleware/validationCheck");
const router = express.Router();

router.post(
  "/",
  authToken,
  reviewsValidations.addReview,
  validationCheck,
  addReview
);
router.get(
  "/:productId",
  reviewsValidations.getProductReviews,
  validationCheck,
  getProductReviews
);
router.put(
  "/:reviewId",
  authToken,
  reviewsValidations.updateReview,
  validationCheck,
  updateReview
);
router.delete(
  "/:reviewId",
  authToken,
  reviewsValidations.deleteReview,
  validationCheck,
  deleteReview
);

module.exports = router;
