const orderDB = require("../db/models/Order");

class Order {
  orderData = {
    userId: null,
  };
  constructor(data) {
    if (Object.values(data).length) {
      this.orderData = { ...data };
    }
  }

  createOrder = async () => {
    try {
      const { userId } = this.orderData;
      const { insertId } = await orderDB.createOrder(userId);
      return Promise.resolve(insertId);
    } catch (err) {
      throw err;
    }
  };
}

module.exports = Order;
