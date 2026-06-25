const express = require("express");
const router = express.Router();
const validateToken = require("../middleware/validateToken");
const { stockIn, stockOut, getStockInHistory, getStockOutHistory } = require("../controllers/stocks/stocksController");

router.use(validateToken);

router.route("/stock-in").post(stockIn);
router.route("/stock-out").post(stockOut);
router.route("/get-stock-in").get(getStockInHistory);
router.route("/get-stock-out").get(getStockOutHistory);

module.exports = router;