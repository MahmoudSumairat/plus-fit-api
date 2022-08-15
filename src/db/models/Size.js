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
};

module.exports = Size;
