import { Request, Response } from 'express';
import { AuthRequest } from '../types';
export declare const getDownloadCategories: (req: Request, res: Response) => Promise<void>;
export declare const getDownloadItem: (req: Request, res: Response) => Promise<void>;
export declare const downloadFile: (req: Request, res: Response) => Promise<void>;
export declare const getRequiredDocuments: (req: Request, res: Response) => Promise<void>;
export declare const getDocumentChecklist: (req: Request, res: Response) => Promise<void>;
export declare const recordDownload: (req: AuthRequest, res: Response) => Promise<void>;
//# sourceMappingURL=downloads.d.ts.map