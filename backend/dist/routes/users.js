"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../middleware/auth");
const users_1 = require("../controllers/users");
const asyncHandler_1 = require("../middleware/asyncHandler");
const router = express_1.default.Router();
router.use((0, asyncHandler_1.asyncHandler)(auth_1.authenticate));
router.get('/', (0, auth_1.authorize)(['admin']), (0, asyncHandler_1.asyncHandler)(users_1.getUsers));
router.get('/:id', (0, auth_1.authorize)(['admin']), (0, asyncHandler_1.asyncHandler)(users_1.getUserById));
router.put('/:id', (0, auth_1.authorize)(['admin', 'user']), (0, asyncHandler_1.asyncHandler)(users_1.updateUser));
router.delete('/:id', (0, auth_1.authorize)(['admin']), (0, asyncHandler_1.asyncHandler)(users_1.deleteUser));
exports.default = router;
//# sourceMappingURL=users.js.map