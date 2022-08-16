const queryHandler = require("../../helpers/queryHandler");
const db = require("../connection/dbConnect");

const Size = {
  addProductSize: (rows) => {
    return new Promise((resolve, reject) => {
      db.query(
        `
        INSERT INTO product_size_relations (size_id, product_id) VALUES ?
        `,
        [rows],
        (err, result) => queryHandler(err, result, resolve, reject)
      );
    });
  },

  getProductSizes: (productId) => {
    return new Promise((resolve, reject) => {
      db.query(
        `
        SELECT * FROM product_size_relations WHERE product_id = ${productId}
      `,
        (err, res) => queryHandler(err, res, resolve, reject)
      );
    });
  },

  getSizesFromRelation: (colorIds) => {
    return new Promise((resolve, reject) => {
      db.query(
        `
        SELECT * FROM sizes WHERE size_id in (?)
      `,
        [colorIds],
        (err, result) => queryHandler(err, result, resolve, reject)
      );
    });
  },
};

module.exports = Size;
