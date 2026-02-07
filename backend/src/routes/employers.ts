import express from 'express';
import { authenticate, authorize } from '../middleware/auth';
import { asyncHandler } from '../middleware/asyncHandler';

const router = express.Router();

router.use(asyncHandler(authenticate));

// Placeholder routes - to be implemented
router.get('/', authorize(['admin', 'employer']), (req, res) => {
  res.json({ message: 'Employers endpoint - to be implemented' });
});

router.get('/:id', authorize(['admin', 'employer']), (req, res) => {
  res.json({ message: 'Employer details - to be implemented' });
});

router.post('/', authorize(['admin', 'employer']), (req, res) => {
  res.json({ message: 'Create employer - to be implemented' });
});

router.put('/:id', authorize(['admin', 'employer']), (req, res) => {
  res.json({ message: 'Update employer - to be implemented' });
});

export default router;
