require("dotenv").config();

const dbConnectionConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  connectionLimit: process.env.DB_CONNECTION_LIMIT,
  multipleStatements: true,
};

module.exports = dbConnectionConfig;
