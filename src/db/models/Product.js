const { format } = require("mysql");
const queryHandler = require("../../helpers/queryHandler");
const db = require("../connection/dbConnect.js");

const Product = {
  addProduct: (row) => {
    return new Promise((resolve, reject) => {
      db.query(
        `
        INSERT INTO products (title, price, quantity, brand_id, manufacture_id, country_id, type_id, category_id) VALUES (?)
        `,
        [row],
        (err, result) => queryHandler(err, result, resolve, reject)
      );
    });
  },

  getProducts: (
    limit,
    offset,
    categoryId,
    { colorId, sizeId, brandId, productType, minPrice, maxPrice }
  ) => {
    return new Promise((resolve, reject) => {
      const productTypeCondition = productType
        ? ` AND products.type_id = ${productType}`
        : "";

      const colorFilter = colorId
        ? `RIGHT JOIN product_color_relations ON
        products.product_id = product_color_relations.product_id
        AND product_color_relations.color_id = ${colorId} `
        : ``;

      const sizeFilter = sizeId
        ? `RIGHT JOIN product_size_relations ON 
      products.product_id = product_size_relations.product_id
      AND product_size_relations.size_id = ${sizeId}`
        : ``;

      const brandFilter = brandId ? `AND products.brand_id = ${brandId}` : ``;

      const categoryFilter = categoryId
        ? `AND products.category_id = ${categoryId}`
        : ``;

      const priceFilter =
        minPrice && maxPrice
          ? `AND products.price BETWEEN ${minPrice} AND ${maxPrice}`
          : ``;

      db.query(
        `
        SELECT products.product_id, products.title, products.price, products.rate, products.quantity, images.url as mainImgUrl, products.rates_count FROM products
        RIGHT JOIN images ON products.product_id = images.product_id 
        ${colorFilter}
        ${sizeFilter}
        WHERE products.product_id > 0
        AND images.is_main_img = TRUE
        ${productTypeCondition}
        ${brandFilter}
        ${categoryFilter}
        ${priceFilter}
        LIMIT ${limit}  OFFSET ${offset};


        SELECT COUNT(*) as totalElements FROM products
        `,
        (err, result) => queryHandler(err, result, resolve, reject)
      );
    });
  },

  getProductDetails: (productId, selectedColumns) => {
    return new Promise((resolve, reject) => {
      db.query(
        `
          SELECT ${
            selectedColumns || "*"
          } FROM products WHERE product_id=${productId};
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

  getProductQuantity: (productId) => {
    return new Promise((resolve, reject) => {
      db.query(
        `
      
        SELECT quantity FROM products WHERE product_id = ?
      
      `,
        [productId],
        (err, res) => queryHandler(err, res, resolve, reject)
      );
    });
  },

  selectFromProduct: (productId, selectedColumns) => {
    return new Promise((resolve, reject) => {
      db.query(
        `
      
        SELECT ${selectedColumns || "*"} FROM products WHERE product_id = ?
      
      `,
        productId,
        (err, res) => queryHandler(err, res, resolve, reject)
      );
    });
  },
};

module.exports = Product;
