const {
  PRODUCT_ADD_SUCCESS,
  PRODUCTS_FETCH_SUCCESS,
  PRODUCT_DETAILS_FETCH_SUCCESS,
  PRODUCT_IMAGES_ADDED,
  PRODUCT_UPDATE_SUCCESS,
} = require("../constants/responseMessages");
const handleResError = require("../helpers/errorHandler");
const handleResSuccess = require("../helpers/successHandler");
const Product = require("../models/Product");

exports.addProduct = async ({ body }, res) => {
  try {
    const product = new Product(body);
    const insertedId = await product.addProduct();
    const uploadImgsRes = await product.addProductImages();
    console.log(uploadImgsRes);
    handleResSuccess(res, PRODUCT_ADD_SUCCESS, { ...body, id: insertedId });
  } catch (err) {
    handleResError(err, res);
  }
};

exports.getAllProducts = async ({ query }, res) => {
  try {
    const { pageSize: limit, pageNumber: offset } = query;
    const products = await Product.getAllProducts(limit, offset);
    handleResSuccess(res, PRODUCTS_FETCH_SUCCESS, products);
  } catch (err) {
    handleResError(err, res);
  }
};

exports.getProductDetails = async ({ params }, res) => {
  try {
    const { productId } = params;
    const result = await Product.getProductDetails(productId);
    handleResSuccess(res, PRODUCT_DETAILS_FETCH_SUCCESS, result);
  } catch (err) {
    handleResError(err, res);
  }
};

exports.uploadProductImages = async ({ files, body }, res) => {
  try {
    const { productId, mainImageIndex } = body;
    const { images } = files;
    const imgs = await Product.addProductImages(
      images,
      productId,
      mainImageIndex
    );

    handleResSuccess(res, PRODUCT_IMAGES_ADDED, imgs);
  } catch (err) {
    handleResError(err, res);
  }
};

exports.updateProduct = async (
  { body: { productData }, params: { productId } },
  res
) => {
  try {
    const product = new Product({ ...productData, id: +productId });
    const result = await product.updateProduct();
    handleResSuccess(res, PRODUCT_UPDATE_SUCCESS, result);
  } catch (err) {
    handleResError(err, res);
  }
};
