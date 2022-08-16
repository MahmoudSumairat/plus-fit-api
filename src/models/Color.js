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
      const colorsResult = await colorDB.addProductColors(rows);
      return Promise.resolve(colorsResult);
    } catch (err) {
      throw err;
    }
  };

  static getProductColors = async (productId) => {
    try {
      const colorsResult = await colorDB.getProductColors(productId);
      const colorIds = colorsResult.map((color) => color.color_id);
      const availableColors = await colorDB.getColorsFromRelation(colorIds);
      console.log(colorIds, availableColors);
      return Promise.resolve(availableColors);
    } catch (err) {
      throw err;
    }
  };
}

module.exports = Color;
