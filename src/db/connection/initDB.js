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
});

const migrationQuery = fs.readFileSync(
  require("path").resolve(__dirname, "../init/migration.sql"),
  {
    encoding: "utf-8",
  }
);

const seedQuery = fs.readFileSync(
  require("path").resolve(__dirname, "../init/seeds.sql"),
  {
    encoding: "utf-8",
  }
);

pool.query(` ${Schema.createDB} ${migrationQuery} ${seedQuery}`, (err) => {
  if (err) {
    return console.log("DB migration field", err);
  }

  console.log("DB migration and Seeding succeeded.");
});
