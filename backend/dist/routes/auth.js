"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../controllers/auth");
const validation_1 = require("../middleware/validation");
const asyncHandler_1 = require("../middleware/asyncHandler");
const router = express_1.default.Router();
router.post('/register', validation_1.validateRegister, validation_1.handleValidationErrors, (0, asyncHandler_1.asyncHandler)(auth_1.register));
router.post('/login', validation_1.validateLogin, validation_1.handleValidationErrors, (0, asyncHandler_1.asyncHandler)(auth_1.login));
router.post('/refresh', (0, asyncHandler_1.asyncHandler)(auth_1.refreshToken));
router.post('/logout', (0, asyncHandler_1.asyncHandler)(auth_1.logout));
router.post('/verify-email', validation_1.validateEmailVerification, validation_1.handleValidationErrors, (0, asyncHandler_1.asyncHandler)(auth_1.verifyEmail));
router.post('/forgot-password', validation_1.validateForgotPassword, validation_1.handleValidationErrors, (0, asyncHandler_1.asyncHandler)(auth_1.forgotPassword));
router.post('/reset-password', validation_1.validateResetPassword, validation_1.handleValidationErrors, (0, asyncHandler_1.asyncHandler)(auth_1.resetPassword));
exports.default = router;
//# sourceMappingURL=auth.js.map