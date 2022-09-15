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
            
                SELECT
                bag_items.size_id AS selectedSize,
                bag_items.color_id AS selectedColor,
                bag_items.bag_item_id as bagItemId,
                bag_items.quantity,
                bag_items.price,
                images.url as imgUrl,
                products.product_id as productId,
                products.title
                FROM bag_items RIGHT JOIN images
                ON bag_items.product_id = images.product_id
                RIGHT JOIN products ON products.product_id = bag_items.product_id
                WHERE bag_items.bag_id = ${bagId} AND images.is_main_img = TRUE
            
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

  getBagItemByBagAndProductId: (productId, bagId) => {
    return new Promise((resolve, reject) => {
      db.query(
        `
      
        SELECT * FROM bag_items WHERE product_id = ? AND bag_id = ?

      
      `,
        [productId, bagId],
        (err, res) => queryHandler(err, res, resolve, reject)
      );
    });
  },

  getBagItemsCounts: (bagId) => {
    return new Promise((resolve, reject) => {
      db.query(
        `
      

        SELECT COUNT(*) as count FROM bag_items WHERE bag_id = ?
      
      
      `,
        bagId,
        (err, res) => queryHandler(err, res, resolve, reject)
      );
    });
  },

  emptyBag: (bagId) => {
    return new Promise((resolve, reject) => {
      db.query(
        `
      
        DELETE FROM bag_items WHERE bag_id = ?
      
      `,
        bagId,
        (err, res) => queryHandler(err, res, resolve, reject)
      );
    });
  },
};

module.exports = BagItem;
