import express from 'express';
import { authenticate, authorize } from '../middleware/auth';
import { asyncHandler } from '../middleware/asyncHandler';

const router = express.Router();

router.use(asyncHandler(authenticate));

// Placeholder routes - to be implemented
router.get('/', authorize(['admin', 'worker', 'employer']), (req, res) => {
  res.json({ message: 'Documents endpoint - to be implemented' });
});

router.get('/:id', authorize(['admin', 'worker', 'employer']), (req, res) => {
  res.json({ message: 'Document details - to be implemented' });
});

router.post('/', authorize(['admin', 'worker']), (req, res) => {
  res.json({ message: 'Upload document - to be implemented' });
});

router.put('/:id', authorize(['admin', 'worker']), (req, res) => {
  res.json({ message: 'Update document - to be implemented' });
});

router.delete('/:id', authorize(['admin', 'worker']), (req, res) => {
  res.json({ message: 'Delete document - to be implemented' });
});

export default router;
