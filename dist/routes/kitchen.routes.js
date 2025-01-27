"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
// Get all Restaurants
router.get('/', (req, res) => {
    res.send('Get all restaurants');
});
// Get Restaurant by ID
router.get('/:id', (req, res) => {
    res.send('Get restaurant by ID');
});
// Create Restaurant
router.post('/', (req, res) => {
    res.send('Create restaurant');
});
// Update Restaurant
router.put('/:id', (req, res) => {
    res.send('Update restaurant');
});
// Delete Restaurant
router.delete('/:id', (req, res) => {
    res.send('Delete restaurant');
});
exports.default = router;
