const db = require("../connection/dbConnect");
const queryHandler = require("../../helpers/queryHandler");

const Bag = {
  createUserBag: (bagData) => {
    return new Promise((resolve, reject) => {
      db.query(
        `
                INSERT INTO bags (user_id) VALUES (?)
            `,
        bagData,
        (err, res) => queryHandler(err, res, resolve, reject)
      );
    });
  },

  getUserBagId: (userId) => {
    return new Promise((resolve, reject) => {
      db.query(
        `
      
        SELECT bag_id FROM bags WHERE user_id = ?
      
      `,
        [userId],
        (err, res) => queryHandler(err, res, resolve, reject)
      );
    });
  },
};

module.exports = Bag;
