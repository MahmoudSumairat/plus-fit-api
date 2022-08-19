const { async } = require("@firebase/util");
const categoryDB = require("../db/models/Category");

class Category {
  categoryData = {
    id: "",
    title: "",
  };

  constructor(data) {
    if (Object.values(data).length) {
      this.categoryData = { ...data };
    }
  }

  static getAllCategories = async () => {
    try {
      const categories = categoryDB.getAllCategories();
      return Promise.resolve(categories);
    } catch (err) {
      throw err;
    }
  };

  addCategory = async () => {
    try {
      const { title } = this.categoryData;
      const addDataRow = [title];
      const { insertId } = await categoryDB.addCategory(addDataRow);
      return Promise.resolve(insertId);
    } catch (err) {
      throw err;
    }
  };

  updateCategory = async () => {
    try {
      const { id, title } = this.categoryData;
      const updateDataRow = [title, id];
      await categoryDB.updateCategory(updateDataRow);
      return Promise.resolve(title);
    } catch (err) {
      throw err;
    }
  };

  deleteCategory = async () => {
    try {
      const { id } = this.categoryData;
      await categoryDB.deleteCategory(id);
      return Promise.resolve(id);
    } catch (err) {
      throw err;
    }
  };

  getCategoryDetails = async () => {
    try {
      const { id } = this.categoryData;
      const brandDetailsRes = await categoryDB.getCategoryDetails(id);
      return Promise.resolve(brandDetailsRes[0]);
    } catch (err) {
      throw err;
    }
  };
}

module.exports = Category;
