"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.getUserById = exports.getUsers = void 0;
const database_1 = require("../config/database");
const errorHandler_1 = require("../middleware/errorHandler");
const getUsers = async (req, res) => {
    try {
        const { page = 1, limit = 10, userType, status } = req.query;
        const offset = (Number(page) - 1) * Number(limit);
        let query = 'SELECT id, email, first_name, last_name, phone, user_type, status, email_verified, created_at FROM users WHERE 1=1';
        const params = [];
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
        const result = await database_1.pool.query(query, params);
        const countQuery = 'SELECT COUNT(*) FROM users WHERE 1=1' +
            (userType ? ' AND user_type = $1' : '') +
            (status ? ` AND status = $${userType ? 2 : 1}` : '');
        const countParams = userType && status ? [userType, status] : userType ? [userType] : status ? [status] : [];
        const countResult = await database_1.pool.query(countQuery, countParams);
        const total = parseInt(countResult.rows[0].count);
        const response = {
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
    }
    catch (error) {
        console.error('Get users error:', error);
        throw error;
    }
};
exports.getUsers = getUsers;
const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await database_1.pool.query('SELECT id, email, first_name, last_name, phone, date_of_birth, nationality, user_type, status, email_verified, created_at, last_login FROM users WHERE id = $1', [id]);
        if (result.rows.length === 0) {
            throw new errorHandler_1.ValidationError('User not found');
        }
        const response = {
            success: true,
            data: result.rows[0],
            message: 'User retrieved successfully'
        };
        res.json(response);
    }
    catch (error) {
        console.error('Get user by ID error:', error);
        throw error;
    }
};
exports.getUserById = getUserById;
const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { firstName, lastName, phone, dateOfBirth, nationality, status } = req.body;
        if (req.user?.userType !== 'admin' && req.user?.id !== id) {
            throw new errorHandler_1.ValidationError('Unauthorized to update this user');
        }
        const result = await database_1.pool.query('UPDATE users SET first_name = $1, last_name = $2, phone = $3, date_of_birth = $4, nationality = $5, status = $6, updated_at = NOW() WHERE id = $7 RETURNING id, email, first_name, last_name, phone, user_type, status', [firstName, lastName, phone, dateOfBirth, nationality, status, id]);
        if (result.rows.length === 0) {
            throw new errorHandler_1.ValidationError('User not found');
        }
        const response = {
            success: true,
            data: result.rows[0],
            message: 'User updated successfully'
        };
        res.json(response);
    }
    catch (error) {
        console.error('Update user error:', error);
        throw error;
    }
};
exports.updateUser = updateUser;
const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await database_1.pool.query('DELETE FROM users WHERE id = $1 RETURNING id', [id]);
        if (result.rows.length === 0) {
            throw new errorHandler_1.ValidationError('User not found');
        }
        const response = {
            success: true,
            message: 'User deleted successfully'
        };
        res.json(response);
    }
    catch (error) {
        console.error('Delete user error:', error);
        throw error;
    }
};
exports.deleteUser = deleteUser;
//# sourceMappingURL=users.js.map