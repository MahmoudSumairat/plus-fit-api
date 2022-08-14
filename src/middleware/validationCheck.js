const { validationResult } = require("express-validator");
const { VALIDATION_ERROR } = require("../constants/statusCodes");
const { VALIDATION_FAILED } = require("../constants/responseMessages");

module.exports = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res
      .status(VALIDATION_ERROR)
      .json({ message: VALIDATION_FAILED, validationErrors: errors.array() });
  }

  next();
};
