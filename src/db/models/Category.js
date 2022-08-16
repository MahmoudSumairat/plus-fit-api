const queryHandler = require("../../helpers/queryHandler");
const db = require("../connection/dbConnect");

const Category = {
  getCategoryDetails: (categoryId) => {
    return new Promise((resolve, reject) => {
      db.query(
        `
                SELECT * FROM categories WHERE category_id = ${categoryId}
            `,
        (err, res) => queryHandler(err, res, resolve, reject)
      );
    });
  },
};

module.exports = Category;
