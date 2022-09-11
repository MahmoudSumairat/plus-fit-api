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

  updateProductSizes: (newSizes, productId) => {
    return new Promise((resolve, reject) => {
      db.query(
        `
        DELETE FROM product_size_relations WHERE product_id = ${productId};
        INSERT INTO product_size_relations (size_id, product_id) VALUES ?
      `,
        [newSizes],
        (err, res) => queryHandler(err, res, resolve, reject)
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

  getAllSizes: () => {
    return new Promise((resolve, reject) => {
      db.query(
        `
      
        SELECT title, size_id as id FROM sizes 
      
      `,
        (err, res) => queryHandler(err, res, resolve, reject)
      );
    });
  },
};

module.exports = Size;
