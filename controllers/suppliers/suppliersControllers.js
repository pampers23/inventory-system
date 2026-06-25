const asyncHandler = require("express-async-handler");
const Suppliers = require("../../models/suppliersModel");


// @desc create suppliers
// @route POST /api/suppliers
// @access private

const createSuppliers = asyncHandler(async (req, res) => {
    const { company_name, contact_person, email, phone, address } = req.body
    if (!company_name || !contact_person || !email || !phone || !address) {
        res.status(400);
        throw new Error("All fields are mandatory");
    }

    const create = await Suppliers.create({
        company_name,
        contact_person,
        email,
        phone,
        address,
        user_id: req.user.id
    });

    res.status(201).json(create);
});

// @desc get supplier
// @route GET /api/suppliers/:id
// @access private

const getSupplier = asyncHandler(async (req, res) => {
    const supplier = await Suppliers.findByPk(req.params.id);
    if (!supplier){
        res.status(400);
        throw new Error("Supplier not found");
    }
    res.status(200).json(supplier);
});

// @desc get all supplier
// @route GET /api/suppliers
// @access private

const getAllSuppliers = asyncHandler(async (req, res) => {
    const suppliers = await Suppliers.findAll();
    res.status(200).json(suppliers);
});

// @desc update supplier
// @route PUT /api/suppliers/:id
// @access private

const updateSupplier = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { company_name, contact_person, email, phone, address } = req.body;

    const supplier = await Suppliers.findByPk(id);
    
    if (!supplier) {
        res.status(404);
        throw new Error("Supplier not found");
    }

    if (supplier.user_id !== parseInt(req.user.id)) {
        res.status(403);
        throw new Error("User doesn't have permission to update this supplier")
    }

    await supplier.update({
        company_name,
        contact_person,
        email,
        phone,
        address,
    })

    res.status(200).json(supplier);
})

// @desc delete supplier
// @route DELETE /api/suppliers/:id
// @access private


const deleteSupplier = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const supplier = await Suppliers.findByPk(id);
    if (!supplier) {
        res.status(404);
        throw new Error("Supplier not found");
    }

    if (supplier.user_id !== parseInt(req.user.id)) {
        res.status(403);
        throw new Error("User doesn't have permission to delete this supplier")
    }

    await supplier.destroy()

    res.status(200).json(supplier);
});

module.exports = { createSuppliers, getSupplier, getAllSuppliers, updateSupplier, deleteSupplier };