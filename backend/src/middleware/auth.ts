import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { AuthRequest } from '../types';
import { UnauthorizedError, ForbiddenError } from './errorHandler';
import { config } from '../config/config';

export const authenticate = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
      throw new UnauthorizedError('No token provided');
    }

    const decoded = jwt.verify(token, config.jwt.secret) as any;
    
    req.user = {
      id: decoded.userId,
      email: decoded.email,
      userType: decoded.userType
    };

    next();
  } catch (error) {
    throw new UnauthorizedError('Invalid token');
  }
};

export const authorize = (allowedRoles: string[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction): void => {
    if (!req.user) {
      throw new UnauthorizedError('User not authenticated');
    }

    if (!allowedRoles.includes(req.user.userType)) {
      throw new ForbiddenError('Insufficient permissions');
    }

    next();
  };
};