const handleResError = require("../helpers/errorHandler");
const handleResSuccess = require("../helpers/successHandler");
const Sale = require("../models/Sale");

exports.addSale = async ({ body }, res) => {
  try {
    console.log(body);
    const sale = new Sale({ ...body });
    const insertedId = await sale.addSale();
    handleResSuccess(res, "sale added successfully", insertedId);
  } catch (err) {
    handleResError(err, res);
  }
};

exports.getProductSale = async ({ params: { productId } }, res) => {
  try {
    const productSale = await Sale.getProductSales(productId);
    handleResSuccess(res, "sale fetched successfully", productSale);
  } catch (err) {
    handleResError(err, res);
  }
};

exports.updateSale = async ({ params: { saleId }, body: { value } }, res) => {
  try {
    const sale = new Sale({ value, saleId });
    const updatedValue = await sale.updateSale();
    handleResSuccess(res, "sale updated successfully", updatedValue);
  } catch (err) {
    handleResError(err, res);
  }
};

exports.deleteSale = async ({ params: { saleId } }, res) => {
  try {
    const sale = new Sale({ saleId });
    const deletedId = await sale.deleteSale();
    handleResSuccess(res, "sale deleted successfully", deletedId);
  } catch (err) {
    handleResError(err, res);
  }
};
