require("dotenv").config();
const { dbConnectionConfig } = require("../../config/dbConnection");

const Schema = {
  createDB: `
  DROP DATABASE IF EXISTS ${dbConnectionConfig.database};
  CREATE DATABASE ${process.env.DB_NAME}; 
  USE ${process.env.DB_NAME};
  `,
};

module.exports = Schema;
