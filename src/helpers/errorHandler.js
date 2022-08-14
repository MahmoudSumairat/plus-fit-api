const { INTERNAL_SERVER_ERROR } = require("../constants/statusCodes");

module.exports = (err, res) => {
  console.error({
    message: err.message || "Internal Server Error",
    error: err.stack,
  });
  res
    .status(err.status || INTERNAL_SERVER_ERROR)
    .send(err.message || "Internal Server Error");
};
