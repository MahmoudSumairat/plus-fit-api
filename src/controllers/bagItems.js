const {
  BAG_ITEM_FETCH_SUCCESS,
  BAG_ITEM_ADD_SUCCESS,
  BAG_ITEM_UPDATE,
  BAG_ITEM_DELETE,
} = require("../constants/responseMessages");
const handleResError = require("../helpers/errorHandler");
const handleResSuccess = require("../helpers/successHandler");
const BagItem = require("../models/BagItem");

exports.getBagItems = async (req, res) => {
  try {
    const {
      userData: { bagId },
    } = req.headers;
    const bagItems = await BagItem.getBagItems(bagId);
    handleResSuccess(res, BAG_ITEM_FETCH_SUCCESS, bagItems);
  } catch (err) {
    handleResError(err, res);
  }
};

exports.addBagItem = async ({ body, headers }, res) => {
  try {
    const {
      userData: { bagId },
    } = headers;
    const bagItem = new BagItem({ ...body, bagId });
    const insertedId = await bagItem.addBagItem();
    handleResSuccess(res, BAG_ITEM_ADD_SUCCESS, insertedId);
  } catch (err) {
    handleResError(err, res);
  }
};

exports.updateBagItem = async ({ body, params }, res) => {
  try {
    const { bagItemId } = params;
    const { updateField, updateValue, productId } = body;
    const bagItem = new BagItem({ id: bagItemId });
    const updatedValue = await bagItem.updateBagItem(
      updateField,
      updateValue,
      productId
    );
    handleResSuccess(res, BAG_ITEM_UPDATE, updatedValue);
  } catch (err) {
    handleResError(err, res);
  }
};

exports.deleteBagItem = async ({ params }, res) => {
  try {
    const { bagItemId } = params;
    const bagItem = new BagItem({ id: bagItemId });
    const deletedId = await bagItem.deleteBagItem();
    handleResSuccess(res, BAG_ITEM_DELETE, deletedId);
  } catch (err) {
    handleResError(err, res);
  }
};

exports.getBagItemsCounts = async ({ headers: { userData } }, res) => {
  try {
    const { bagId } = userData;

    const count = await BagItem.getBagItemsCounts(bagId);
    handleResSuccess(res, "bag items count fetched successfully", count);
  } catch (err) {
    handleResError(err, res);
  }
};
