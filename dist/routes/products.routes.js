"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
// Get Products by Restaurant ID
router.get('/restaurant/:restaurantId', (req, res) => {
    res.send('Get products by restaurant ID');
});
// Get Product by ID
router.get('/:productId', (req, res) => {
    res.send('Get product by ID');
});
// Create Product
router.post('/', (req, res) => {
    res.send('Create product');
});
// Update Product
router.put('/:productId', (req, res) => {
    res.send('Update product');
});
// Delete Product
router.delete('/:productId', (req, res) => {
    res.send('Delete product');
});
exports.default = router;
