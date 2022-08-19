const handleResError = require("../helpers/errorHandler");
const handleResSuccess = require("../helpers/successHandler");
const {
  LOOKUP_DATA_ADDED,
  LOOKUP_DATA_UPDATE,
  LOOKUP_DATA_DELETE,
  LOOKUP_DATA_RETRIEVE,
} = require("../constants/responseMessages");
const Manufacture = require("../models/Manufacture");

exports.addManufacture = async ({ body }, res) => {
  try {
    const manufacture = new Manufacture(body);
    const insertedId = await manufacture.addManufacture();
    handleResSuccess(res, LOOKUP_DATA_ADDED, insertedId);
  } catch (err) {
    handleResError(err, res);
  }
};

exports.getAllManufactures = async (req, res) => {
  try {
    const manufactures = await Manufacture.getAllManufacture();
    handleResSuccess(ers, LOOKUP_DATA_RETRIEVE, manufactures);
  } catch (err) {
    handleResError(err, res);
  }
};

exports.updateManufacture = async ({ body, params: { id } }, res) => {
  try {
    const manufacture = new Manufacture({ ...body, id });
    const updatedData = await manufacture.updateManufacture();
    handleResSuccess(res, LOOKUP_DATA_UPDATE, updatedData);
  } catch (err) {
    handleResError(err, res);
  }
};

exports.deleteManufacture = async ({ params: { id } }, res) => {
  try {
    const manufacture = new Manufacture({ id });
    const deletedId = await manufacture.deleteManufacture();
    handleResSuccess(res, LOOKUP_DATA_DELETE, deletedId);
  } catch (err) {
    handleResError(err, res);
  }
};
