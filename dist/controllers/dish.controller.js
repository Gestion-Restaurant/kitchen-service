"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteDish = exports.updateDish = exports.createDish = exports.getDishById = exports.getDishesByRestaurantId = void 0;
const dishSchema_1 = __importDefault(require("../models/dishSchema"));
// Get dishes by Restaurant ID
const getDishesByRestaurantId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { restaurantId } = req.params;
        const dishes = yield dishSchema_1.default.find({ restaurantId });
        return res.status(200).json({ dishes });
    }
    catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
        return res.status(500).json({ error: errorMessage });
    }
});
exports.getDishesByRestaurantId = getDishesByRestaurantId;
// Get dish by ID
const getDishById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { dishId } = req.params;
        const dish = yield dishSchema_1.default.findById(dishId);
        if (!dish) {
            return res.status(404).json({ error: 'Dish not found' });
        }
        return res.status(200).json({ dish });
    }
    catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
        return res.status(500).json({ error: errorMessage });
    }
});
exports.getDishById = getDishById;
// Create dish
const createDish = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, price, description, restaurantId } = req.body;
        if (!name || !price || !description || !restaurantId) {
            return res.status(400).json({ error: 'Missing required fields' });
        }
        const newDish = new dishSchema_1.default({
            name,
            price,
            description,
            restaurantId
        });
        yield newDish.save();
        return res.status(201).json({ status: 'Success' });
    }
    catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
        return res.status(500).json({ error: errorMessage });
    }
});
exports.createDish = createDish;
// Update dish
const updateDish = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { dishId } = req.params;
        const { name, price, description, restaurantId } = req.body;
        if (!name || !price || !description || !restaurantId) {
            return res.status(400).json({ error: 'Missing required fields' });
        }
        const updatedDish = yield dishSchema_1.default.findByIdAndUpdate(dishId, {
            name,
            price,
            description
        }, { new: true });
        return res.status(200).json({ status: 'Success', dish: updatedDish });
    }
    catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
        return res.status(500).json({ error: errorMessage });
    }
});
exports.updateDish = updateDish;
// Delete dish
const deleteDish = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { dishId } = req.params;
        yield dishSchema_1.default.findByIdAndDelete(dishId);
        return res.status(200).json({ status: 'Success' });
    }
    catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
        return res.status(500).json({ error: errorMessage });
    }
});
exports.deleteDish = deleteDish;
