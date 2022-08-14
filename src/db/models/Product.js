const queryHandler = require("../../helpers/queryHandler");

const db = require("../connection/dbConnect.js");

const Product = {
  addProduct: (row) => {
    return new Promise((resolve, reject) => {
      db.query(
        `
        INSERT INTO products (title, price, rate, quantity, brand_id, manufacture_id, country_id, type_id, category_id) VALUES (?)
        `,
        [row],
        (err, result) => queryHandler(err, result, resolve, reject)
      );
    });
  },
};

module.exports = Product;
