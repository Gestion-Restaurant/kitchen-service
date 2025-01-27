"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const jwtMiddleware_1 = require("../middleware/jwtMiddleware");
const dish_controller_1 = require("../controllers/dish.controller");
const router = (0, express_1.Router)();
// Get dishes by Restaurant ID
router.get('/restaurant/:restaurantId', (req, res) => {
    (0, dish_controller_1.getDishesByRestaurantId)(req, res);
});
// Get dish by ID
router.get('/:dishId', (req, res) => {
    (0, dish_controller_1.getDishById)(req, res);
});
// Create dish
router.post('/', (req, res) => {
    (0, dish_controller_1.createDish)(req, res);
});
// Update Product
router.put('/:dishId', jwtMiddleware_1.jwtMiddlewareOwner, (req, res) => {
    (0, dish_controller_1.updateDish)(req, res);
});
// Delete Product
router.delete('/:dishId', jwtMiddleware_1.jwtMiddlewareOwner, (req, res) => {
    (0, dish_controller_1.updateDish)(req, res);
});
exports.default = router;
