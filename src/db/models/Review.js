const { format } = require("mysql");
const queryHandler = require("../../helpers/queryHandler");
const db = require("../connection/dbConnect");

const Review = {
  addReview: (reviewData) => {
    return new Promise((resolve, reject) => {
      db.query(
        `
            
                INSERT INTO reviews (user_id, product_id, content) VALUES (?)
            
            `,
        [reviewData],
        (err, res) => queryHandler(err, res, resolve, reject)
      );
    });
  },

  getProductReviews: (productId) => {
    return new Promise((resolve, reject) => {
      db.query(
        `
        
            SELECT
            users.user_id,
            reviews.content,
            products.rate,
            products.rates_count,
            users.first_name,
            users.last_name
            FROM reviews
            RIGHT JOIN users
            ON reviews.user_id  = users.user_id
            RIGHT JOIN products
            ON reviews.product_id = products.product_id
            WHERE reviews.product_id = ?
        
        `,
        productId,
        (err, res) => queryHandler(err, res, resolve, reject)
      );
    });
  },

  updateReview: (reviewId, content) => {
    return new Promise((resolve, reject) => {
      db.query(
        `
        
            UPDATE reviews SET content = ?
            WHERE review_id = ?
        
        `,
        [content, reviewId],
        (err, res) => queryHandler(err, res, resolve, reject)
      );
    });
  },

  deleteReview: (reviewId) => {
    return new Promise((resolve, reject) => {
      db.query(
        `
        
            DELETE FROM reviews WHERE review_id = ?
        
        `,
        reviewId,
        (err, res) => queryHandler(err, res, resolve, reject)
      );
    });
  },

  getUserReviews: (userId) => {
    return new Promise((resolve, reject) => {
      db.query(
        `
      
        SELECT * FROM reviews WHERE user_id = ?
      
      `,
        userId,
        (err, res) => queryHandler(err, res, resolve, reject)
      );
    });
  },
};

module.exports = Review;
