"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.startServer = exports.app = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const compression_1 = __importDefault(require("compression"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const config_1 = require("./config/config");
const errorHandler_1 = require("./middleware/errorHandler");
const database_1 = require("./config/database");
const auth_1 = __importDefault(require("./routes/auth"));
const users_1 = __importDefault(require("./routes/users"));
const workers_1 = __importDefault(require("./routes/workers"));
const employers_1 = __importDefault(require("./routes/employers"));
const jobs_1 = __importDefault(require("./routes/jobs"));
const applications_1 = __importDefault(require("./routes/applications"));
const documents_1 = __importDefault(require("./routes/documents"));
const visa_1 = __importDefault(require("./routes/visa"));
const payments_1 = __importDefault(require("./routes/payments"));
const app = (0, express_1.default)();
exports.app = app;
app.use((0, helmet_1.default)());
app.use((0, cors_1.default)(config_1.config.cors));
const limiter = (0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: {
        success: false,
        message: 'Too many requests from this IP, please try again later.'
    }
});
app.use('/api/', limiter);
app.use((0, compression_1.default)());
app.use(express_1.default.json({ limit: '10mb' }));
app.use(express_1.default.urlencoded({ extended: true, limit: '10mb' }));
app.get('/health', (req, res) => {
    res.json({
        success: true,
        message: 'Server is running',
        timestamp: new Date().toISOString(),
        environment: config_1.config.env
    });
});
app.use('/api/auth', auth_1.default);
app.use('/api/users', users_1.default);
app.use('/api/workers', workers_1.default);
app.use('/api/employers', employers_1.default);
app.use('/api/jobs', jobs_1.default);
app.use('/api/applications', applications_1.default);
app.use('/api/documents', documents_1.default);
app.use('/api/visa', visa_1.default);
app.use('/api/payments', payments_1.default);
app.use('*', (req, res) => {
    res.status(404).json({
        success: false,
        message: 'Route not found'
    });
});
app.use(errorHandler_1.errorHandler);
process.on('SIGTERM', () => {
    console.log('SIGTERM received, shutting down gracefully');
    process.exit(0);
});
process.on('SIGINT', () => {
    console.log('SIGINT received, shutting down gracefully');
    process.exit(0);
});
const startServer = async () => {
    try {
        await (0, database_1.connectDatabases)();
        const server = app.listen(config_1.config.port, () => {
            console.log(`🚀 Server running on port ${config_1.config.port} in ${config_1.config.env} mode`);
            console.log(`📧 Email service: ${config_1.config.smtp.enabled ? 'Enabled' : 'Disabled'}`);
            console.log(`💰 Payment service: ${config_1.config.stripe.enabled ? 'Enabled' : 'Disabled'}`);
        });
        server.on('error', (error) => {
            console.error('Server error:', error);
            process.exit(1);
        });
    }
    catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
};
exports.startServer = startServer;
if (require.main === module) {
    startServer();
}
//# sourceMappingURL=server.js.map