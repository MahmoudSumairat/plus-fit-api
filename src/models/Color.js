const { EMPTY_IDS, NO_PRODUCT_ID } = require("../constants/responseMessages");
const { VALIDATION_ERROR } = require("../constants/statusCodes");
const colorDB = require("../db/models/Color");

class Color {
  colorData = {
    title: "",
  };
  constructor(data) {
    if (Object.entries(data).length) {
      this.colorData = { ...data };
    }
  }

  static addProductColors = async (colorIds, productId) => {
    try {
      if (!colorIds || !colorIds.length) {
        return Promise.reject({ status: VALIDATION_ERROR, message: EMPTY_IDS });
      }
      if (!productId) {
        return Promise.reject({
          status: VALIDATION_ERROR,
          message: NO_PRODUCT_ID,
        });
      }
      const rows = colorIds.map((id) => [id, productId]);
      const results = await colorDB.addProductColors(rows);
      return Promise.resolve(results);
    } catch (err) {
      throw err;
    }
  };
}

module.exports = Color;
