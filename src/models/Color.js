const { async } = require("@firebase/util");
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

  static updateProductColors = async (colorIds, productId) => {
    try {
      const rows = colorIds.map((id) => [id, productId]);
      const colorsResult = await colorDB.updateProductColors(rows, productId);
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
      return Promise.resolve(availableColors);
    } catch (err) {
      throw err;
    }
  };

  static getAllColors = async () => {
    try {
      const colors = await colorDB.getAllColors();
      return Promise.resolve(colors);
    } catch (err) {
      throw err;
    }
  };

  addColor = async () => {
    try {
      const { title } = this.colorData;
      const addDataRow = [title];
      const { insertId } = await colorDB.addColor(addDataRow);
      return Promise.resolve(insertId);
    } catch (err) {
      throw err;
    }
  };

  updateColor = async () => {
    try {
      const { title, id } = this.colorData;
      const updateDataRow = [title, id];
      await colorDB.updateColor(updateDataRow);
      return Promise.resolve(title);
    } catch (err) {
      throw err;
    }
  };

  deleteColor = async () => {
    try {
      const { id } = this.colorData;
      await colorDB.deleteColor(id);
      console.log(id);
      return Promise.resolve(id);
    } catch (err) {
      throw err;
    }
  };
}

module.exports = Color;
