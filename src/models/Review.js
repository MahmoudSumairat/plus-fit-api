const { VALIDATION_ERROR } = require("../constants/statusCodes");
const reviewDB = require("../db/models/Review");
const Product = require("./Product");
class Review {
  reviewData = {
    content: "",
    productId: "",
    userId: null,
    rate: null,
    reviewId: null,
  };

  constructor(data) {
    if (Object.values(data).length) {
      this.reviewData = { ...data };
    }
  }

  static getProductReviews = async (productId) => {
    try {
      const productReviews = await reviewDB.getProductReviews(productId);
      return Promise.resolve(productReviews);
    } catch (err) {
      throw err;
    }
  };

  addReview = async () => {
    try {
      const { productId, rate, userId, content } = this.reviewData;

      const userReview = await reviewDB.getUserReviews(userId);
      if (userReview[0]) {
        return Promise.reject({
          message: "User already has a review",
          status: VALIDATION_ERROR,
        });
      }

      const { rate: productRate, rates_count } =
        await Product.selectFromProduct(productId, "rate, rates_count");
      const newRatesCount = rates_count + 1;
      const newRate = productRate + rate;
      const product = new Product({
        rate: newRate,
        ratesCount: newRatesCount,
        id: productId,
      });
      await product.updateProduct();
      const addReviewRow = [userId, productId, content];
      const { insertId } = await reviewDB.addReview(addReviewRow);
      return Promise.resolve(insertId);
    } catch (err) {
      throw err;
    }
  };

  updateReview = async () => {
    try {
      const {
        rate: { newRate, oldRate },
        content,
        reviewId,
        productId,
      } = this.reviewData;
      if (content) {
        await reviewDB.updateReview(reviewId, content);
      }
      if (rate) {
        const { rate: productRate } = await Product.selectFromProduct(
          productId,
          "rate"
        );
        const rate = productRate - oldRate + newRate;
        const product = new Product({ rate, id: productId });
        await product.updateProduct();
      }
      return Promise.resolve({ rate, content });
    } catch (err) {
      throw err;
    }
  };

  deleteReview = async () => {
    try {
      const { reviewId } = this.reviewData;
      await reviewDB.deleteReview(reviewId);
      return Promise.resolve(reviewId);
    } catch (err) {
      throw err;
    }
  };
}

module.exports = Review;
