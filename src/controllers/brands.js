const Brand = require("../models/Brand");
const handleResError = require("../helpers/errorHandler");
const handleResSuccess = require("../helpers/successHandler");
const {
  LOOKUP_DATA_ADDED,
  LOOKUP_DATA_UPDATE,
  LOOKUP_DATA_DELETE,
  LOOKUP_DATA_RETRIEVE,
} = require("../constants/responseMessages");

exports.getAllBrands = async (req, res) => {
  try {
    const result = await Brand.getAllBrands();
    handleResSuccess(res, LOOKUP_DATA_RETRIEVE, result);
  } catch (err) {
    handleResError(err, res);
  }
};

exports.addBrand = async ({ body }, res) => {
  try {
    const brand = new Brand(body);
    const result = await brand.addBrand();
    handleResSuccess(res, LOOKUP_DATA_ADDED, result);
  } catch (err) {
    handleResError(err, res);
  }
};

exports.updateBrand = async ({ body, params: { brandId } }, res) => {
  try {
    const brand = new Brand({ ...body, id: brandId });
    await brand.updateBrand();
    handleResSuccess(res, LOOKUP_DATA_UPDATE, body);
  } catch (err) {
    handleResError(err, res);
  }
};

exports.deleteBrand = async ({ params: { brandId } }, res) => {
  try {
    const brand = new Brand({ id: brandId });
    await brand.deleteBrand();
    handleResSuccess(res, LOOKUP_DATA_DELETE, brandId);
  } catch (err) {
    handleResError(err, res);
  }
};
