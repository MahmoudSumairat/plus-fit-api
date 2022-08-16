const queryHandler = require("../../helpers/queryHandler");
const db = require("../connection/dbConnect");

const Type = {
  getTypeDetails: (typeId) => {
    return new Promise((resolve, reject) => {
      db.query(
        `
                SELECT * FROM types WHERE type_id = ${typeId}
            `,
        (err, res) => queryHandler(err, res, resolve, reject)
      );
    });
  },
};

module.exports = Type;
