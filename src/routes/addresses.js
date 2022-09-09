const express = require("express");
const {
  addAddress,
  getAddressById,
  updateAddress,
  deleteAddress,
} = require("../controllers/addresses");
const authToken = require("../middleware/authToken");
const validationCheck = require("../middleware/validationCheck");
const router = express.Router();
const addressValidations = require("../validations/addresses");

router.post(
  "/",
  authToken,
  addressValidations.addAddresses,
  validationCheck,
  addAddress
);
router.get(
  "/:addressId",
  authToken,
  addressValidations.getAddressDetails,
  validationCheck,
  getAddressById
);
router.put(
  "/:addressId",
  authToken,
  addressValidations.updateProduct,
  validationCheck,
  updateAddress
);
router.delete(
  "/:addressId",
  authToken,
  addressValidations.deleteAddress,
  validationCheck,
  deleteAddress
);

module.exports = router;
