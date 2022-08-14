const express = require("express");
const { login, register } = require("../controllers/auth");
const router = express.Router();
const authValidations = require("../validations/auth");
const validationCheck = require("../middleware/validationCheck");

router.post("/login", authValidations.login, validationCheck, login);
router.post("/register", authValidations.register, validationCheck, register);

module.exports = router;
