"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetPassword = exports.forgotPassword = exports.verifyEmail = exports.logout = exports.refreshToken = exports.login = exports.register = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const express_validator_1 = require("express-validator");
const database_1 = require("../config/database");
const database_2 = require("../config/database");
const errorHandler_1 = require("../middleware/errorHandler");
const email_1 = require("../services/email");
const otp_1 = require("../utils/otp");
const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret-key';
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'fallback-refresh-secret-key';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '15m';
const JWT_REFRESH_EXPIRES_IN = process.env.JWT_REFRESH_EXPIRES_IN || '7d';
const register = async (req, res) => {
    try {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            throw new errorHandler_1.ValidationError(errors.array()[0].msg);
        }
        const { email, password, firstName, lastName, phone, dateOfBirth, nationality, userType } = req.body;
        const existingUser = await database_1.pool.query('SELECT id FROM users WHERE email = $1', [email]);
        if (existingUser.rows.length > 0) {
            throw new errorHandler_1.ValidationError('User already exists with this email');
        }
        const saltRounds = parseInt(process.env.BCRYPT_ROUNDS || '12');
        const passwordHash = await bcryptjs_1.default.hash(password, saltRounds);
        const emailVerificationToken = (0, otp_1.generateOTP)();
        const result = await database_1.pool.query(`INSERT INTO users (email, password_hash, first_name, last_name, phone, date_of_birth, nationality, user_type, email_verification_token)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
       RETURNING id, email, first_name, last_name, user_type, status, email_verified, created_at`, [email, passwordHash, firstName, lastName, phone, dateOfBirth, nationality, userType, emailVerificationToken]);
        const user = result.rows[0];
        await (0, email_1.sendEmail)({
            to: email,
            subject: 'Verify your email address',
            template: 'email-verification',
            data: {
                firstName,
                verificationCode: emailVerificationToken
            }
        });
        if (userType === 'worker') {
            await database_1.pool.query('INSERT INTO workers (user_id, current_country) VALUES ($1, $2)', [user.id, 'bangladesh']);
        }
        else if (userType === 'employer') {
            await database_1.pool.query('INSERT INTO employers (user_id, company_name) VALUES ($1, $2)', [user.id, '']);
        }
        const response = {
            success: true,
            data: {
                id: user.id,
                email: user.email,
                firstName: user.first_name,
                lastName: user.last_name,
                userType: user.user_type,
                status: user.status,
                emailVerified: user.email_verified,
                phoneVerified: false,
                createdAt: user.created_at,
                updatedAt: user.created_at
            },
            message: 'User registered successfully. Please check your email for verification.'
        };
        res.status(201).json(response);
    }
    catch (error) {
        console.error('Registration error:', error);
        throw error;
    }
};
exports.register = register;
const login = async (req, res) => {
    try {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            throw new errorHandler_1.ValidationError(errors.array()[0].msg);
        }
        const { email, password } = req.body;
        const result = await database_1.pool.query('SELECT id, email, password_hash, first_name, last_name, user_type, status, email_verified FROM users WHERE email = $1 AND status = $2', [email, 'active']);
        if (result.rows.length === 0) {
            throw new errorHandler_1.UnauthorizedError('Invalid credentials');
        }
        const user = result.rows[0];
        const isPasswordValid = await bcryptjs_1.default.compare(password, user.password_hash);
        if (!isPasswordValid) {
            throw new errorHandler_1.UnauthorizedError('Invalid credentials');
        }
        if (!user.email_verified) {
            throw new errorHandler_1.UnauthorizedError('Please verify your email address');
        }
        const accessToken = jsonwebtoken_1.default.sign({ userId: user.id, email: user.email, userType: user.user_type }, JWT_SECRET, { expiresIn: '15m' });
        const refreshToken = jsonwebtoken_1.default.sign({ userId: user.id }, JWT_REFRESH_SECRET, { expiresIn: '7d' });
        await database_2.redisClient.setEx(`refresh_token:${user.id}`, 7 * 24 * 60 * 60, refreshToken);
        await database_1.pool.query('UPDATE users SET last_login = NOW() WHERE id = $1', [user.id]);
        const response = {
            success: true,
            data: {
                user: {
                    id: user.id,
                    email: user.email,
                    firstName: user.first_name,
                    lastName: user.last_name,
                    userType: user.user_type,
                    status: user.status,
                    emailVerified: user.email_verified,
                    phoneVerified: false,
                    createdAt: user.created_at,
                    updatedAt: user.updated_at
                },
                accessToken,
                refreshToken
            },
            message: 'Login successful'
        };
        res.json(response);
    }
    catch (error) {
        console.error('Login error:', error);
        throw error;
    }
};
exports.login = login;
const refreshToken = async (req, res) => {
    try {
        const { refreshToken } = req.body;
        if (!refreshToken) {
            throw new errorHandler_1.UnauthorizedError('Refresh token required');
        }
        const decoded = jsonwebtoken_1.default.verify(refreshToken, JWT_REFRESH_SECRET);
        const storedToken = await database_2.redisClient.get(`refresh_token:${decoded.userId}`);
        if (storedToken !== refreshToken) {
            throw new errorHandler_1.UnauthorizedError('Invalid refresh token');
        }
        const result = await database_1.pool.query('SELECT id, email, first_name, last_name, user_type, status FROM users WHERE id = $1', [decoded.userId]);
        if (result.rows.length === 0) {
            throw new errorHandler_1.UnauthorizedError('User not found');
        }
        const user = result.rows[0];
        const newAccessToken = jsonwebtoken_1.default.sign({ userId: user.id, email: user.email, userType: user.user_type }, JWT_SECRET, { expiresIn: '15m' });
        const response = {
            success: true,
            data: { accessToken: newAccessToken },
            message: 'Token refreshed successfully'
        };
        res.json(response);
    }
    catch (error) {
        console.error('Refresh token error:', error);
        throw new errorHandler_1.UnauthorizedError('Invalid refresh token');
    }
};
exports.refreshToken = refreshToken;
const logout = async (req, res) => {
    try {
        const { refreshToken } = req.body;
        if (refreshToken) {
            try {
                const decoded = jsonwebtoken_1.default.verify(refreshToken, JWT_REFRESH_SECRET);
                await database_2.redisClient.del(`refresh_token:${decoded.userId}`);
            }
            catch (error) {
            }
        }
        const response = {
            success: true,
            message: 'Logged out successfully'
        };
        res.json(response);
    }
    catch (error) {
        console.error('Logout error:', error);
        throw error;
    }
};
exports.logout = logout;
const verifyEmail = async (req, res) => {
    try {
        const { email, code } = req.body;
        const result = await database_1.pool.query('SELECT id, email_verification_token FROM users WHERE email = $1 AND email_verification_token = $2', [email, code]);
        if (result.rows.length === 0) {
            throw new errorHandler_1.ValidationError('Invalid verification code');
        }
        const user = result.rows[0];
        await database_1.pool.query('UPDATE users SET email_verified = true, email_verification_token = NULL WHERE id = $1', [user.id]);
        const response = {
            success: true,
            message: 'Email verified successfully'
        };
        res.json(response);
    }
    catch (error) {
        console.error('Email verification error:', error);
        throw error;
    }
};
exports.verifyEmail = verifyEmail;
const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        const result = await database_1.pool.query('SELECT id, email, first_name FROM users WHERE email = $1', [email]);
        if (result.rows.length === 0) {
            const response = {
                success: true,
                message: 'If an account exists with this email, you will receive password reset instructions'
            };
            res.json(response);
            return;
        }
        const user = result.rows[0];
        const resetToken = (0, otp_1.generateOTP)();
        const resetTokenExpiry = new Date(Date.now() + 3600000);
        await database_1.pool.query('UPDATE users SET password_reset_token = $1, password_reset_expires = $2 WHERE id = $3', [resetToken, resetTokenExpiry, user.id]);
        await (0, email_1.sendEmail)({
            to: user.email,
            subject: 'Password Reset Request',
            template: 'password-reset',
            data: {
                firstName: user.first_name,
                resetCode: resetToken
            }
        });
        const response = {
            success: true,
            message: 'If an account exists with this email, you will receive password reset instructions'
        };
        res.json(response);
    }
    catch (error) {
        console.error('Forgot password error:', error);
        throw error;
    }
};
exports.forgotPassword = forgotPassword;
const resetPassword = async (req, res) => {
    try {
        const { email, code, newPassword } = req.body;
        const result = await database_1.pool.query('SELECT id FROM users WHERE email = $1 AND password_reset_token = $2 AND password_reset_expires > NOW()', [email, code]);
        if (result.rows.length === 0) {
            throw new errorHandler_1.ValidationError('Invalid or expired reset code');
        }
        const user = result.rows[0];
        const saltRounds = parseInt(process.env.BCRYPT_ROUNDS || '12');
        const passwordHash = await bcryptjs_1.default.hash(newPassword, saltRounds);
        await database_1.pool.query('UPDATE users SET password_hash = $1, password_reset_token = NULL, password_reset_expires = NULL WHERE id = $2', [passwordHash, user.id]);
        const response = {
            success: true,
            message: 'Password reset successfully'
        };
        res.json(response);
    }
    catch (error) {
        console.error('Reset password error:', error);
        throw error;
    }
};
exports.resetPassword = resetPassword;
//# sourceMappingURL=auth.js.map