import { Request, Response, NextFunction } from 'express';
import { asyncHandler } from '../middleware/asyncHandler';

describe('asyncHandler', () => {
  it('forwards async errors to next()', async () => {
    const error = new Error('boom');
    const handler = asyncHandler(async () => {
      throw error;
    });

    const next = jest.fn() as NextFunction;
    await handler({} as Request, {} as Response, next);

    expect(next).toHaveBeenCalledWith(error);
  });
});
