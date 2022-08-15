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
      const rows = colorIds.map((id) => [id, productId]);
      const results = await colorDB.addProductColors(rows);
      return Promise.resolve(results);
    } catch (err) {
      throw err;
    }
  };
}

module.exports = Color;
