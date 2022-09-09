const queryHandler = require("../../helpers/queryHandler");
const db = require("../connection/dbConnect");

const Overview = {
  addOverviews: (rows) => {
    return new Promise((resolve, reject) => {
      db.query(
        `
            
                INSERT INTO overviews (content, product_id) VALUES ?
            
            `,
        [rows],
        (err, res) => queryHandler(err, res, resolve, reject)
      );
    });
  },

  deleteOverview: (overviewId) => {
    return new Promise((resolve, reject) => {
      db.query(
        `
        
            DELETE FROM overviews WHERE overview_id = ?
        
        `,
        overviewId,
        (err, res) => queryHandler(err, res, resolve, reject)
      );
    });
  },

  getProductOverviews: (productId) => {
    return new Promise((resolve, reject) => {
      db.query(
        `
        
            SELECT * FROM overviews WHERE product_id = ?
        
        `,
        productId,
        (err, res) => queryHandler(err, res, resolve, reject)
      );
    });
  },

  updateProductOverview: (overviewData, overviewId) => {
    return new Promise((resolve, reject) => {
      db.query(
        `
        
            UPDATE overviews SET content = ? WHERE overview_id = ?
        
        `,
        [overviewData, overviewId],
        (err, res) => queryHandler(err, res, resolve, reject)
      );
    });
  },
};

module.exports = Overview;
