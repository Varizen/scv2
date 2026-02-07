import express from 'express';
import { authenticate, authorize } from '../middleware/auth';
import { asyncHandler } from '../middleware/asyncHandler';

const router = express.Router();

router.use(asyncHandler(authenticate));

// Placeholder routes - to be implemented
router.get('/', authorize(['admin', 'worker', 'employer']), (req, res) => {
  res.json({ message: 'Applications endpoint - to be implemented' });
});

router.get('/:id', authorize(['admin', 'worker', 'employer']), (req, res) => {
  res.json({ message: 'Application details - to be implemented' });
});

router.post('/', authorize(['admin', 'worker']), (req, res) => {
  res.json({ message: 'Create application - to be implemented' });
});

router.put('/:id', authorize(['admin', 'worker', 'employer']), (req, res) => {
  res.json({ message: 'Update application - to be implemented' });
});

export default router;
