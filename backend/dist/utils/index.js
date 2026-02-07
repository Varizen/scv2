"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseDate = exports.formatDate = exports.isValidFileType = exports.getFileExtension = exports.sanitizeFileName = exports.calculateAge = exports.formatCurrency = exports.isValidPhone = exports.isValidEmail = exports.generateRandomString = exports.generateOTP = void 0;
const generateOTP = (length = 6) => {
    const digits = '0123456789';
    let otp = '';
    for (let i = 0; i < length; i++) {
        otp += digits[Math.floor(Math.random() * digits.length)];
    }
    return otp;
};
exports.generateOTP = generateOTP;
const generateRandomString = (length = 32) => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += chars[Math.floor(Math.random() * chars.length)];
    }
    return result;
};
exports.generateRandomString = generateRandomString;
const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};
exports.isValidEmail = isValidEmail;
const isValidPhone = (phone) => {
    const phoneRegex = /^\+?[\d\s\-\(\)]+$/;
    return phoneRegex.test(phone) && phone.replace(/\D/g, '').length >= 10;
};
exports.isValidPhone = isValidPhone;
const formatCurrency = (amount, currency = 'USD') => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currency,
    }).format(amount);
};
exports.formatCurrency = formatCurrency;
const calculateAge = (dateOfBirth) => {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
};
exports.calculateAge = calculateAge;
const sanitizeFileName = (fileName) => {
    return fileName.replace(/[^a-zA-Z0-9.-]/g, '_').toLowerCase();
};
exports.sanitizeFileName = sanitizeFileName;
const getFileExtension = (fileName) => {
    return fileName.split('.').pop()?.toLowerCase() || '';
};
exports.getFileExtension = getFileExtension;
const isValidFileType = (fileName, allowedTypes) => {
    const extension = (0, exports.getFileExtension)(fileName);
    return allowedTypes.includes(extension);
};
exports.isValidFileType = isValidFileType;
const formatDate = (date, format = 'YYYY-MM-DD') => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    switch (format) {
        case 'YYYY-MM-DD':
            return `${year}-${month}-${day}`;
        case 'DD/MM/YYYY':
            return `${day}/${month}/${year}`;
        case 'MM-DD-YYYY':
            return `${month}-${day}-${year}`;
        default:
            return `${year}-${month}-${day}`;
    }
};
exports.formatDate = formatDate;
const parseDate = (dateString) => {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
        throw new Error('Invalid date format');
    }
    return date;
};
exports.parseDate = parseDate;
//# sourceMappingURL=index.js.map