const handleResError = require("../helpers/errorHandler");
const handleResSuccess = require("../helpers/successHandler");
const Order = require("../models/Order");
const OrderItem = require("../models/OrderItem");

exports.createOrder = async (
  {
    body: { rows },
    headers: {
      userData: { user_id },
    },
  },
  res
) => {
  try {
    const order = new Order({ userId: user_id });
    const orderId = await order.createOrder();
    const orderItem = new OrderItem({ rows, orderId });
    const result = await orderItem.addOrderItems();
    handleResSuccess(res, "order has been created successfully.", result);
  } catch (err) {
    handleResError(err, res);
  }
};
