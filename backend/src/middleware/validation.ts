import { body, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';
import { ValidationError } from './errorHandler';

export const validateRegister = [
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email address'),
  body('password')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/)
    .withMessage('Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'),
  body('firstName')
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('First name must be between 2 and 50 characters'),
  body('lastName')
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('Last name must be between 2 and 50 characters'),
  body('phone')
    .optional()
    .isMobilePhone('any')
    .withMessage('Please provide a valid phone number'),
  body('dateOfBirth')
    .optional()
    .isISO8601()
    .withMessage('Please provide a valid date of birth'),
  body('nationality')
    .optional()
    .isLength({ min: 2, max: 50 })
    .withMessage('Nationality must be between 2 and 50 characters'),
  body('userType')
    .isIn(['worker', 'employer', 'admin'])
    .withMessage('User type must be worker, employer, or admin')
];

export const validateLogin = [
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email address'),
  body('password')
    .notEmpty()
    .withMessage('Password is required')
];

export const validateEmailVerification = [
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email address'),
  body('code')
    .isLength({ min: 6, max: 6 })
    .isNumeric()
    .withMessage('Verification code must be a 6-digit number')
];

export const validateForgotPassword = [
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email address')
];

export const validateResetPassword = [
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email address'),
  body('code')
    .isLength({ min: 6, max: 6 })
    .isNumeric()
    .withMessage('Reset code must be a 6-digit number'),
  body('newPassword')
    .isLength({ min: 8 })
    .withMessage('New password must be at least 8 characters long')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/)
    .withMessage('New password must contain at least one uppercase letter, one lowercase letter, one number, and one special character')
];

export const validateWorkerProfile = [
  body('currentCountry')
    .optional()
    .isLength({ min: 2, max: 50 })
    .withMessage('Current country must be between 2 and 50 characters'),
  body('skills')
    .optional()
    .isArray()
    .withMessage('Skills must be an array'),
  body('experience')
    .optional()
    .isInt({ min: 0, max: 50 })
    .withMessage('Experience must be a number between 0 and 50'),
  body('education')
    .optional()
    .isLength({ min: 2, max: 100 })
    .withMessage('Education must be between 2 and 100 characters'),
  body('languages')
    .optional()
    .isArray()
    .withMessage('Languages must be an array'),
  body('passportNumber')
    .optional()
    .isLength({ min: 5, max: 20 })
    .withMessage('Passport number must be between 5 and 20 characters'),
  body('malaysiaVisaExpiry')
    .optional()
    .isISO8601()
    .withMessage('Malaysia visa expiry must be a valid date')
];

export const validateJob = [
  body('title')
    .trim()
    .isLength({ min: 5, max: 100 })
    .withMessage('Job title must be between 5 and 100 characters'),
  body('description')
    .trim()
    .isLength({ min: 20, max: 2000 })
    .withMessage('Job description must be between 20 and 2000 characters'),
  body('location')
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Job location must be between 2 and 100 characters'),
  body('salary')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Salary must be a positive number'),
  body('currency')
    .optional()
    .isIn(['USD', 'EUR', 'BDT', 'MYR'])
    .withMessage('Currency must be USD, EUR, BDT, or MYR'),
  body('jobType')
    .isIn(['seasonal', 'permanent', 'contract'])
    .withMessage('Job type must be seasonal, permanent, or contract'),
  body('sector')
    .isIn(['agriculture', 'construction', 'hospitality', 'manufacturing', 'healthcare', 'other'])
    .withMessage('Sector must be agriculture, construction, hospitality, manufacturing, healthcare, or other'),
  body('requirements')
    .optional()
    .isArray()
    .withMessage('Requirements must be an array'),
  body('benefits')
    .optional()
    .isArray()
    .withMessage('Benefits must be an array')
];

export const validateApplication = [
  body('jobId')
    .isUUID()
    .withMessage('Job ID must be a valid UUID'),
  body('workerId')
    .isUUID()
    .withMessage('Worker ID must be a valid UUID'),
  body('coverLetter')
    .optional()
    .trim()
    .isLength({ min: 10, max: 1000 })
    .withMessage('Cover letter must be between 10 and 1000 characters')
];

export const validateDocument = [
  body('documentType')
    .isIn(['passport', 'visa', 'certificate', 'contract', 'other'])
    .withMessage('Document type must be passport, visa, certificate, contract, or other'),
  body('fileName')
    .trim()
    .isLength({ min: 1, max: 255 })
    .withMessage('File name is required and must be less than 255 characters'),
  body('fileSize')
    .isInt({ min: 1, max: 10485760 })
    .withMessage('File size must be between 1 and 10MB')
];

export const validateVisaApplication = [
  body('workerId')
    .isUUID()
    .withMessage('Worker ID must be a valid UUID'),
  body('jobId')
    .isUUID()
    .withMessage('Job ID must be a valid UUID'),
  body('visaType')
    .isIn(['seasonal', 'permanent', 'student'])
    .withMessage('Visa type must be seasonal, permanent, or student'),
  body('destinationCountry')
    .isLength({ min: 2, max: 50 })
    .withMessage('Destination country must be between 2 and 50 characters')
];

export const validatePayment = [
  body('amount')
    .isFloat({ min: 0.01 })
    .withMessage('Amount must be a positive number'),
  body('currency')
    .isIn(['USD', 'EUR', 'BDT'])
    .withMessage('Currency must be USD, EUR, or BDT'),
  body('service')
    .isIn(['registration', 'job_matching', 'documentation', 'visa_processing', 'pre_departure', 'post_arrival', 'employer_services'])
    .withMessage('Service must be a valid service type'),
  body('paymentMethod')
    .isIn(['stripe', 'bank_transfer', 'cash'])
    .withMessage('Payment method must be stripe, bank_transfer, or cash')
];

export const handleValidationErrors = (req: Request, res: Response, next: NextFunction): void => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorMessages = errors.array().map(error => error.msg);
    throw new ValidationError(errorMessages.join(', '));
  }
  next();
};