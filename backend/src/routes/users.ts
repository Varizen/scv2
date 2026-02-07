import express from 'express';
import { authenticate, authorize } from '../middleware/auth';
import { getUsers, getUserById, updateUser, deleteUser } from '../controllers/users';
import { asyncHandler } from '../middleware/asyncHandler';

const router = express.Router();

router.use(asyncHandler(authenticate));

router.get('/', authorize(['admin']), asyncHandler(getUsers));
router.get('/:id', authorize(['admin']), asyncHandler(getUserById));
router.put('/:id', authorize(['admin', 'user']), asyncHandler(updateUser));
router.delete('/:id', authorize(['admin']), asyncHandler(deleteUser));

export default router;
