const asyncHandler = require("express-async-handler");
const Categories = require("../../models/catergoriesModel")

// @desc create categories
// @route POST /api/categories
// @access private

const createCategory = asyncHandler(async (req, res) => {
    const { name, description } = req.body;
    if (!name || !description) {
        res.status(400);
        throw new Error("All fields are mandatory")
    }

    const category = await Categories.create({
        name,
        description,
        user_id: req.user.id
    });

    res.status(201).json(category);
});

// @desc get all categories
// @route GET /api/categories/
// @access private

const getAllCategory = asyncHandler(async (req, res) => {
    const categories = await Categories.findAll();
    res.status(200).json(categories)
});


// @desc get categories by id
// @route GET /api/categories/:id
// @access private

const getCategory = asyncHandler(async (req, res) => {
    const category = await Categories.findByPk(req.params.id);
    if (!category) {
        res.status(400);
        throw new Error("Category not found")
    }
    res.status(200).json(category);
});


// @desc update categories by id
// @route PUT /api/categories/:id
// @access private

const updateCategory = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { name, description } = req.body;

    const category = await Categories.findByPk(id);
    if (!category) {
        res.status(404);
        throw new Error("Category not found");
    }

    if (category.user_id !== parseInt(req.user.id)) {
        res.status(403);
        throw new Error("User don't have permission to update this category")
    }

    await category.update({
        name,
        description,
    })

    res.status(200).json(category)
})

// @desc delete categories by id
// @route DELETE /api/categories/:id
// @access private

const deleteCategory= asyncHandler(async (req, res) => {
    const { id } = req.params

    const category = await Categories.findByPk(id);
    if (!category) {
        res.status(404);
        throw new Error("Category not found");
    }

    if (category.user_id !== parseInt(req.user.id)) {
        res.status(403);
        throw new Error("User don't have permission to delete this category")
    }

    await category.destroy()

    res.status(200).json(category)
})

module.exports = { createCategory, getAllCategory, getCategory, updateCategory, deleteCategory }