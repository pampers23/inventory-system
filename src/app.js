const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", require("../routes/userRoutes"));
app.use("/api/categories", require("../routes/categoriesRoutes"));
app.use("/api/suppliers", require("../routes/suppliersRoutes"));
app.use("/api/products", require("../routes/productsRoutes"));
app.use(require("../middleware/error"));

module.exports = app;