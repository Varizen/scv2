import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { pool } from '../config/database';
import { redisClient } from '../config/database';
import { User, ApiResponse } from '../types';
import { ValidationError, UnauthorizedError } from '../middleware/errorHandler';
import { sendEmail } from '../services/email';
import { generateOTP } from '../utils/otp';

const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret-key';
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'fallback-refresh-secret-key';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '15m';
const JWT_REFRESH_EXPIRES_IN = process.env.JWT_REFRESH_EXPIRES_IN || '7d';

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new ValidationError(errors.array()[0].msg);
    }

    const { email, password, firstName, lastName, phone, dateOfBirth, nationality, userType } = req.body;

    // Check if user already exists
    const existingUser = await pool.query('SELECT id FROM users WHERE email = $1', [email]);
    if (existingUser.rows.length > 0) {
      throw new ValidationError('User already exists with this email');
    }

    // Hash password
    const saltRounds = parseInt(process.env.BCRYPT_ROUNDS || '12');
    const passwordHash = await bcrypt.hash(password, saltRounds);

    // Generate email verification token
    const emailVerificationToken = generateOTP();

    // Create user
    const result = await pool.query(
      `INSERT INTO users (email, password_hash, first_name, last_name, phone, date_of_birth, nationality, user_type, email_verification_token)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
       RETURNING id, email, first_name, last_name, user_type, status, email_verified, created_at`,
      [email, passwordHash, firstName, lastName, phone, dateOfBirth, nationality, userType, emailVerificationToken]
    );

    const user = result.rows[0];

    // Send verification email
    await sendEmail({
      to: email,
      subject: 'Verify your email address',
      template: 'email-verification',
      data: {
        firstName,
        verificationCode: emailVerificationToken
      }
    });

    // Create worker or employer profile based on user type
    if (userType === 'worker') {
      await pool.query(
        'INSERT INTO workers (user_id, current_country) VALUES ($1, $2)',
        [user.id, 'bangladesh']
      );
    } else if (userType === 'employer') {
      await pool.query(
        'INSERT INTO employers (user_id, company_name) VALUES ($1, $2)',
        [user.id, '']
      );
    }

    const response: ApiResponse<User> = {
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
  } catch (error) {
    console.error('Registration error:', error);
    throw error;
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new ValidationError(errors.array()[0].msg);
    }

    const { email, password } = req.body;

    // Find user
    const result = await pool.query(
      'SELECT id, email, password_hash, first_name, last_name, user_type, status, email_verified FROM users WHERE email = $1 AND status = $2',
      [email, 'active']
    );

    if (result.rows.length === 0) {
      throw new UnauthorizedError('Invalid credentials');
    }

    const user = result.rows[0];

    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password_hash);
    if (!isPasswordValid) {
      throw new UnauthorizedError('Invalid credentials');
    }

    // Check if email is verified
    if (!user.email_verified) {
      throw new UnauthorizedError('Please verify your email address');
    }

    // Generate tokens
    const accessToken = jwt.sign(
      { userId: user.id, email: user.email, userType: user.user_type },
      JWT_SECRET,
      { expiresIn: '15m' }
    );

    const refreshToken = jwt.sign(
      { userId: user.id },
      JWT_REFRESH_SECRET,
      { expiresIn: '7d' }
    );

    // Store refresh token in Redis
    await redisClient.setEx(`refresh_token:${user.id}`, 7 * 24 * 60 * 60, refreshToken);

    // Update last login
    await pool.query('UPDATE users SET last_login = NOW() WHERE id = $1', [user.id]);

    const response: ApiResponse<{ user: User; accessToken: string; refreshToken: string }> = {
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
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

export const refreshToken = async (req: Request, res: Response): Promise<void> => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      throw new UnauthorizedError('Refresh token required');
    }

    // Verify refresh token
    const decoded = jwt.verify(refreshToken, JWT_REFRESH_SECRET) as any;
    
    // Check if refresh token exists in Redis
    const storedToken = await redisClient.get(`refresh_token:${decoded.userId}`);
    if (storedToken !== refreshToken) {
      throw new UnauthorizedError('Invalid refresh token');
    }

    // Get user details
    const result = await pool.query(
      'SELECT id, email, first_name, last_name, user_type, status FROM users WHERE id = $1',
      [decoded.userId]
    );

    if (result.rows.length === 0) {
      throw new UnauthorizedError('User not found');
    }

    const user = result.rows[0];

    // Generate new access token
    const newAccessToken = jwt.sign(
      { userId: user.id, email: user.email, userType: user.user_type },
      JWT_SECRET,
      { expiresIn: '15m' }
    );

    const response: ApiResponse<{ accessToken: string }> = {
      success: true,
      data: { accessToken: newAccessToken },
      message: 'Token refreshed successfully'
    };

    res.json(response);
  } catch (error) {
    console.error('Refresh token error:', error);
    throw new UnauthorizedError('Invalid refresh token');
  }
};

export const logout = async (req: Request, res: Response): Promise<void> => {
  try {
    const { refreshToken } = req.body;

    if (refreshToken) {
      try {
        const decoded = jwt.verify(refreshToken, JWT_REFRESH_SECRET) as any;
        await redisClient.del(`refresh_token:${decoded.userId}`);
      } catch (error) {
        // Token might be expired, ignore error
      }
    }

    const response: ApiResponse<null> = {
      success: true,
      message: 'Logged out successfully'
    };

    res.json(response);
  } catch (error) {
    console.error('Logout error:', error);
    throw error;
  }
};

export const verifyEmail = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, code } = req.body;

    // Find user with verification code
    const result = await pool.query(
      'SELECT id, email_verification_token FROM users WHERE email = $1 AND email_verification_token = $2',
      [email, code]
    );

    if (result.rows.length === 0) {
      throw new ValidationError('Invalid verification code');
    }

    const user = result.rows[0];

    // Update user as verified
    await pool.query(
      'UPDATE users SET email_verified = true, email_verification_token = NULL WHERE id = $1',
      [user.id]
    );

    const response: ApiResponse<null> = {
      success: true,
      message: 'Email verified successfully'
    };

    res.json(response);
  } catch (error) {
    console.error('Email verification error:', error);
    throw error;
  }
};

export const forgotPassword = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email } = req.body;

    // Find user
    const result = await pool.query(
      'SELECT id, email, first_name FROM users WHERE email = $1',
      [email]
    );

    if (result.rows.length === 0) {
      // Don't reveal if user exists
      const response: ApiResponse<null> = {
        success: true,
        message: 'If an account exists with this email, you will receive password reset instructions'
      };
      res.json(response);
      return;
    }

    const user = result.rows[0];

    // Generate reset token
    const resetToken = generateOTP();
    const resetTokenExpiry = new Date(Date.now() + 3600000); // 1 hour

    // Store reset token
    await pool.query(
      'UPDATE users SET password_reset_token = $1, password_reset_expires = $2 WHERE id = $3',
      [resetToken, resetTokenExpiry, user.id]
    );

    // Send reset email
    await sendEmail({
      to: user.email,
      subject: 'Password Reset Request',
      template: 'password-reset',
      data: {
        firstName: user.first_name,
        resetCode: resetToken
      }
    });

    const response: ApiResponse<null> = {
      success: true,
      message: 'If an account exists with this email, you will receive password reset instructions'
    };

    res.json(response);
  } catch (error) {
    console.error('Forgot password error:', error);
    throw error;
  }
};

export const resetPassword = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, code, newPassword } = req.body;

    // Find user with valid reset token
    const result = await pool.query(
      'SELECT id FROM users WHERE email = $1 AND password_reset_token = $2 AND password_reset_expires > NOW()',
      [email, code]
    );

    if (result.rows.length === 0) {
      throw new ValidationError('Invalid or expired reset code');
    }

    const user = result.rows[0];

    // Hash new password
    const saltRounds = parseInt(process.env.BCRYPT_ROUNDS || '12');
    const passwordHash = await bcrypt.hash(newPassword, saltRounds);

    // Update password and clear reset token
    await pool.query(
      'UPDATE users SET password_hash = $1, password_reset_token = NULL, password_reset_expires = NULL WHERE id = $2',
      [passwordHash, user.id]
    );

    const response: ApiResponse<null> = {
      success: true,
      message: 'Password reset successfully'
    };

    res.json(response);
  } catch (error) {
    console.error('Reset password error:', error);
    throw error;
  }
};