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
      const rows = sizeIds.map((id) => [id, productId]);
      const result = await sizeDB.addProductSize(rows);
      return Promise.resolve(result);
    } catch (err) {
      throw err;
    }
  };

  static getProductSizes = async (productId) => {
    try {
      const sizesResult = await sizeDB.getProductSizes(productId);
      const sizeIds = sizesResult.map((size) => size.size_id);
      const availableSizes = sizeDB.getSizesFromRelation(sizeIds);
      return Promise.resolve(availableSizes);
    } catch (err) {
      throw err;
    }
  };
}

module.exports = Size;
