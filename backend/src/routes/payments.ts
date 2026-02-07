import express from 'express';
import { authenticate, authorize } from '../middleware/auth';
import { asyncHandler } from '../middleware/asyncHandler';

const router = express.Router();

router.use(asyncHandler(authenticate));

// Placeholder routes - to be implemented
router.get('/', authorize(['admin', 'worker', 'employer']), (req, res) => {
  res.json({ message: 'Payments endpoint - to be implemented' });
});

router.get('/:id', authorize(['admin', 'worker', 'employer']), (req, res) => {
  res.json({ message: 'Payment details - to be implemented' });
});

router.post('/', authorize(['admin', 'worker']), (req, res) => {
  res.json({ message: 'Create payment - to be implemented' });
});

router.put('/:id', authorize(['admin']), (req, res) => {
  res.json({ message: 'Update payment - to be implemented' });
});

export default router;
