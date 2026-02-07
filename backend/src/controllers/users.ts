import { Response } from 'express';
import { AuthRequest } from '../types';
import { pool } from '../config/database';
import { ApiResponse } from '../types';
import { ValidationError } from '../middleware/errorHandler';

export const getUsers = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { page = 1, limit = 10, userType, status } = req.query;
    const offset = (Number(page) - 1) * Number(limit);

    let query = 'SELECT id, email, first_name, last_name, phone, user_type, status, email_verified, created_at FROM users WHERE 1=1';
    const params: any[] = [];
    let paramIndex = 1;

    if (userType) {
      query += ` AND user_type = $${paramIndex}`;
      params.push(userType);
      paramIndex++;
    }

    if (status) {
      query += ` AND status = $${paramIndex}`;
      params.push(status);
      paramIndex++;
    }

    query += ` ORDER BY created_at DESC LIMIT $${paramIndex} OFFSET $${paramIndex + 1}`;
    params.push(limit, offset);

    const result = await pool.query(query, params);

    const countQuery = 'SELECT COUNT(*) FROM users WHERE 1=1' + 
      (userType ? ' AND user_type = $1' : '') + 
      (status ? ` AND status = $${userType ? 2 : 1}` : '');
    
    const countParams = userType && status ? [userType, status] : userType ? [userType] : status ? [status] : [];
    const countResult = await pool.query(countQuery, countParams);
    const total = parseInt(countResult.rows[0].count);

    const response: ApiResponse<any> = {
      success: true,
      data: result.rows,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        totalPages: Math.ceil(total / Number(limit))
      },
      message: 'Users retrieved successfully'
    };

    res.json(response);
  } catch (error) {
    console.error('Get users error:', error);
    throw error;
  }
};

export const getUserById = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      'SELECT id, email, first_name, last_name, phone, date_of_birth, nationality, user_type, status, email_verified, created_at, last_login FROM users WHERE id = $1',
      [id]
    );

    if (result.rows.length === 0) {
      throw new ValidationError('User not found');
    }

    const response: ApiResponse<any> = {
      success: true,
      data: result.rows[0],
      message: 'User retrieved successfully'
    };

    res.json(response);
  } catch (error) {
    console.error('Get user by ID error:', error);
    throw error;
  }
};

export const updateUser = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { firstName, lastName, phone, dateOfBirth, nationality, status } = req.body;

    // Check if user can update this profile
    if (req.user?.userType !== 'admin' && req.user?.id !== id) {
      throw new ValidationError('Unauthorized to update this user');
    }

    const result = await pool.query(
      'UPDATE users SET first_name = $1, last_name = $2, phone = $3, date_of_birth = $4, nationality = $5, status = $6, updated_at = NOW() WHERE id = $7 RETURNING id, email, first_name, last_name, phone, user_type, status',
      [firstName, lastName, phone, dateOfBirth, nationality, status, id]
    );

    if (result.rows.length === 0) {
      throw new ValidationError('User not found');
    }

    const response: ApiResponse<any> = {
      success: true,
      data: result.rows[0],
      message: 'User updated successfully'
    };

    res.json(response);
  } catch (error) {
    console.error('Update user error:', error);
    throw error;
  }
};

export const deleteUser = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const result = await pool.query('DELETE FROM users WHERE id = $1 RETURNING id', [id]);

    if (result.rows.length === 0) {
      throw new ValidationError('User not found');
    }

    const response: ApiResponse<null> = {
      success: true,
      message: 'User deleted successfully'
    };

    res.json(response);
  } catch (error) {
    console.error('Delete user error:', error);
    throw error;
  }
};