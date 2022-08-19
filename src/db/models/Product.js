const queryHandler = require("../../helpers/queryHandler");
const db = require("../connection/dbConnect.js");

const Product = {
  addProduct: (row) => {
    return new Promise((resolve, reject) => {
      db.query(
        `
        INSERT INTO products (title, price, rate, quantity, brand_id, manufacture_id, country_id, type_id, category_id) VALUES (?)
        `,
        [row],
        (err, result) => queryHandler(err, result, resolve, reject)
      );
    });
  },

  getProducts: (limit, offset, productType) => {
    return new Promise((resolve, reject) => {
      const productTypeCondition = productType
        ? ` AND products.type_id = ${productType}`
        : "";
      db.query(
        `
        SELECT products.product_id, products.title, products.price, products.rate, products.quantity, images.url as mainImgUrl FROM products
        RIGHT JOIN images ON products.product_id = images.product_id 
        WHERE products.product_id > 0
        AND images.is_main_img = TRUE
        ${productTypeCondition}
        LIMIT ${limit}  OFFSET ${offset}
        `,
        (err, result) => queryHandler(err, result, resolve, reject)
      );
    });
  },

  getProductDetails: (productId) => {
    return new Promise((resolve, reject) => {
      db.query(
        `
          SELECT * FROM products WHERE product_id=${productId};
        `,
        (err, result) => queryHandler(err, result, resolve, reject)
      );
    });
  },

  updateProduct: (updatedFields, productData) => {
    return new Promise((resolve, reject) => {
      db.query(
        `

        UPDATE products SET ${updatedFields}
        WHERE product_id = ?
      
      `,
        productData,
        (err, result) => queryHandler(err, result, resolve, reject)
      );
    });
  },
};

module.exports = Product;
