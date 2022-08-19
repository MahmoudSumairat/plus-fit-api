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

  addCategory: (categoryData) => {
    return new Promise((resolve, reject) => {
      db.query(
        `

        INSERT INTO categories (title) VALUES (?)
      
      `,
        categoryData,
        (err, res) => queryHandler(err, res, resolve, reject)
      );
    });
  },

  getAllCategories: () => {
    return new Promise((resolve, reject) => {
      db.query(
        `
      
        SELECT * FROM categories WHERE category_id > 0
  
      `,
        (err, res) => queryHandler(err, res, resolve, reject)
      );
    });
  },

  updateCategory: (categoryData) => {
    return new Promise((resolve, reject) => {
      db.query(
        `
        UPDATE categories SET title = ? WHERE category_id = ?
      
      `,
        categoryData,
        (err, res) => queryHandler(err, res, resolve, reject)
      );
    });
  },

  deleteCategory: (categoryId) => {
    return new Promise((resolve, reject) => {
      db.query(
        `

          DELETE FROM categories WHERE category_id = ${categoryId}
        
        `,
        (err, res) => queryHandler(err, res, resolve, reject)
      );
    });
  },
};

module.exports = Category;
