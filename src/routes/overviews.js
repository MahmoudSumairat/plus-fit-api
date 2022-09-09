const express = require("express");
const {
  addOverviews,
  getProductOverviews,
  updateOverview,
  deleteOverview,
} = require("../controllers/overviews");
const authToken = require("../middleware/authToken");
const validationCheck = require("../middleware/validationCheck");
const router = express.Router();

router.post("/", authToken, addOverviews);
router.get("/:productId", authToken, getProductOverviews);
router.put("/:overviewId", authToken, updateOverview);
router.delete("/:overviewId", authToken, deleteOverview);

module.exports = router;
