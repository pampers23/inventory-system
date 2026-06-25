const express = require("express");
const router = express.Router();
const validateToken = require("../middleware/validateToken");
const { createCategory, getAllCategory, getCategory, updateCategory, deleteCategory } = require("../controllers/categories/categoriesController");


router.use(validateToken);

router.route("/add-category").post(createCategory);
router.route("/").get(getAllCategory);
router.route("/:id").get(getCategory).put(updateCategory).delete(deleteCategory);


module.exports = router;