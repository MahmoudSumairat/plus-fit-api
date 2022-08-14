require("dotenv").config();

const Schema = {
  createDB: `CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME}; USE ${process.env.DB_NAME}; `,
  useDB: `USE ${process.env.DB_NAME}; `,
};

module.exports = Schema;
