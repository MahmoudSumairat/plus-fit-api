require("dotenv").config();

exports.JWT_SECRET_KEY = process.env.JWT_KEY;
exports.JWT_EXPIRE_DATE = "1d";
