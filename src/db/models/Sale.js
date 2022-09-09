const queryHandler = require("../../helpers/queryHandler");
const db = require("../connection/dbConnect");

const Sale = {
  createSale: (saleData) => {
    return new Promise((resolve, reject) => {
      db.query(
        `
            
                INSERT INTO sales (value, product_id) VALUES (?) 
            
            `,
        [saleData],
        (err, res) => queryHandler(err, res, resolve, reject)
      );
    });
  },

  getProductSale: (productId) => {
    return new Promise((resolve, reject) => {
      db.query(
        `
        
            SELECT * FROM sales WHERE product_id = ?
        
        `,
        productId,
        (err, res) => queryHandler(err, res, resolve, reject)
      );
    });
  },

  updateSale: (value, saleId) => {
    return new Promise((resolve, reject) => {
      db.query(
        `
        
            UPDATE sales SET value = ?
            WHERE sale_id = ?
        
        `,
        [value, saleId],
        (err, res) => queryHandler(err, res, resolve, reject)
      );
    });
  },

  deleteSate: (saleId) => {
    return new Promise((resolve, reject) => {
      db.query(
        `
        
            DELETE FROM sales WHERE sale_id = ?
        
        `,
        saleId,
        (err, res) => queryHandler(err, res, resolve, reject)
      );
    });
  },
};

module.exports = Sale;
