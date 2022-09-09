const overviewDB = require("../db/models/Overview");

class Overview {
  overviewData = {
    rows: [],
  };
  constructor(data) {
    if (Object.values(data).length) {
      this.overviewData = { ...data };
    }
  }

  static getProductOverview = async (productId) => {
    try {
      const productOverviewRes = overviewDB.getProductOverviews(productId);
      return Promise.resolve(productOverviewRes);
    } catch (err) {
      throw err;
    }
  };

  createProductOverview = async () => {
    try {
      const { rows, productId } = this.overviewData;
      const addRows = rows.map((row) => [row, productId]);
      const addedOverviews = await overviewDB.addOverviews(addRows);
      return Promise.resolve(addedOverviews);
    } catch (err) {
      throw err;
    }
  };

  updateOverview = async () => {
    try {
      const { content, overviewId } = this.overviewData;
      await overviewDB.updateProductOverview(content, overviewId);
      return Promise.resolve(content, overviewId);
    } catch (err) {
      throw err;
    }
  };

  deleteOverview = async () => {
    try {
      const { overviewId } = this.overviewData;
      await overviewDB.deleteOverview(overviewId);
      return Promise.resolve(overviewId);
    } catch (err) {
      throw err;
    }
  };
}

module.exports = Overview;
