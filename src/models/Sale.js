const saleDB = require("../db/models/Sale");

class Sale {
  saleData = {
    value: null,
    productId: null,
    saleId: null,
  };

  constructor(data) {
    if (Object.values(data).length) {
      this.saleData = { ...data };
    }
  }

  static getProductSales = async (productId) => {
    try {
      const productSaleRes = saleDB.getProductSale(productId);
      return Promise.resolve(productSaleRes);
    } catch (err) {
      throw err;
    }
  };

  addSale = async () => {
    try {
      const { value, productId } = this.saleData;
      const addDataRow = [value, productId];
      console.log(addDataRow);
      const { insertId } = await saleDB.createSale(addDataRow);
      return Promise.resolve(insertId);
    } catch (err) {
      throw err;
    }
  };

  updateSale = async () => {
    try {
      const { value, saleId } = this.saleData;
      await saleDB.updateSale(value, saleId);
      return Promise.resolve(value);
    } catch (err) {
      throw err;
    }
  };

  deleteSale = async () => {
    try {
      const { saleId } = this.saleData;
      await saleDB.deleteSate(saleId);
      return Promise.resolve(saleId);
    } catch (err) {
      throw err;
    }
  };
}

module.exports = Sale;
