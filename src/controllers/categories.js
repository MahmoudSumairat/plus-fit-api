const Category = require("../models/Category");
const handleResError = require("../helpers/errorHandler");
const handleResSuccess = require("../helpers/successHandler");
const {
  LOOKUP_DATA_ADDED,
  LOOKUP_DATA_UPDATE,
  LOOKUP_DATA_DELETE,
  LOOKUP_DATA_RETRIEVE,
} = require("../constants/responseMessages");

exports.addCategory = async ({ body }, res) => {
  try {
    const category = new Category(body);
    const insertId = await category.addCategory();
    handleResSuccess(res, LOOKUP_DATA_ADDED, insertId);
  } catch (err) {
    handleResError(err, res);
  }
};

exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Category.getAllCategories();
    handleResSuccess(res, LOOKUP_DATA_RETRIEVE, categories);
  } catch (err) {
    handleResError(err, res);
  }
};

exports.updateCategory = async ({ body, params: { id } }, res) => {
  try {
    const category = new Category({ ...body, id });
    const updatedData = await category.updateCategory();
    handleResSuccess(res, LOOKUP_DATA_UPDATE, updatedData);
  } catch (err) {
    handleResError(err, res);
  }
};

exports.deleteCategory = ({ params: { id } }, res) => {
  try {
    const category = new Category({ id });
    const deletedId = category.deleteCategory();
    handleResSuccess(res, LOOKUP_DATA_DELETE, deletedId);
  } catch (err) {
    handleResError(err, res);
  }
};
