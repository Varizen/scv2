"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../middleware/auth");
const asyncHandler_1 = require("../middleware/asyncHandler");
const router = express_1.default.Router();
router.use((0, asyncHandler_1.asyncHandler)(auth_1.authenticate));
router.get('/', (0, auth_1.authorize)(['admin', 'worker', 'employer']), (req, res) => {
    res.json({ message: 'Applications endpoint - to be implemented' });
});
router.get('/:id', (0, auth_1.authorize)(['admin', 'worker', 'employer']), (req, res) => {
    res.json({ message: 'Application details - to be implemented' });
});
router.post('/', (0, auth_1.authorize)(['admin', 'worker']), (req, res) => {
    res.json({ message: 'Create application - to be implemented' });
});
router.put('/:id', (0, auth_1.authorize)(['admin', 'worker', 'employer']), (req, res) => {
    res.json({ message: 'Update application - to be implemented' });
});
exports.default = router;
//# sourceMappingURL=applications.js.map