const queryHandler = require("../../helpers/queryHandler");
const db = require("../connection/dbConnect");

const Color = {
  addProductColors: (rows) => {
    return new Promise((resolve, reject) => {
      db.query(
        `
        INSERT INTO product_color_relations (color_id, product_id) VALUES (?)
        `,
        rows,
        (err, result) => queryHandler(err, result, resolve, reject)
      );
    });
  },
};

module.exports = Color;
