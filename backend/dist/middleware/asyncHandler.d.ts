import { Request, Response, NextFunction, RequestHandler } from 'express';
type AsyncHandler = (req: Request, res: Response, next: NextFunction) => Promise<unknown>;
export declare const asyncHandler: (handler: AsyncHandler) => RequestHandler;
export {};
//# sourceMappingURL=asyncHandler.d.ts.map