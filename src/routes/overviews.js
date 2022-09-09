const express = require("express");
const {
  addOverviews,
  getProductOverviews,
  updateOverview,
  deleteOverview,
} = require("../controllers/overviews");
const authToken = require("../middleware/authToken");
const overviewValidations = require("../validations/overviews");
const validationCheck = require("../middleware/validationCheck");
const router = express.Router();

router.post(
  "/",
  authToken,
  overviewValidations.addOverview,
  validationCheck,
  addOverviews
);
router.get(
  "/:productId",
  authToken,
  overviewValidations.getProductOverviews,
  validationCheck,
  getProductOverviews
);
router.put(
  "/:overviewId",
  authToken,
  overviewValidations.updateOverview,
  validationCheck,
  updateOverview
);
router.delete(
  "/:overviewId",
  authToken,
  overviewValidations.deleteOverview,
  validationCheck,
  deleteOverview
);

module.exports = router;
