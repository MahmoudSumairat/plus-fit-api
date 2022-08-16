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
};

module.exports = Country;
