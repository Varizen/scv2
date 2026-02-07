"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notFound = void 0;
const notFound = (req, res) => {
    const response = {
        success: false,
        error: 'Resource not found',
        message: `Route ${req.originalUrl} not found`
    };
    res.status(404).json(response);
};
exports.notFound = notFound;
//# sourceMappingURL=notFound.js.map