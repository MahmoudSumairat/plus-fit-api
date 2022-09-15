const orderItemDB = require("../db/models/OrderItem");
const Product = require("./Product");

class OrderItem {
  orderItemData = {
    rows: [],
    orderId: null,
  };
  constructor(data) {
    if (Object.values(data).length) {
      this.orderItemData = { ...data };
    }
  }

  addOrderItems = async () => {
    try {
      const { orderId } = this.orderItemData;
      const addOrderItemRows = this.orderItemData.rows.map(
        ({ productId, price, quantity, colorId, sizeId }) => [
          productId,
          price,
          quantity,
          colorId,
          sizeId,
          orderId,
        ]
      );
      const orderItemsProductIds = this.orderItemData.rows.map(
        ({ productId, quantity }) => ({ productId, quantity })
      );
      await Product.decreaseProductQuantities(orderItemsProductIds);
      const result = await orderItemDB.addOrderItems(addOrderItemRows);
      return Promise.resolve(result);
    } catch (err) {
      throw err;
    }
  };
}

module.exports = OrderItem;
