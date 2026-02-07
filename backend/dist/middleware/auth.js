"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorize = exports.authenticate = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const errorHandler_1 = require("./errorHandler");
const config_1 = require("../config/config");
const authenticate = async (req, res, next) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');
        if (!token) {
            throw new errorHandler_1.UnauthorizedError('No token provided');
        }
        const decoded = jsonwebtoken_1.default.verify(token, config_1.config.jwt.secret);
        req.user = {
            id: decoded.userId,
            email: decoded.email,
            userType: decoded.userType
        };
        next();
    }
    catch (error) {
        throw new errorHandler_1.UnauthorizedError('Invalid token');
    }
};
exports.authenticate = authenticate;
const authorize = (allowedRoles) => {
    return (req, res, next) => {
        if (!req.user) {
            throw new errorHandler_1.UnauthorizedError('User not authenticated');
        }
        if (!allowedRoles.includes(req.user.userType)) {
            throw new errorHandler_1.ForbiddenError('Insufficient permissions');
        }
        next();
    };
};
exports.authorize = authorize;
//# sourceMappingURL=auth.js.map