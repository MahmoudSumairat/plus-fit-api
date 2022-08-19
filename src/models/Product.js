const Color = require("./Color");
const Size = require("./Size");
const Brand = require("./Brand");
const Category = require("./Category");
const productDB = require("../db/models/Product");
const imageDB = require("../db/models/Image");
const productService = require("../services/product");
const getDBUpdateFields = require("../helpers/getDBUpdateFields");
const getUpdateDataRow = require("../helpers/getUpdateDataRow");
const Country = require("./Country");
const Manufacture = require("./Manufacture");
const Type = require("./Type");

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

  static getAllProducts = async (limit, offset, productType) => {
    try {
      const result = await productDB.getProducts(limit, offset, productType);
      return Promise.resolve(result);
    } catch (err) {
      throw err;
    }
  };

  static getProductDetails = async (productId) => {
    try {
      const result = await productDB.getProductDetails(productId);
      const productDetails = result[0];
      const {
        brand_id,
        manufacture_id,
        country_id,
        type_id,
        category_id,
        product_id,
      } = productDetails;

      const productImages = await this.getProductImages(productId);
      const productBrand = await this.getProductBrand(brand_id);
      const productManufacture = await this.getProductManufacture(
        manufacture_id
      );
      const productCountry = await this.getProductCountry(country_id);
      const productType = await this.getProductType(type_id);
      const productCategory = await this.getProductCategory(category_id);
      const productColors = await this.getProductColors(product_id);
      const productSizes = await this.getProductSizes(product_id);
      return Promise.resolve({
        ...productDetails,
        images: productImages,
        brand: productBrand,
        manufacture: productManufacture,
        country: productCountry,
        type: productType,
        category: productCategory,
        availableColors: productColors,
        availableSizes: productSizes,
      });
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

  static getProductImages = async (productId) => {
    try {
      const productImages = await imageDB.getProductImages(productId);
      return Promise.resolve(productImages);
    } catch (err) {
      throw err;
    }
  };

  static getProductBrand = async (brandId) => {
    try {
      const brand = new Brand({ id: brandId });
      const productBrand = await brand.getBrandDetails();
      return Promise.resolve(productBrand);
    } catch (err) {
      throw err;
    }
  };

  static getProductManufacture = async (manufactureId) => {
    try {
      const manufacture = new Manufacture({ id: manufactureId });
      const manufactureDetail = await manufacture.getManufactureDetails();
      return Promise.resolve(manufactureDetail);
    } catch (err) {
      throw err;
    }
  };

  static getProductCountry = async (countryId) => {
    try {
      const country = new Country({ id: countryId });
      const productCountry = country.getCountryDetails();
      return Promise.resolve(productCountry);
    } catch (err) {
      throw err;
    }
  };

  static getProductType = async (typeId) => {
    try {
      const type = new Type({ id: typeId });
      const productTypeDetails = await type.getTypeDetails();
      return Promise.resolve(productTypeDetails);
    } catch (err) {
      throw err;
    }
  };

  static getProductCategory = async (categoryId) => {
    try {
      const category = new Category({ id: categoryId });
      const categoryDetails = await category.getCategoryDetails();
      return Promise.resolve(categoryDetails);
    } catch (err) {
      throw err;
    }
  };

  static getProductColors = async (productId) => {
    try {
      const productColorsRes = await Color.getProductColors(productId);
      return Promise.resolve(productColorsRes);
    } catch (err) {
      throw err;
    }
  };

  static getProductSizes = async (productId) => {
    try {
      const productSizeRes = await Size.getProductSizes(productId);
      return Promise.resolve(productSizeRes);
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

  updateProduct = async () => {
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
        id,
        colorIds,
        sizeIds,
      } = this.productData;

      const updateProductData = {
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
      if (colorIds && colorIds.length) {
        await this.updateProductColors();
      }
      if (sizeIds && sizeIds.length) {
        await this.updateProductSizes();
      }
      const updateDataRow = getUpdateDataRow(updateProductData, id);
      const updateFields = getDBUpdateFields(updateProductData);
      await productDB.updateProduct(updateFields, updateDataRow);
      return Promise.resolve(this.productData);
    } catch (err) {
      throw err;
    }
  };

  updateProductColors = async () => {
    try {
      const { colorIds, id } = this.productData;
      const result = await Color.updateProductColors(colorIds, id);
      return Promise.resolve(result);
    } catch (err) {
      throw err;
    }
  };

  updateProductSizes = async () => {
    try {
      const { sizeIds, id } = this.productData;
      const result = await Size.updateProductSizes(sizeIds, id);
      return Promise.resolve(result);
    } catch (err) {
      throw err;
    }
  };
}

module.exports = Product;
