const cookieParser = require("cookie-parser");
const { json } = require("express");
const express = require("express");
const router = require("./routes");
const app = express();
const PORT = process.env.PORT;

app.use(json());

app.use(cookieParser());

app.use("/api", router);

app.listen(PORT, () => {
  console.log(`server is listening on port ${PORT}`);
});
