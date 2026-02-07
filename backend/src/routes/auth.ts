import express from 'express';
import { register, login, refreshToken, logout, verifyEmail, forgotPassword, resetPassword } from '../controllers/auth';
import { validateRegister, validateLogin, validateEmailVerification, validateForgotPassword, validateResetPassword, handleValidationErrors } from '../middleware/validation';
import { asyncHandler } from '../middleware/asyncHandler';

const router = express.Router();

router.post('/register', validateRegister, handleValidationErrors, asyncHandler(register));
router.post('/login', validateLogin, handleValidationErrors, asyncHandler(login));
router.post('/refresh', asyncHandler(refreshToken));
router.post('/logout', asyncHandler(logout));
router.post('/verify-email', validateEmailVerification, handleValidationErrors, asyncHandler(verifyEmail));
router.post('/forgot-password', validateForgotPassword, handleValidationErrors, asyncHandler(forgotPassword));
router.post('/reset-password', validateResetPassword, handleValidationErrors, asyncHandler(resetPassword));

export default router;
