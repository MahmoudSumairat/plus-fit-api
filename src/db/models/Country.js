const queryHandler = require("../../helpers/queryHandler");
const db = require("../connection/dbConnect");

const Country = {
  getCountryDetails: (countryId) => {
    return new Promise((resolve, reject) => {
      db.query(
        `
                SELECT * FROM countries WHERE country_id = ${countryId}
            `,
        (err, res) => queryHandler(err, res, resolve, reject)
      );
    });
  },

  addCountry: (countryData) => {
    return new Promise((resolve, reject) => {
      db.query(
        `

        INSERT INTO countries (title) VALUES (?)

      `,
        countryData,
        (err, res) => queryHandler(err, res, resolve, reject)
      );
    });
  },

  getAllCountries: () => {
    return new Promise((resolve, reject) => {
      db.query(
        `
      
        SELECT * FROM countries WHERE country_id > 0

      `,
        (err, res) => queryHandler(err, res, resolve, reject)
      );
    });
  },

  updateCountry: (countryData) => {
    return new Promise((resolve, reject) => {
      db.query(
        `
      
        UPDATE countries SET title = ? WHERE country_id = ?
      
      `,
        countryData,
        (err, res) => queryHandler(err, res, resolve, reject)
      );
    });
  },

  deleteCountry: (countryId) => {
    return new Promise((resolve, reject) => {
      db.query(
        `

        DELETE FROM countries WHERE country_id = ${countryId}

      `,
        (err, res) => queryHandler(err, res, resolve, reject)
      );
    });
  },
};

module.exports = Country;
