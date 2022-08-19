const handleResError = require("../helpers/errorHandler");
const handleResSuccess = require("../helpers/successHandler");
const {
  LOOKUP_DATA_ADDED,
  LOOKUP_DATA_UPDATE,
  LOOKUP_DATA_DELETE,
  LOOKUP_DATA_RETRIEVE,
} = require("../constants/responseMessages");
const Type = require("../models/Type");

exports.addType = async ({ body }, res) => {
  try {
    const type = new Type(body);
    const insertedId = type.addType();
    handleResSuccess(res, LOOKUP_DATA_ADDED, insertedId);
  } catch (err) {
    handleResError(err, res);
  }
};

exports.getAllTypes = async (req, res) => {
  try {
    const types = Type.getAllTypes();
    handleResSuccess(res, LOOKUP_DATA_RETRIEVE, types);
  } catch (err) {
    handleResError(err, res);
  }
};

exports.updateType = async ({ body, params: { id } }, res) => {
  try {
    const type = new Type({ ...body, id });
    const updatedData = await type.updateType();
    handleResSuccess(res, LOOKUP_DATA_UPDATE, updatedData);
  } catch (err) {
    handleResError(err, res);
  }
};

exports.deleteType = async ({ params: { id } }, res) => {
  try {
    const type = new Type({ id });
    const deletedId = type.deleteType();
    handleResSuccess(res, LOOKUP_DATA_DELETE, deletedId);
  } catch (err) {
    handleResError(err, res);
  }
};
