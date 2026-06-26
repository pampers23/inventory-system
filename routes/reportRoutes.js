const express = require("express");
const router = express.Router();
const validateToken = require("../middleware/validateToken");
const { getLowStockReport, getPurchasesReport, getInventoryReport, getSalesReport } = require("../controllers/reports/reportsController");

router.use(validateToken);

router.route("/low-stock").get(getLowStockReport);
router.route("/purchases").get(getPurchasesReport);
router.route("/inventory").get(getInventoryReport);
router.route("/sales").get(getSalesReport);

module.exports = router;