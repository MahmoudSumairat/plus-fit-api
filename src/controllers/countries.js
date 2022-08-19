const handleResError = require("../helpers/errorHandler");
const handleResSuccess = require("../helpers/successHandler");
const {
  LOOKUP_DATA_ADDED,
  LOOKUP_DATA_UPDATE,
  LOOKUP_DATA_DELETE,
  LOOKUP_DATA_RETRIEVE,
} = require("../constants/responseMessages");
const Country = require("../models/Country");

exports.addCountry = async ({ body }, res) => {
  try {
    const country = new Country(body);
    const insertedId = await country.addCountry();
    handleResSuccess(res, LOOKUP_DATA_ADDED, insertedId);
  } catch (err) {
    handleResError(err, res);
  }
};

exports.getAllCountries = async (req, res) => {
  try {
    const countries = await Country.getAllCountries();
    handleResSuccess(res, LOOKUP_DATA_RETRIEVE, countries);
  } catch (err) {
    handleResError(err);
  }
};

exports.updateCountry = async ({ body, params: { id } }, res) => {
  try {
    const country = new Country({ ...body, id });
    const updatedData = await country.updateCountry();
    handleResSuccess(res, LOOKUP_DATA_UPDATE, updatedData);
  } catch (err) {
    handleResError(err, res);
  }
};

exports.deleteCountry = async ({ params: { id } }, res) => {
  try {
    const country = new Country(id);
    const deletedId = await country.deleteCountry();
    handleResSuccess(res, LOOKUP_DATA_DELETE, deletedId);
  } catch (err) {
    handleResError(err, res);
  }
};
