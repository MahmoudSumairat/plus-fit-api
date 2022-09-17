const cookieParser = require("cookie-parser");
const { json } = require("express");
const express = require("express");
const jsonException = require("./middleware/jsonException");
const router = require("./routes");
const app = express();
const PORT = process.env.PORT;
const fileupload = require("express-fileupload");
const cors = require("cors");
const { format } = require("mysql");

app.use(cors({ origin: "*" }));

app.use(fileupload());

app.use(json());

app.use(jsonException);

app.use(cookieParser());

app.use("/api", router);

app.listen(PORT, () => {
  console.log(`server is listening on port ${PORT}`);
});
