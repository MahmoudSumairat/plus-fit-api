const handleResError = require("../helpers/errorHandler");
const handleResSuccess = require("../helpers/successHandler");
const Address = require("../models/Address");

exports.addAddress = async ({ body, headers }, res) => {
  try {
    const {
      userData: { user_id: userId },
    } = headers;
    const address = new Address({ ...body, userId });
    const { insertId } = await address.create();
    handleResSuccess(res, "address created successfully", insertId);
  } catch (err) {
    handleResError(err, res);
  }
};

exports.getAddressById = async ({ params: { addressId } }, res) => {
  try {
    const addressData = await Address.getAddressById(addressId);
    handleResSuccess(res, "address fetched successfully", {
      data: addressData,
    });
  } catch (err) {
    handleResError(err, res);
  }
};

exports.updateAddress = async (
  { params: { addressId }, body: { addressData } },
  res
) => {
  try {
    const address = new Address({ ...addressData, addressId });
    const updatedData = await address.updateAddress();
    handleResSuccess(res, "address updated successfully", {
      data: updatedData,
    });
  } catch (err) {
    handleResError(err, res);
  }
};

exports.deleteAddress = async ({ params: { addressId } }, res) => {
  try {
    const address = new Address({ addressId });
    const deletedId = await address.deleteAddress();
    handleResSuccess(res, "address deleted successfully", { data: deletedId });
  } catch (err) {
    handleResError(err, res);
  }
};
