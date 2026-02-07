import { Request, Response, NextFunction } from 'express';
export declare const validateRegister: import("express-validator").ValidationChain[];
export declare const validateLogin: import("express-validator").ValidationChain[];
export declare const validateEmailVerification: import("express-validator").ValidationChain[];
export declare const validateForgotPassword: import("express-validator").ValidationChain[];
export declare const validateResetPassword: import("express-validator").ValidationChain[];
export declare const validateWorkerProfile: import("express-validator").ValidationChain[];
export declare const validateJob: import("express-validator").ValidationChain[];
export declare const validateApplication: import("express-validator").ValidationChain[];
export declare const validateDocument: import("express-validator").ValidationChain[];
export declare const validateVisaApplication: import("express-validator").ValidationChain[];
export declare const validatePayment: import("express-validator").ValidationChain[];
export declare const handleValidationErrors: (req: Request, res: Response, next: NextFunction) => void;
//# sourceMappingURL=validation.d.ts.map