const User = require("../models/User");
const handleResError = require("../helpers/errorHandler");

exports.login = async ({ body }, res) => {
  const user = new User(body);
  try {
    const token = await user.validateLoggedUser();
    res
      .status(200)
      .json({ message: "User logged in successfully!", data: token });
  } catch (err) {
    handleResError(err, res);
  }
};

exports.register = async ({ body }, res) => {
  const user = new User(body);
  try {
    const token = await user.validateCreateUser();
    res
      .status(200)
      .json({ message: "User created successfully!", data: token });
  } catch (err) {
    handleResError(err, res);
  }
};
