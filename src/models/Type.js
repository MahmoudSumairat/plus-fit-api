const typeDB = require("../db/models/Type");

class Type {
  typeData = {
    title: "",
    id: "",
  };

  constructor(data) {
    if (Object.values(data).length) {
      this.typeData = { ...data };
    }
  }

  static getAllTypes = async () => {
    try {
      const types = typeDB.getAllTypes();
      return Promise.resolve(types);
    } catch (err) {
      throw err;
    }
  };

  addType = async () => {
    try {
      const { title } = this.typeData;
      const addDataRow = [title];
      const { insertId } = await typeDB.addType(addDataRow);
      return Promise.resolve(insertId);
    } catch (err) {
      throw err;
    }
  };

  updateType = async () => {
    try {
      const { title, id } = this.typeData;
      const updateDataRow = [title, id];
      await typeDB.updateType(updateDataRow);
      return Promise.resolve(title);
    } catch (err) {
      throw err;
    }
  };

  deleteType = async () => {
    try {
      const { id } = this.typeData;
      await typeDB.deleteType(id);
      return Promise.resolve(id);
    } catch (err) {
      throw err;
    }
  };

  getTypeDetails = async () => {
    try {
      const { id } = this.typeData;
      const typeDetailsRes = await typeDB.getTypeDetails(id);
      return Promise.resolve(typeDetailsRes[0]);
    } catch (err) {
      throw err;
    }
  };
}

module.exports = Type;
