const express = require("express");
const { register, login, profile } = require("../controllers/auth/userController")
const validateToken = require("../middleware/validateToken");

const router = express.Router();

router.post("/register", register);
router.post("/login", login)
router.get("/profile/:id", validateToken, profile)

module.exports = router;