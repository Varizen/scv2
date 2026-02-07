import express from 'express';
import {
  getDownloadCategories,
  getDownloadItem,
  downloadFile,
  getRequiredDocuments,
  getDocumentChecklist,
  recordDownload
} from '../controllers/downloads';
import { authenticate } from '../middleware/auth';

const router = express.Router();

// Public routes
router.get('/categories', getDownloadCategories);
router.get('/categories/:id/items', getDownloadCategories);
router.get('/items/:id', getDownloadItem);
router.get('/required-documents', getRequiredDocuments);
router.get('/document-checklist', getDocumentChecklist);
router.get('/download/:id', downloadFile);

// Protected routes
router.post('/record-download/:id', authenticate, recordDownload);

export default router;