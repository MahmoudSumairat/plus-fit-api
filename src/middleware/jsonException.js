const { BAD_REQUEST } = require("../constants/statusCodes");

module.exports = (err, req, res, next) => {
  if (
    err instanceof SyntaxError &&
    err.status === BAD_REQUEST &&
    "body" in err
  ) {
    return res
      .status(BAD_REQUEST)
      .send({
        message:
          "you have sent an invalid json format, please check and send again.",
        err: err.message,
      });
  }
  next();
};
