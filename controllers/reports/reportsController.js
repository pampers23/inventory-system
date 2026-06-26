const asyncHandler = require("express-async-handler");
const Product = require("../../models/productsModel");
const StockIn = require("../../models/stockinModel");
const StockOut = require("../../models/stockoutModel");
const { Op, Sequelize } = require("sequelize");


// @desc Low stock report
// @route GET /api/reports/low-stock
// @access private
const getLowStockReport = asyncHandler(async (req, res) => {
    const lowStockProducts = await Product.findAll({
        where: {
            quantity: {
                [Op.lte]: Sequelize.col('minimum_stock')
            }
        },
        attributes: ['id', 'name', 'sku', 'quantity', 'minimum_stock'],
        order: [['quantity', 'ASC']]
    })

    res.status(200).json({
        title: "Low Stock Report",
        totalProducts: lowStockProducts.length,
        data: lowStockProducts
    })
});


// @desc Purchases report (Stock In)
// @route GET /api/reports/purchases
// @access private
const getPurchasesReport = asyncHandler(async (req, res) => {
    const purchases = await StockIn.findAll({
        attributes: [
            'id',
            'product_id',
            'quantity',
            'unit_cost',
            'date'
        ],
        order: [['date', 'DESC']],
        limit: 100
    });

    const totalQuantity = purchases.reduce((sum, p) => sum + (p.quantity || 0), 0);
    const totalCost = purchases.reduce((sum, p) => {
        const cost = (p.quantity || 0) * (p.unit_cost || 0);
        return sum + cost;
    }, 0)

    res.status(200).json({
        title: "Purchases Report",
        totalRecords: purchases.length,
        totalQuantityPurchased: totalQuantity,
        totalPurchaseCost: totalCost.toFixed(2),
        data: purchases
    })
});

// @desc Inventory report
// @route GET /api/reports/inventory
// @access private
const getInventoryReport = asyncHandler(async (req, res) => {
    const products = await Product.findAll({
        attributes: [
            'id',
            'name',
            'sku',
            'quantity',
            'price',
            'minimum_stock'
        ],
        order: [['name', 'ASC']]
    });

    const totalProducts = products.length;
    const totalInventoryValue = products.reduce((sum, p) => sum + (p.quantity * p.price), 0);
    const lowStockCount = products.filter(p => p.quantity <= p.minimum_stock).length;

     res.status(200).json({
        title: "Inventory Report",
        summary: {
            totalProducts,
            totalInventoryValue: totalInventoryValue.toFixed(2),
            lowStockProducts: lowStockCount,
            healthyStockProducts: totalProducts - lowStockCount
        },
        data: products
    });
})


// @desc Sales report (Stock Out)
// @route GET /api/reports/sales
// @access private
const getSalesReport = asyncHandler(async (req, res) => {
    const sales = await StockOut.findAll({
        attributes: [
            'id',
            'product_id',
            'quantity',
            'reason',
            'date'
        ],
        order: [['date', 'DESC']],
        limit: 100
    });

    const totalQuantity = sales.reduce((sum, s) => sum + s.quantity, 0);

    res.status(200).json({
        title: "Sales Report",
        totalRecords: sales.length,
        totalQuantitySold: totalQuantity,
        data: sales
    });
})

module.exports = { getLowStockReport, getPurchasesReport, getInventoryReport, getSalesReport };