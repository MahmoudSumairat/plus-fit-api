const {
  PRODUCT_ADD_SUCCESS,
  PRODUCT_FETCH_SUCCESS,
} = require("../constants/responseMessages");
const { SUCCESS } = require("../constants/statusCodes");
const handleResError = require("../helpers/errorHandler");
const Product = require("../models/Product");

exports.addProduct = async ({ body }, res) => {
  try {
    const product = new Product(body);
    const insertedId = await product.addProduct();
    res
      .status(SUCCESS)
      .json({
        message: PRODUCT_ADD_SUCCESS,
        data: { ...body, id: insertedId },
      });
  } catch (err) {
    handleResError(err, res);
  }
};

exports.getAllProducts = async ({ query }, res) => {
  try {
    const { pageSize: limit, pageNumber: offset } = query;
    const products = await Product.getAllProducts(limit, offset);
    res
      .status(SUCCESS)
      .json({ message: PRODUCT_FETCH_SUCCESS, data: products });
  } catch (err) {
    handleResError(err, res);
  }
};
