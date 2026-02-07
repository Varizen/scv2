import { Request, Response } from 'express';
import { ApiResponse } from '../types';

export const notFound = (req: Request, res: Response): void => {
  const response: ApiResponse<null> = {
    success: false,
    error: 'Resource not found',
    message: `Route ${req.originalUrl} not found`
  };
  
  res.status(404).json(response);
};