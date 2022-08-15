const queryHandler = require("../../helpers/queryHandler");
const db = require("../connection/dbConnect");

const Image = {
  addProductImages: (rows) => {
    return new Promise((resolve, reject) => {
      db.query(
        `
            INSERT INTO images (url, product_id, is_main_img) VALUES ?
        `,
        [rows],
        (err, result) => queryHandler(err, result, resolve, reject)
      );
    });
  },

  getProductImages: (productId) => {
    return new Promise((resolve, reject) => {
      db.query(
        `
        SELECT url, is_main_img FROM images WHERE product_id=${productId}
      `,
        (err, result) => queryHandler(err, result, resolve, reject)
      );
    });
  },
};

module.exports = Image;
