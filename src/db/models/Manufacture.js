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

  addManufacture: (manufactureData) => {
    return new Promise((resolve, reject) => {
      db.query(
        `
        
        INSERT INTO manufactures (title) VALUES (?)

      `,
        manufactureData,
        (err, res) => queryHandler(err, res, resolve, reject)
      );
    });
  },

  getAllManufactures: () => {
    return new Promise((resolve, reject) => {
      db.query(
        `
      
        SELECT * FROM manufactures WHERE manufacture_id > 0

      `,
        (err, res) => queryHandler(err, res, resolve, reject)
      );
    });
  },

  updateManufacture: (manufactureData) => {
    return new Promise((resolve, reject) => {
      db.query(
        `
        
          UPDATE manufactures SET title = ? WHERE manufacture_id = ?
        
        `,
        manufactureData,
        (err, res) => queryHandler(err, res, resolve, reject)
      );
    });
  },

  deleteManufacture: (manufactureId) => {
    return new Promise((resolve, reject) => {
      db.query(
        `
      
        DELETE FROM manufactures WHERE manufacture_id = ${manufactureId}
      
      `,
        (err, res) => queryHandler(err, res, resolve, reject)
      );
    });
  },
};

module.exports = Manufacture;
