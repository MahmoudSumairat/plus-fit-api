const handleResError = require("../helpers/errorHandler");
const handleResSuccess = require("../helpers/successHandler");
const Review = require("../models/Review");

exports.addReview = async (
  {
    body,
    headers: {
      userData: { user_id: userId },
    },
  },
  res
) => {
  try {
    const review = new Review({ ...body, userId });
    const insertedId = await review.addReview();
    handleResSuccess(res, "review added successfully", insertedId);
  } catch (err) {
    handleResError(err, res);
  }
};

exports.getProductReviews = async ({ params: { productId } }, res) => {
  try {
    const productReviews = await Review.getProductReviews(productId);
    handleResSuccess(res, "reviews fetched successfully", productReviews);
  } catch (err) {
    handleResError(err, res);
  }
};

exports.updateReview = async ({ params: { reviewId }, body }, res) => {
  try {
    const review = new Review({ reviewId, ...body });
    const updatedData = await review.updateReview();
    handleResSuccess(res, "review updated successfully", updatedData);
  } catch (err) {
    handleResError(err, res);
  }
};

exports.deleteReview = async ({ params: { reviewId } }, res) => {
  try {
    const review = new Review({ reviewId });
    const deletedId = review.deleteReview();
    handleResSuccess(res, "review deleted successfully", deletedId);
  } catch (err) {
    handleResError(err, res);
  }
};
