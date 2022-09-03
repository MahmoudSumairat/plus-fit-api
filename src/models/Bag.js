const bagDB = require("../db/models/Bag");

class Bag {
  bagData = { userId: "" };
  constructor(data) {
    if (Object.values(data).length) {
      this.bagData = data;
    }
  }

  static getUserBagId = (userId) => {
    try {
      const result = bagDB.getUserBagId(userId);
      return Promise.resolve(result[0]);
    } catch (err) {
      throw err;
    }
  };

  createUserBag = async () => {
    try {
      const { userId } = this.bagData;
      const createUserRow = [userId];
      const { insertId } = await bagDB.createUserBag(createUserRow);
      return Promise.resolve(insertId);
    } catch (err) {
      throw err;
    }
  };
}

module.exports = Bag;
