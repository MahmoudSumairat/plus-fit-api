const { SUCCESS } = require("../constants/statusCodes");

module.exports = (res, message, data) => {
  res.status(SUCCESS).json({ message, data });
};
