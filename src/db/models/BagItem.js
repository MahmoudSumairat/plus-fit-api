const { format } = require("mysql");
const queryHandler = require("../../helpers/queryHandler");
const db = require("../connection/dbConnect");
const BagItem = {
  addBagItem: (data) => {
    return new Promise((resolve, reject) => {
      db.query(
        `
                INSERT INTO bag_items (bag_id, product_id, quantity, size_id, color_id, price) VALUES (?)
            
            `,
        [data],
        (err, res) => queryHandler(err, res, resolve, reject)
      );
    });
  },

  getBagItems: (bagId) => {
    return new Promise((resolve, reject) => {
      db.query(
        `
            
                SELECT * FROM bag_items WHERE bag_id = ${bagId}
            
            `,
        (err, res) => queryHandler(err, res, resolve, reject)
      );
    });
  },

  deleteBagItem: (bagItemId) => {
    return new Promise((resolve, reject) => {
      db.query(
        `
        
            DELETE FROM bag_items WHERE bag_item_id = ${bagItemId}
        
        `,
        (err, res) => queryHandler(err, res, resolve, reject)
      );
    });
  },

  updateBagItem: (updateField, updateValue) => {
    return new Promise((resolve, reject) => {
      db.query(
        `
        
            UPDATE bag_items SET ${updateField}
            WHERE bag_item_id = ?
        
        `,
        updateValue,
        (err, res) => queryHandler(err, res, resolve, reject)
      );
    });
  },
};

module.exports = BagItem;
