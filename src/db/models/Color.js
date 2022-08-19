const queryHandler = require("../../helpers/queryHandler");
const db = require("../connection/dbConnect");

const Color = {
  addProductColors: (rows) => {
    return new Promise((resolve, reject) => {
      db.query(
        `
        INSERT INTO product_color_relations (color_id, product_id) VALUES ?
        `,
        [rows],
        (err, result) => queryHandler(err, result, resolve, reject)
      );
    });
  },

  updateProductColors: (newColors, productId) => {
    return new Promise((resolve, reject) => {
      db.query(
        `
        DELETE FROM product_color_relations WHERE product_id = ${productId};
        INSERT INTO product_color_relations (color_id, product_id) VALUES ?
      `,
        [newColors],
        (err, res) => queryHandler(err, res, resolve, reject)
      );
    });
  },

  getProductColors: (productId) => {
    return new Promise((resolve, reject) => {
      db.query(
        `
        SELECT * FROM product_color_relations WHERE product_id = ${productId}
      `,
        (err, res) => queryHandler(err, res, resolve, reject)
      );
    });
  },

  getColorsFromRelation: (colorIds) => {
    return new Promise((resolve, reject) => {
      db.query(
        `
        SELECT * FROM colors WHERE color_id in (?)
      `,
        [colorIds],
        (err, result) => queryHandler(err, result, resolve, reject)
      );
    });
  },

  addColor: (colorData) => {
    return new Promise((resolve, reject) => {
      db.query(
        `
        
        INSERT INTO colors (title) VALUES (?)
      
      `,
        colorData,
        (err, res) => queryHandler(err, res, resolve, reject)
      );
    });
  },

  getAllColors: () => {
    return new Promise((resolve, reject) => {
      db.query(
        `

        SELECT * FROM colors WHERE color_id > 0
      
      `,
        (err, res) => queryHandler(err, res, resolve, reject)
      );
    });
  },

  updateColor: (colorData) => {
    return new Promise((resolve, reject) => {
      db.query(
        `

          UPDATE colors SET title = ? WHERE color_id = ?
        
        `,
        colorData,
        (err, res) => queryHandler(err, res, resolve, reject)
      );
    });
  },

  deleteColor: (colorId) => {
    return new Promise((resolve, reject) => {
      db.query(
        `
      
        DELETE FROM colors WHERE color_id = ${colorId}

      `,
        (err, res) => queryHandler(err, res, resolve, reject)
      );
    });
  },
};

module.exports = Color;
