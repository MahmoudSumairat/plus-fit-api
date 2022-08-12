const db = require("./dbConnect");
const fs = require("fs");
const Schema = require("../models/Schema");

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
