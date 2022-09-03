const bagItemDB = require("../db/models/BagItem");

class BagItem {
  bagItemData = {
    colorId: null,
    sizeId: null,
    quantity: null,
    price: null,
    bagId: null,
    productId: null,
    id: null,
  };
  constructor(data) {
    if (Object.values(data).length) {
      this.bagItemData = { ...data };
    }
  }

  static getBagItems = async (bagId) => {
    try {
      const result = await bagItemDB.getBagItems(bagId);
      return Promise.resolve(result);
    } catch (err) {
      throw err;
    }
  };

  addBagItem = async () => {
    try {
      const { colorId, sizeId, quantity, price, bagId, productId } =
        this.bagItemData;
      const addDataRow = [bagId, productId, quantity, sizeId, colorId, price];
      const { insertId } = await bagItemDB.addBagItem(addDataRow);
      return Promise.resolve(insertId);
    } catch (err) {
      throw err;
    }
  };

  deleteBagItem = async () => {
    try {
      const { id } = this.bagItemData;
      await bagItemDB.deleteBagItem(id);
      return Promise.resolve(id);
    } catch (err) {
      throw err;
    }
  };

  updateBagItem = async (updateField, updateValue) => {
    try {
      const updatedFieldsMap = {
        colorId: "color_id",
        sizeId: "size_id",
        quantity: "quantity",
      };
      const { id } = this.bagItemData;
      await bagItemDB.updateBagItem(
        id,
        updatedFieldsMap[updateField],
        updateValue
      );
      return Promise.resolve(updateValue);
    } catch (err) {}
  };
}

module.exports = BagItem;
