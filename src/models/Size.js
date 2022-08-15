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
}

module.exports = Size;
