const handleResError = require("../helpers/errorHandler");
const handleResSuccess = require("../helpers/successHandler");
const Size = require("../models/Size");

exports.getAllSizes = async (req, res) => {
  try {
    const sizes = await Size.getAllSizes();
    handleResSuccess(res, "sizes fetched successfully", sizes);
  } catch (err) {
    handleResError(err, res);
  }
};
