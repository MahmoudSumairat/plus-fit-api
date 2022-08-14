const handleResError = require("../helpers/errorHandler");
const Product = require("../models/Product");

exports.addProduct = async ({ body }, res) => {
  try {
    const product = new Product(body);
    const insertedId = await product.addProduct();
    res
      .status(200)
      .json({ message: "product added", data: { ...body, id: insertedId } });
  } catch (err) {
    handleResError(err, res);
  }
};
