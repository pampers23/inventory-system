const asyncHandler = require("express-async-handler");
const Products = require("../../models/productsModel");

// @desc create product
// @route POST /api/products
// @access private

const createProducts = asyncHandler(async (req, res) => {
    const { category_id, supplier_id, sku, name, description, price, quantity, minimum_stock } = req.body;

    if (!category_id || !supplier_id || !sku || !name || !price) {
        res.status(400);
        throw new Error("All required fields must be provided")
    }
    
    const product = await Products.create({
        category_id,
        supplier_id,
        sku,
        name,
        description,
        price,
        quantity: parseInt(quantity),
        minimum_stock: minimum_stock !== undefined ? minimum_stock : 0,
    })
    res.status(201).json(product)
})

// @desc get product
// @route GET /api/PRODUCTS/:id
// @access private

const getProduct = asyncHandler(async (req, res) => {
    const product = await Products.findByPk(req.params.id);

    if (!product) {
        res.status(400);
        throw new Error("Product not found!");
    }
    res.status(200).json(product);
})

// @desc get all products
// @route GET /api/products
// @access private

const getAllProducts = asyncHandler(async (req, res) => {
    const products = await Products.findAll();
    res.status(200).json(products);
})

// @desc update product
// @route PUT /api/products/:id
// @access private

const updateProducts = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { category_id, supplier_id, sku, name, description, price, quantity, minimum_stock } = req.body;

    const product = await Products.findByPk(id);

    if (!product) {
        res.status(404);
        throw new Error("Product not found");
    }

    if (product.user_id !== parseInt(req.user.id)) {
        res.status(403);
        throw new Error("User doesn't have permission to update this product");
    }

    await product.update({
        category_id,
        supplier_id,
        sku,
        name,
        description,
        price,
        quantity,
        minimum_stock,
    })

    res.status(200).json(product);
})

// @desc delete product
// @route DELETE /api/products/:id
// @access private

const deleteProduct = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const product = await Products.findByPk(id);

    if (!product) {
        res.status(404);
        throw new Error("Product not found");
    }

    if (product.user_id !== parseInt(req.user.id)) {
        res.status(403);
        throw new Error("User doesn't have permission to update this product");
    }

    await product.destroy();

    res.status(200).json(product)
})

module.exports = { createProducts, getProduct, getAllProducts, updateProducts, deleteProduct }