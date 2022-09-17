require("dotenv").config();
const isProd = process.env.NODE_ENV === "prod";

const dbInitConnectionConfig = {
  host: isProd ? process.env.DB_HOST : "localhost",
  user: isProd ? process.env.DB_USER : "root",
  password: isProd ? process.env.DB_PASSWORD : "Mahmoud@1998",
  connectionLimit: process.env.DB_CONNECTION_LIMIT,
  multipleStatements: true,
};

const dbConnectionConfig = {
  ...dbInitConnectionConfig,
  database: process.env.DB_NAME,
};

exports.dbInitConnectionConfig = dbInitConnectionConfig;

exports.dbConnectionConfig = dbConnectionConfig;
