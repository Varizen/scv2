import express from 'express';
import { authenticate, authorize } from '../middleware/auth';
import { asyncHandler } from '../middleware/asyncHandler';

const router = express.Router();

router.use(asyncHandler(authenticate));

// Placeholder routes - to be implemented
router.get('/', authorize(['admin', 'worker']), (req, res) => {
  res.json({ message: 'Workers endpoint - to be implemented' });
});

router.get('/:id', authorize(['admin', 'worker']), (req, res) => {
  res.json({ message: 'Worker details - to be implemented' });
});

router.post('/', authorize(['admin', 'worker']), (req, res) => {
  res.json({ message: 'Create worker - to be implemented' });
});

router.put('/:id', authorize(['admin', 'worker']), (req, res) => {
  res.json({ message: 'Update worker - to be implemented' });
});

export default router;
