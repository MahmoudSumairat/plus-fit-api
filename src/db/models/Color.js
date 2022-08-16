const queryHandler = require("../../helpers/queryHandler");
const db = require("../connection/dbConnect");

const Color = {
  addProductColors: (rows) => {
    return new Promise((resolve, reject) => {
      db.query(
        `
        INSERT INTO product_color_relations (color_id, product_id) VALUES ?
        `,
        [rows],
        (err, result) => queryHandler(err, result, resolve, reject)
      );
    });
  },

  getProductColors: (productId) => {
    return new Promise((resolve, reject) => {
      db.query(
        `
        SELECT * FROM product_color_relations WHERE product_id = ${productId}
      `,
        (err, res) => queryHandler(err, res, resolve, reject)
      );
    });
  },

  getColorsFromRelation: (colorIds) => {
    return new Promise((resolve, reject) => {
      db.query(
        `
        SELECT * FROM colors WHERE color_id in (?)
      `,
        [colorIds],
        (err, result) => queryHandler(err, result, resolve, reject)
      );
    });
  },
};

module.exports = Color;
