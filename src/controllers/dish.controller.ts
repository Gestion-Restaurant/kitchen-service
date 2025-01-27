import { Request, Response } from 'express';
import IDish from '../interfaces/dishInterface';
import DishSchema from '../models/dishSchema';

// Get dishes by Restaurant ID
export const getDishesByRestaurantId = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { restaurantId } = req.params;

        const dishes = await DishSchema.find({ restaurantId });
        return res.status(200).json({ dishes });
    } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
        return res.status(500).json({ error: errorMessage });
    }
}

// Get dish by ID
export const getDishById = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { dishId } = req.params;

        const dish = await DishSchema.findById(dishId);

        if (!dish) {
            return res.status(404).json({ error: 'Dish not found' });
        }

        return res.status(200).json({ dish });
    } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
        return res.status(500).json({ error: errorMessage });
    }
}

// Create dish
export const createDish = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { name, price, description, restaurantId }: IDish = req.body;

        if (!name || !price || !description || !restaurantId) {
            return res.status(400).json({ error: 'Missing required fields' });
        }


        let newDish = new DishSchema({
            name,
            price,
            description,
            restaurantId
        });

        newDish = await newDish.save();
        return res.status(201).json(newDish);
    } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
        return res.status(500).json({ error: errorMessage });
    }
}

// Update dish
export const updateDish = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { dishId } = req.params;
        const { name, price, description, restaurantId }: IDish = req.body;

        if (!name || !price || !description || !restaurantId) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        const updatedDish = await DishSchema.findByIdAndUpdate(dishId, {
            name,
            price,
            description
        }, { new: true });

        return res.status(200).json({ status: 'Success', dish: updatedDish });
    } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
        return res.status(500).json({ error: errorMessage });
    }
}

// Delete dish
export const deleteDish = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { dishId } = req.params;

        await DishSchema.findByIdAndDelete(dishId);
        return res.status(200).json({ status: 'Success' });
    } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
        return res.status(500).json({ error: errorMessage });
    }
}