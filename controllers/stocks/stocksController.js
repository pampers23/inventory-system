const asyncHandler = require("express-async-handler");
const Product = require("../../models/productsModel");
const StockIn = require("../../models/stockinModel");
const StockOut = require("../../models/stockoutModel");

// @desc Stock In
// @route POST /api/inventory/stock-in
// @access private
const stockIn = asyncHandler(async (req, res) => {
    const { product_id, quantity, unit_cost } = req.body;

    if (!product_id || !quantity || !unit_cost) {
        res.status(400);
        throw new Error("All fields are required");
    }

    const product = await Product.findByPk(product_id);
    if (!product) {
        res.status(404);
        throw new Error("Product not found")
    }

    const stockIn = await StockIn.create({
        product_id,
        quantity,
        unit_cost
    })

    await product.update({
        quantity: product.quantity + parseInt(quantity),
    });


    res.status(200).json(stockIn)
})

// @desc Stock out
// @route POST /api/inventory/stock-out
// @access private

const stockOut = asyncHandler(async (req, res) => {
    const { product_id, quantity, reason } = req.body;

    if (!product_id || !quantity || !reason) {
        res.status(400);
        throw new Error("All fields are required")
    }

    const product = await Product.findByPk(product_id);
    if (!product) {
        res.status(404);
        throw new Error("Product not found")
    }

    await product.update({
        quantity: product.quantity - parseInt(quantity),
    });

    const stockOut = await StockOut.create({
        product_id,
        quantity,
        reason
    })

    res.status(200).json(stockOut);
})

// @desc Get stock in history
// @route GET /api/inventory/stock-in
// @access private

const getStockInHistory = asyncHandler(async(req, res) => {
    const history = await StockIn.findAll({
        order: [[ 'createdAt', 'DESC' ]]
    })

    res.status(200).json(history);
})

// @desc Get stock out history
// @route GET /api/inventory/stock-out
// @access private

const getStockOutHistory = asyncHandler(async(req, res) => {
    const history = await StockOut.findAll({
        order: [[ 'date', 'DESC' ]]
    })

    res.status(200).json(history);
})

module.exports = { stockIn, stockOut, getStockInHistory, getStockOutHistory };