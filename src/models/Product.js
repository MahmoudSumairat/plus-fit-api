const Color = require("./Color");
const Size = require("./Size");
const productDB = require("../db/models/Product");
const imageDB = require("../db/models/Image");
const productService = require("../services/product");

class Product {
  productData = {
    title: "",
    price: 0,
    quantity: 0,
    rate: 0,
    brandId: 0,
    manufactureId: 0,
    countryId: 0,
    typeId: 0,
    categoryId: 0,
  };

  constructor(data) {
    if (Object.entries(data).length) {
      this.productData = { ...data };
    }
  }

  static getAllProducts = async (limit, offset) => {
    try {
      const result = await productDB.getProducts(limit, offset);
      return Promise.resolve(result);
    } catch (err) {
      throw err;
    }
  };

  static getProductDetails = async (productId) => {
    try {
      const result = await productDB.getProductDetails(productId);
      const productImages = await imageDB.getProductImages(productId);
      return Promise.resolve({ ...result[0], images: productImages });
    } catch (err) {
      throw err;
    }
  };

  static addProductImages = async (images, productId, mainImgIndex) => {
    try {
      const downloadURLs = await productService.uploadProductImages(images);
      const imgRows = downloadURLs.map((url, index) => [
        url,
        +productId,
        mainImgIndex == index,
      ]);
      await imageDB.addProductImages(imgRows);
      const addedImages = downloadURLs.map((url, index) => ({
        url,
        isMainImg: mainImgIndex == index,
      }));
      return Promise.resolve(addedImages);
    } catch (err) {
      throw err;
    }
  };

  addProduct = async () => {
    try {
      const {
        title,
        price,
        rate,
        quantity,
        brandId,
        manufactureId,
        countryId,
        typeId,
        categoryId,
        colorIds,
        sizeIds,
      } = this.productData;
      const addedProductData = {
        title: title,
        price: price,
        rate: rate,
        quantity: quantity,
        brand_id: brandId,
        manufacture_id: manufactureId,
        country_id: countryId,
        type_id: typeId,
        category_id: categoryId,
      };
      const rowData = Object.values(addedProductData);
      const { insertId } = await productDB.addProduct(rowData);
      await this.addProductColors(colorIds, insertId);
      await this.addProductSizes(sizeIds, insertId);
      return Promise.resolve(insertId);
    } catch (err) {
      throw err;
    }
  };

  addProductColors = async (colorIds, productId) => {
    try {
      return await Color.addProductColors(colorIds, productId);
    } catch (err) {
      throw err;
    }
  };

  addProductSizes = async (sizeIds, productId) => {
    try {
      return await Size.addProductSizes(sizeIds, productId);
    } catch (err) {
      throw err;
    }
  };
}

module.exports = Product;
