const { NO_PRODUCT_ID, EMPTY_IDS } = require("../constants/responseMessages");
const { VALIDATION_ERROR } = require("../constants/statusCodes");
const sizeDB = require("../db/models/Size");

class Size {
  sizeData = {
    title: "",
  };

  constructor(data) {
    if (Object.entries(data).length) {
      this.sizeData = { ...data };
    }
  }

  static addProductSizes = async (sizeIds, productId) => {
    try {
      if (!productId) {
        return Promise.reject({
          status: VALIDATION_ERROR,
          message: NO_PRODUCT_ID,
        });
      }
      if (!sizeIds || !sizeIds.length) {
        return Promise.reject({
          status: VALIDATION_ERROR,
          message: EMPTY_IDS,
        });
      }
      const rows = sizeIds.map((id) => [id, productId]);
      const result = await sizeDB.addProductSize(rows);
      return Promise.resolve(result);
    } catch (err) {
      throw err;
    }
  };
}

module.exports = Size;
