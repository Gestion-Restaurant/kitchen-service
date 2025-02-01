import { Router } from 'express';

const router = Router();

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