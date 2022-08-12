const mySql = require("mysql");
const dbConnectionConfig = require("../../config/dbConnection");

const pool = mySql.createPool(dbConnectionConfig);

pool.getConnection((err) => {
  if (err) {
    return console.log("Error connecting to DB", err);
  }
  console.log("DB connection established.");
});

module.exports = pool;
