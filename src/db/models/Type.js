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

  addType: (typeData) => {
    return new Promise((resolve, reject) => {
      db.query(
        `
      
        INSERT INTO types (title) VALUES (?)
      
      `,
        typeData,
        (err, res) => queryHandler(err, res, resolve, reject)
      );
    });
  },

  getAllTypes: () => {
    return new Promise((resolve, reject) => {
      db.query(
        `
      
        SELECT * FROM types WHERE type_id > 0
      
      `,
        (err, res) => queryHandler(err, res, resolve, reject)
      );
    });
  },

  updateType: (typeData) => {
    return new Promise((resolve, reject) => {
      db.query(
        `
      
        UPDATE types SET title = ? WHERE type_id = ?
      
      `,
        typeData,
        (err, res) => queryHandler(err, res, resolve, reject)
      );
    });
  },

  deleteType: (typeId) => {
    return new Promise((resolve, reject) => {
      db.query(
        `
      
        DELETE FROM types WHERE type_id = ${typeId}
      
      `,
        (err, res) => queryHandler(err, res, resolve, reject)
      );
    });
  },
};

module.exports = Type;
