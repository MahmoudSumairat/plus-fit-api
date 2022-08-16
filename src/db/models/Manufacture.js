const queryHandler = require("../../helpers/queryHandler");
const db = require("../connection/dbConnect");

const Manufacture = {
  getManufactureDetails: (manufactureId) => {
    return new Promise((resolve, reject) => {
      db.query(
        `
                    SELECT * FROM manufactures WHERE manufacture_id = ${manufactureId}
                `,
        (err, res) => queryHandler(err, res, resolve, reject)
      );
    });
  },
};

module.exports = Manufacture;
