import { Router } from 'express';

const router = Router();

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

export default router;