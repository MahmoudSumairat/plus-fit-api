const handleResError = require("../helpers/errorHandler");
const handleResSuccess = require("../helpers/successHandler");
const Overview = require("../models/Overview");

exports.addOverviews = async ({ body: { rows, productId } }, res) => {
  try {
    const overview = new Overview({ rows, productId });
    await overview.createProductOverview();
    handleResSuccess(res, "overviews added successfully", {
      data: rows,
    });
  } catch (err) {
    handleResError(err, res);
  }
};

exports.getProductOverviews = async ({ params: { productId } }, res) => {
  try {
    const productOverviews = await Overview.getProductOverview(productId);
    handleResSuccess(res, "overview fetched successfully", productOverviews);
  } catch (err) {
    handleResError(err, res);
  }
};

exports.updateOverview = async (
  { params: { overviewId }, body: { content } },
  res
) => {
  try {
    const overview = new Overview({ content, overviewId });
    const updatedData = await overview.updateOverview();
    handleResSuccess(res, "overview updated successfully", updatedData);
  } catch (err) {
    handleResError(err, res);
  }
};

exports.deleteOverview = async ({ params: { overviewId } }, res) => {
  try {
    const overview = new Overview({ overviewId });
    const deletedId = await overview.deleteOverview();
    handleResSuccess(res, "overview deleted successfully", deletedId);
  } catch (err) {
    handleResError(err, res);
  }
};
