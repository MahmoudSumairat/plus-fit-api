const queryHandler = require("../../helpers/queryHandler");
const db = require("../connection/dbConnect");

const Order = {
  createOrder: (userId) => {
    return new Promise((resolve, reject) => {
      db.query(
        `
            
                INSERT INTO orders (user_id) VALUES (?)
            
            `,
        [userId],
        (err, res) => queryHandler(err, res, resolve, reject)
      );
    });
  },
};

module.exports = Order;
