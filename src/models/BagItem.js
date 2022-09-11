const { VALIDATION_ERROR } = require("../constants/statusCodes");
const bagItemDB = require("../db/models/BagItem");
const Color = require("./Color");
const Product = require("./Product");
const Size = require("./Size");

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
      const itemsAsync = result.map(async (item) => {
        const productSizes = await Size.getProductSizes(item.productId);
        const productColors = await Color.getProductColors(item.productId);
        return Promise.resolve({
          ...item,
          availableColors: productColors,
          availableSizes: productSizes,
        });
      });
      const items = await Promise.all(itemsAsync);
      return Promise.resolve(items);
    } catch (err) {
      throw err;
    }
  };

  static getBagItemsCounts = async (bagId) => {
    try {
      const [{ count }] = await bagItemDB.getBagItemsCounts(bagId);
      return Promise.resolve(count);
    } catch (err) {
      throw err;
    }
  };

  addBagItem = async () => {
    try {
      const { colorId, sizeId, quantity, price, bagId, productId } =
        this.bagItemData;
      const isQuantityValid = await this.isItemQuantityValid(
        productId,
        quantity
      );

      if (!isQuantityValid) {
        return Promise.reject({
          message: "Product Quantity is lower than Bag Item quantity",
          status: VALIDATION_ERROR,
        });
      }
      const calculatedPrice = price * quantity;
      const addDataRow = [
        bagId,
        productId,
        quantity,
        sizeId,
        colorId,
        calculatedPrice,
      ];
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

  updateBagItem = async (updateField, updateValue, productId) => {
    try {
      const updatedFieldsMap = {
        colorId: "color_id",
        sizeId: "size_id",
        quantity: "quantity",
      };
      const { id } = this.bagItemData;

      let dbUpdateField = `${updatedFieldsMap[updateField]} = ?`;
      let dbUpdateValue = [updateValue, id];
      if (updateField === "quantity") {
        if (!productId) {
          return Promise.reject({
            message: "Product ID should be provided with updated quantity",
            status: VALIDATION_ERROR,
          });
        }
        await Product.selectFromProduct(productId, "price");
      }
      await bagItemDB.updateBagItem(dbUpdateField, dbUpdateValue);
      return Promise.resolve(updateValue);
    } catch (err) {
      throw err;
    }
  };

  isItemQuantityValid = async (productId, bagItemQuantity) => {
    try {
      const productQuantity = await Product.getProductQuantity(productId);
      return Promise.resolve(bagItemQuantity <= productQuantity);
    } catch (err) {
      throw err;
    }
  };

  static getBagItemByBagAndProductId = async (productId, bagId) => {
    try {
      const item = bagItemDB.getBagItemByBagAndProductId(productId, bagId);
      return Promise.resolve(item);
    } catch (err) {
      throw err;
    }
  };
}

module.exports = BagItem;
