require("dotenv").config();

const dbInitConnectionConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  connectionLimit: process.env.DB_CONNECTION_LIMIT,
  multipleStatements: true,
};

const dbConnectionConfig = {
  ...dbInitConnectionConfig,
  database: process.env.DB_NAME,
};

exports.dbInitConnectionConfig = dbInitConnectionConfig;

exports.dbConnectionConfig = dbConnectionConfig;
