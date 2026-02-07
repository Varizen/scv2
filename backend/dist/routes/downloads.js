"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const downloads_1 = require("../controllers/downloads");
const auth_1 = require("../middleware/auth");
const router = express_1.default.Router();
router.get('/categories', downloads_1.getDownloadCategories);
router.get('/categories/:id/items', downloads_1.getDownloadCategories);
router.get('/items/:id', downloads_1.getDownloadItem);
router.get('/required-documents', downloads_1.getRequiredDocuments);
router.get('/document-checklist', downloads_1.getDocumentChecklist);
router.get('/download/:id', downloads_1.downloadFile);
router.post('/record-download/:id', auth_1.authenticate, downloads_1.recordDownload);
exports.default = router;
//# sourceMappingURL=downloads.js.map