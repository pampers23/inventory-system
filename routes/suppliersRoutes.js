const express = require("express");
const router = express.Router();
const validateToken = require("../middleware/validateToken");
const { createSuppliers, getSupplier, getAllSuppliers, updateSupplier, deleteSupplier } = require("../controllers/suppliers/suppliersControllers");

router.use(validateToken)

router.route("/").get(getAllSuppliers)
router.route("/add-suppliers").post(createSuppliers);
router.route("/:id").get(getSupplier).put(updateSupplier).delete(deleteSupplier);

module.exports = router;