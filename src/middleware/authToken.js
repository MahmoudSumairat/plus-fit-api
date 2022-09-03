const { BAD_REQUEST, UNAUTHENTICATED } = require("../constants/statusCodes");
const handleResError = require("../helpers/errorHandler");
const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];

    if (!authHeader) {
      const error = {
        status: UNAUTHENTICATED,
        message: "User is not authenticated",
      };
      handleResError(error, res);
    }
    if (!authHeader.includes("Bearer")) {
      const error = {
        status: BAD_REQUEST,
        message: "Authorization Header must include Bearer keyword",
      };
      handleResError(error, res);
    }
    const token = authHeader.split(" ")[1];
    const SECRET = process.env.JWT_KEY;
    const decodedToken = jwt.verify(token, SECRET);
    req.headers["userData"] = decodedToken;
    next();
  } catch (err) {
    handleResError(err, res);
  }
};
