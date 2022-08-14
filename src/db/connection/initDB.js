const fs = require("fs");
const Schema = require("../models/Schema");
const mySql = require("mysql");
const { dbInitConnectionConfig } = require("../../config/dbConnection");
const pool = mySql.createPool(dbInitConnectionConfig);

pool.getConnection((err) => {
  if (err) {
    return console.log("Error connecting to DB", err);
  }
  console.log("DB connection established.");
  pool.query(Schema.useDB, (err, result) => {
    if (err) {
      return console.log("Error using DB");
    }

    return console.log("DB Used successfully");
  });
});

const migrationQuery = fs.readFileSync(
  require("path").resolve(__dirname, "../init/migration.sql"),
  {
    encoding: "utf-8",
  }
);

db.query(` ${Schema.createDB} ${migrationQuery}`, (err) => {
  if (err) {
    return console.log("DB migration field", err);
  }

  console.log("DB migration succeeded.");
});
