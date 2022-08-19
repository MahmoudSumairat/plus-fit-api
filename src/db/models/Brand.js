const queryHandler = require("../../helpers/queryHandler");
const db = require("../connection/dbConnect");

const Brand = {
  getAllBrands: () => {
    return new Promise((resolve, reject) => {
      db.query(
        `
        SELECT * FROM brands WHERE brand_id > 0
      `,
        (err, res) => queryHandler(err, res, resolve, reject)
      );
    });
  },

  addBrand: (brandData) => {
    return new Promise((resolve, reject) => {
      db.query(
        `
      
        INSERT INTO brands (title) VALUES (?)
      
      `,
        brandData,
        (err, res) => queryHandler(err, res, resolve, reject)
      );
    });
  },

  deleteBrand: (brandId) => {
    return new Promise((resolve, reject) => {
      db.query(
        `
      
        DELETE FROM brands WHERE brand_id = ${brandId}

      `,
        (err, res) => queryHandler(err, res, resolve, reject)
      );
    });
  },

  updateBrand: (brandData) => {
    return new Promise((resolve, reject) => {
      db.query(
        `
      
        UPDATE brands SET title = ? WHERE brand_id = ?
      
      `,
        brandData,
        (err, res) => queryHandler(err, res, resolve, reject)
      );
    });
  },

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
