const brandDB = require("../db/models/Brand");

class Brand {
  brandData = {
    id: "",
    title: "",
  };

  constructor(data) {
    if (Object.values(data).length) {
      this.brandData = { ...data };
    }
  }

  static getAllBrands = async () => {
    try {
      const brands = await brandDB.getAllBrands();
      return Promise.resolve(brands);
    } catch (err) {
      throw err;
    }
  };

  addBrand = async () => {
    try {
      const addRow = [this.brandData.title];
      const { insertId } = await brandDB.addBrand(addRow);
      return Promise.resolve(insertId);
    } catch (err) {
      throw err;
    }
  };

  getBrandDetails = async () => {
    try {
      const { id } = this.brandData;
      const result = await brandDB.getBrandDetails(id);
      return Promise.resolve(result[0]);
    } catch (err) {
      throw err;
    }
  };

  updateBrand = async () => {
    try {
      const { id, title } = this.brandData;
      const editRow = [title, id];
      const result = await brandDB.updateBrand(editRow);
      return Promise.resolve(result);
    } catch (err) {
      throw err;
    }
  };

  deleteBrand = async (brandId) => {
    try {
      const { id } = this.brandData;
      const result = await brandDB.deleteBrand(id);
      return Promise.resolve(result);
    } catch (err) {
      throw err;
    }
  };
}

module.exports = Brand;
