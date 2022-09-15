const queryHandler = require("../../helpers/queryHandler");
const db = require("../connection/dbConnect");

const OrderItem = {
  addOrderItems: (orderItemRows) => {
    return new Promise((resolve, reject) => {
      db.query(
        `
            
                INSERT INTO order_items (product_id, price, quantity, color_id, size_id, order_id) VALUES ?
            
            `,
        [orderItemRows],
        (err, res) => queryHandler(err, res, resolve, reject)
      );
    });
  },
};

module.exports = OrderItem;
