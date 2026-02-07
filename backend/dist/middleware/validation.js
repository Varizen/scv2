"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleValidationErrors = exports.validatePayment = exports.validateVisaApplication = exports.validateDocument = exports.validateApplication = exports.validateJob = exports.validateWorkerProfile = exports.validateResetPassword = exports.validateForgotPassword = exports.validateEmailVerification = exports.validateLogin = exports.validateRegister = void 0;
const express_validator_1 = require("express-validator");
const errorHandler_1 = require("./errorHandler");
exports.validateRegister = [
    (0, express_validator_1.body)('email')
        .isEmail()
        .normalizeEmail()
        .withMessage('Please provide a valid email address'),
    (0, express_validator_1.body)('password')
        .isLength({ min: 8 })
        .withMessage('Password must be at least 8 characters long')
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/)
        .withMessage('Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'),
    (0, express_validator_1.body)('firstName')
        .trim()
        .isLength({ min: 2, max: 50 })
        .withMessage('First name must be between 2 and 50 characters'),
    (0, express_validator_1.body)('lastName')
        .trim()
        .isLength({ min: 2, max: 50 })
        .withMessage('Last name must be between 2 and 50 characters'),
    (0, express_validator_1.body)('phone')
        .optional()
        .isMobilePhone('any')
        .withMessage('Please provide a valid phone number'),
    (0, express_validator_1.body)('dateOfBirth')
        .optional()
        .isISO8601()
        .withMessage('Please provide a valid date of birth'),
    (0, express_validator_1.body)('nationality')
        .optional()
        .isLength({ min: 2, max: 50 })
        .withMessage('Nationality must be between 2 and 50 characters'),
    (0, express_validator_1.body)('userType')
        .isIn(['worker', 'employer', 'admin'])
        .withMessage('User type must be worker, employer, or admin')
];
exports.validateLogin = [
    (0, express_validator_1.body)('email')
        .isEmail()
        .normalizeEmail()
        .withMessage('Please provide a valid email address'),
    (0, express_validator_1.body)('password')
        .notEmpty()
        .withMessage('Password is required')
];
exports.validateEmailVerification = [
    (0, express_validator_1.body)('email')
        .isEmail()
        .normalizeEmail()
        .withMessage('Please provide a valid email address'),
    (0, express_validator_1.body)('code')
        .isLength({ min: 6, max: 6 })
        .isNumeric()
        .withMessage('Verification code must be a 6-digit number')
];
exports.validateForgotPassword = [
    (0, express_validator_1.body)('email')
        .isEmail()
        .normalizeEmail()
        .withMessage('Please provide a valid email address')
];
exports.validateResetPassword = [
    (0, express_validator_1.body)('email')
        .isEmail()
        .normalizeEmail()
        .withMessage('Please provide a valid email address'),
    (0, express_validator_1.body)('code')
        .isLength({ min: 6, max: 6 })
        .isNumeric()
        .withMessage('Reset code must be a 6-digit number'),
    (0, express_validator_1.body)('newPassword')
        .isLength({ min: 8 })
        .withMessage('New password must be at least 8 characters long')
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/)
        .withMessage('New password must contain at least one uppercase letter, one lowercase letter, one number, and one special character')
];
exports.validateWorkerProfile = [
    (0, express_validator_1.body)('currentCountry')
        .optional()
        .isLength({ min: 2, max: 50 })
        .withMessage('Current country must be between 2 and 50 characters'),
    (0, express_validator_1.body)('skills')
        .optional()
        .isArray()
        .withMessage('Skills must be an array'),
    (0, express_validator_1.body)('experience')
        .optional()
        .isInt({ min: 0, max: 50 })
        .withMessage('Experience must be a number between 0 and 50'),
    (0, express_validator_1.body)('education')
        .optional()
        .isLength({ min: 2, max: 100 })
        .withMessage('Education must be between 2 and 100 characters'),
    (0, express_validator_1.body)('languages')
        .optional()
        .isArray()
        .withMessage('Languages must be an array'),
    (0, express_validator_1.body)('passportNumber')
        .optional()
        .isLength({ min: 5, max: 20 })
        .withMessage('Passport number must be between 5 and 20 characters'),
    (0, express_validator_1.body)('malaysiaVisaExpiry')
        .optional()
        .isISO8601()
        .withMessage('Malaysia visa expiry must be a valid date')
];
exports.validateJob = [
    (0, express_validator_1.body)('title')
        .trim()
        .isLength({ min: 5, max: 100 })
        .withMessage('Job title must be between 5 and 100 characters'),
    (0, express_validator_1.body)('description')
        .trim()
        .isLength({ min: 20, max: 2000 })
        .withMessage('Job description must be between 20 and 2000 characters'),
    (0, express_validator_1.body)('location')
        .trim()
        .isLength({ min: 2, max: 100 })
        .withMessage('Job location must be between 2 and 100 characters'),
    (0, express_validator_1.body)('salary')
        .optional()
        .isInt({ min: 0 })
        .withMessage('Salary must be a positive number'),
    (0, express_validator_1.body)('currency')
        .optional()
        .isIn(['USD', 'EUR', 'BDT', 'MYR'])
        .withMessage('Currency must be USD, EUR, BDT, or MYR'),
    (0, express_validator_1.body)('jobType')
        .isIn(['seasonal', 'permanent', 'contract'])
        .withMessage('Job type must be seasonal, permanent, or contract'),
    (0, express_validator_1.body)('sector')
        .isIn(['agriculture', 'construction', 'hospitality', 'manufacturing', 'healthcare', 'other'])
        .withMessage('Sector must be agriculture, construction, hospitality, manufacturing, healthcare, or other'),
    (0, express_validator_1.body)('requirements')
        .optional()
        .isArray()
        .withMessage('Requirements must be an array'),
    (0, express_validator_1.body)('benefits')
        .optional()
        .isArray()
        .withMessage('Benefits must be an array')
];
exports.validateApplication = [
    (0, express_validator_1.body)('jobId')
        .isUUID()
        .withMessage('Job ID must be a valid UUID'),
    (0, express_validator_1.body)('workerId')
        .isUUID()
        .withMessage('Worker ID must be a valid UUID'),
    (0, express_validator_1.body)('coverLetter')
        .optional()
        .trim()
        .isLength({ min: 10, max: 1000 })
        .withMessage('Cover letter must be between 10 and 1000 characters')
];
exports.validateDocument = [
    (0, express_validator_1.body)('documentType')
        .isIn(['passport', 'visa', 'certificate', 'contract', 'other'])
        .withMessage('Document type must be passport, visa, certificate, contract, or other'),
    (0, express_validator_1.body)('fileName')
        .trim()
        .isLength({ min: 1, max: 255 })
        .withMessage('File name is required and must be less than 255 characters'),
    (0, express_validator_1.body)('fileSize')
        .isInt({ min: 1, max: 10485760 })
        .withMessage('File size must be between 1 and 10MB')
];
exports.validateVisaApplication = [
    (0, express_validator_1.body)('workerId')
        .isUUID()
        .withMessage('Worker ID must be a valid UUID'),
    (0, express_validator_1.body)('jobId')
        .isUUID()
        .withMessage('Job ID must be a valid UUID'),
    (0, express_validator_1.body)('visaType')
        .isIn(['seasonal', 'permanent', 'student'])
        .withMessage('Visa type must be seasonal, permanent, or student'),
    (0, express_validator_1.body)('destinationCountry')
        .isLength({ min: 2, max: 50 })
        .withMessage('Destination country must be between 2 and 50 characters')
];
exports.validatePayment = [
    (0, express_validator_1.body)('amount')
        .isFloat({ min: 0.01 })
        .withMessage('Amount must be a positive number'),
    (0, express_validator_1.body)('currency')
        .isIn(['USD', 'EUR', 'BDT'])
        .withMessage('Currency must be USD, EUR, or BDT'),
    (0, express_validator_1.body)('service')
        .isIn(['registration', 'job_matching', 'documentation', 'visa_processing', 'pre_departure', 'post_arrival', 'employer_services'])
        .withMessage('Service must be a valid service type'),
    (0, express_validator_1.body)('paymentMethod')
        .isIn(['stripe', 'bank_transfer', 'cash'])
        .withMessage('Payment method must be stripe, bank_transfer, or cash')
];
const handleValidationErrors = (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        const errorMessages = errors.array().map(error => error.msg);
        throw new errorHandler_1.ValidationError(errorMessages.join(', '));
    }
    next();
};
exports.handleValidationErrors = handleValidationErrors;
//# sourceMappingURL=validation.js.map