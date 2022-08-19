const countryDB = require("../db/models/Country");

class Country {
  countryData = {
    title: "",
    id: "",
  };

  constructor(data) {
    if (Object.values(data).length) {
      this.countryData = { ...data };
    }
  }

  static getAllCountries = async () => {
    try {
      const countries = await countryDB.getAllCountries();
      return Promise.resolve(countries);
    } catch (err) {
      throw err;
    }
  };

  addCountry = async () => {
    try {
      const { title } = this.countryData;
      const addDataRow = [title];
      const { insertId } = await countryDB.addCountry(addDataRow);
      return Promise.resolve(insertId);
    } catch (err) {
      throw err;
    }
  };

  updateCountry = async () => {
    try {
      const { title, id } = this.countryData;
      const updateDataRow = [title, id];
      await countryDB.updateCountry(updateDataRow);
      return Promise.resolve(title);
    } catch (err) {
      throw err;
    }
  };

  deleteCountry = async () => {
    try {
      const { id } = this.countryData;
      await countryDB.deleteCountry(id);
      return Promise.resolve(id);
    } catch (err) {
      throw err;
    }
  };

  getCountryDetails = async () => {
    try {
      const { id } = this.countryData;
      const countryRes = await countryDB.getCountryDetails(id);
      return Promise.resolve(countryRes[0]);
    } catch (err) {
      throw err;
    }
  };
}

module.exports = Country;
