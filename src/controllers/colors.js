const handleResError = require("../helpers/errorHandler");
const handleResSuccess = require("../helpers/successHandler");
const {
  LOOKUP_DATA_ADDED,
  LOOKUP_DATA_UPDATE,
  LOOKUP_DATA_DELETE,
  LOOKUP_DATA_RETRIEVE,
} = require("../constants/responseMessages");
const Color = require("../models/Color");

exports.addColor = async ({ body }, res) => {
  try {
    const color = new Color(body);
    const insertedId = await color.addColor();
    handleResSuccess(res, LOOKUP_DATA_ADDED, insertedId);
  } catch (err) {
    handleResError(err, res);
  }
};

exports.getAllColors = async (req, res) => {
  try {
    const colors = await Color.getAllColors();
    handleResSuccess(res, LOOKUP_DATA_RETRIEVE, colors);
  } catch (err) {
    handleResError(err, res);
  }
};

exports.updateColor = async ({ body, params: { id } }, res) => {
  try {
    const color = new Color({ ...body, id });
    const updatedData = await color.updateColor();
    handleResSuccess(res, LOOKUP_DATA_UPDATE, updatedData);
  } catch (err) {
    handleResError(err, res);
  }
};

exports.deleteColor = async ({ params: { id } }, res) => {
  try {
    const color = new Color({ id });
    const deletedId = await color.deleteColor();
    handleResSuccess(res, LOOKUP_DATA_DELETE, deletedId);
  } catch (err) {
    handleResError(err);
  }
};
