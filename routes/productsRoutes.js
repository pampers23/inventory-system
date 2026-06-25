const express = require("express");
const router = express.Router();
const validateToken = require("../middleware/validateToken");
const { createProducts, getProduct, getAllProducts, updateProducts, deleteProduct } = require("../controllers/products/productsController");


router.use(validateToken);

router.route("/").get(getAllProducts);
router.route("/add-product").post(createProducts);
router.route("/:id").get(getProduct).put(updateProducts).delete(deleteProduct);

module.exports = router;