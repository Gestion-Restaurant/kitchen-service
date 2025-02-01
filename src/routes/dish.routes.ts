import { Router } from 'express';
import { jwtMiddleware, jwtMiddlewareOwner } from '../middleware/jwtMiddleware';
import { 
    createDish,
    getDishById,
    getDishesByRestaurantId,
    updateDish
} from '../controllers/dish.controller';

const router = Router();

// Get dishes by Restaurant ID
router.get('/restaurant/:restaurantId', (req, res) => {
    getDishesByRestaurantId(req, res);
});

// Get dish by ID
router.get('/:dishId', (req, res) => {
    getDishById(req, res);
});

// Create dish
router.post('/', jwtMiddlewareOwner, (req, res) => {
    createDish(req, res);
});

// Update Product
router.put('/:dishId', jwtMiddlewareOwner, (req, res) => {
    updateDish(req, res);
});

// Delete Product
router.delete('/:dishId', jwtMiddlewareOwner, (req, res) => {
    updateDish(req, res);
});

export default router;