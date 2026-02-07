import express from 'express';
import { authenticate, authorize } from '../middleware/auth';
import { asyncHandler } from '../middleware/asyncHandler';

const router = express.Router();

router.use(asyncHandler(authenticate));

// Placeholder routes - to be implemented
router.get('/', authorize(['admin', 'worker', 'employer']), (req, res) => {
  res.json({ message: 'Jobs endpoint - to be implemented' });
});

router.get('/:id', authorize(['admin', 'worker', 'employer']), (req, res) => {
  res.json({ message: 'Job details - to be implemented' });
});

router.post('/', authorize(['admin', 'employer']), (req, res) => {
  res.json({ message: 'Create job - to be implemented' });
});

router.put('/:id', authorize(['admin', 'employer']), (req, res) => {
  res.json({ message: 'Update job - to be implemented' });
});

router.delete('/:id', authorize(['admin', 'employer']), (req, res) => {
  res.json({ message: 'Delete job - to be implemented' });
});

export default router;
