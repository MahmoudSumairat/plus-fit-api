const manufactureDB = require("../db/models/Manufacture");

class Manufacture {
  manufactureData = {
    id: "",
    title: "",
  };
  constructor(data) {
    if (Object.values(data).length) {
      this.manufactureData = { ...data };
    }
  }

  static getAllManufacture = async () => {
    try {
      const manufactures = await manufactureDB.getAllManufactures();
      return Promise.resolve(manufactures);
    } catch (err) {
      throw err;
    }
  };

  addManufacture = async () => {
    try {
      const { title } = this.manufactureData;
      const addDataRow = [title];
      const { insertId } = await manufactureDB.addManufacture(addDataRow);
      return Promise.resolve(insertId);
    } catch (err) {
      throw err;
    }
  };

  updateManufacture = async () => {
    try {
      const { title, id } = this.manufactureData;
      const updateDataRow = [title, id];
      await manufactureDB.updateManufacture(updateDataRow);
      return Promise.resolve(title);
    } catch (err) {
      throw err;
    }
  };

  deleteManufacture = async () => {
    try {
      const { id } = this.manufactureData;
      await manufactureDB.deleteManufacture(id);
      return Promise.resolve(id);
    } catch (err) {
      throw err;
    }
  };

  getManufactureDetails = async () => {
    try {
      const { id } = this.manufactureData;
      const manufactureRes = await manufactureDB.getManufactureDetails(id);
      return Promise.resolve(manufactureRes[0]);
    } catch (err) {
      throw err;
    }
  };
}

module.exports = Manufacture;
