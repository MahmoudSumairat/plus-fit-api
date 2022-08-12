const { json } = require("express");
const express = require("express");

const app = express();
const PORT = process.env.PORT;

app.use(json());

app.listen(PORT, () => {
  console.log(`server is listening on port ${PORT}`);
});
