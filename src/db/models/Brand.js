const queryHandler = require("../../helpers/queryHandler");
const db = require("../connection/dbConnect");

const Brand = {
  getBrandDetails: (brandId) => {
    return new Promise((resolve, reject) => {
      db.query(
        `
                SELECT * FROM brands WHERE brand_id = ${brandId}
            `,
        (err, res) => queryHandler(err, res, resolve, reject)
      );
    });
  },
};

module.exports = Brand;
