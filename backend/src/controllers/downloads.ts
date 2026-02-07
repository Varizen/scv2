import { Request, Response } from 'express';
import { DownloadItem, DownloadCategory, RequiredDocument, ApiResponse, AuthRequest } from '../types';
import { downloadData } from '../data/downloads';

export const getDownloadCategories = async (req: Request, res: Response): Promise<void> => {
  try {
    const { language, stage, required } = req.query;
    
    let filteredCategories = downloadData.categories.filter(category => 
      category.items && category.items.some(item => item.isActive)
    );
    
    if (language) {
      filteredCategories = filteredCategories.map(category => ({
        ...category,
        items: category.items.filter(item => 
          item.language === language || item.language === 'en'
        )
      })).filter(category => category.items.length > 0);
    }
    
    if (stage) {
      filteredCategories = filteredCategories.map(category => ({
        ...category,
        items: category.items.filter(item => item.stage === stage)
      })).filter(category => category.items.length > 0);
    }
    
    if (required !== undefined) {
      const isRequired = required === 'true';
      filteredCategories = filteredCategories.map(category => ({
        ...category,
        items: category.items.filter(item => item.required === isRequired)
      })).filter(category => category.items.length > 0);
    }
    
    res.json({
      success: true,
      data: {
        categories: filteredCategories,
        total: filteredCategories.reduce((sum, cat) => sum + cat.items.length, 0)
      }
    });
  } catch (error) {
    console.error('Error fetching download categories:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch download categories'
    });
  }
};

export const getDownloadItem = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    
    let foundItem: DownloadItem | undefined;
    
    for (const category of downloadData.categories as DownloadCategory[]) {
      const item = category.items.find(item => item.id === id && item.isActive);
      if (item) {
        foundItem = item;
        break;
      }
    }
    
    if (!foundItem) {
      res.status(404).json({
        success: false,
        error: 'Download item not found'
      });
      return;
    }
    
    // Increment download count
    foundItem.downloadCount++;
    
    res.json({
      success: true,
      data: {
        item: foundItem
      }
    });
  } catch (error) {
    console.error('Error fetching download item:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch download item'
    });
  }
};

export const downloadFile = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    
    let foundItem: DownloadItem | undefined;
    
    for (const category of downloadData.categories as DownloadCategory[]) {
      const item = category.items.find(item => item.id === id && item.isActive);
      if (item) {
        foundItem = item;
        break;
      }
    }
    
    if (!foundItem) {
      res.status(404).json({
        success: false,
        error: 'Download item not found'
      });
      return;
    }
    
    // In a real implementation, you would serve the actual file
    // For demo purposes, we'll return a mock file download response
    foundItem.downloadCount++;
    
    // Simulate file download
    const mockFileContent = `Mock file content for ${foundItem.title}\n\nThis is a demo file. In production, the actual file would be served from: ${foundItem.filePath}\n\nFile Details:\n- Title: ${foundItem.title}\n- Description: ${foundItem.description}\n- Category: ${foundItem.category}\n- Language: ${foundItem.language}\n- Required: ${foundItem.required ? 'Yes' : 'No'}\n- Stage: ${foundItem.stage}\n- Version: ${foundItem.version}`;
    
    res.setHeader('Content-Type', foundItem.mimeType);
    res.setHeader('Content-Disposition', `attachment; filename="${foundItem.fileName}"`);
    res.setHeader('Content-Length', Buffer.byteLength(mockFileContent));
    
    res.send(mockFileContent);
  } catch (error) {
    console.error('Error downloading file:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to download file'
    });
  }
};

export const getRequiredDocuments = async (req: Request, res: Response): Promise<void> => {
  try {
    const { category } = req.query;
    
    // Create required documents based on the specifications
    const requiredDocs = [
      {
        id: '1',
        title: 'National ID Card',
        description: 'Bangladesh National Identity Card',
        category: 'identity',
        required: true,
        validityPeriod: 15,
        issuingAuthority: 'Election Commission Bangladesh',
        checklist: [
          'Must be original',
          'Must be valid (not expired)',
          'Clear photocopy of both sides',
          'Computer scan minimum 330 DPI'
        ],
        requirements: [
          'Must be in applicant\'s name',
          'Must match passport name exactly',
          'Must be legible and clear'
        ],
        processingTime: 'N/A',
        fees: 0,
        currency: 'BDT'
      },
      {
        id: '2',
        title: 'Birth Certificate',
        description: 'Birth certificate from Union Parishad/City Corporation',
        category: 'identity',
        required: true,
        issuingAuthority: 'Union Parishad/City Corporation',
        checklist: [
          'Must be original or certified copy',
          'Must be in English or translated',
          'Computer scan minimum 330 DPI'
        ],
        requirements: [
          'Must show applicant\'s full name',
          'Must show date of birth',
          'Must be properly attested'
        ],
        processingTime: '3-7 days',
        fees: 500,
        currency: 'BDT'
      },
      {
        id: '3',
        title: 'Passport',
        description: 'Bangladesh passport with minimum 2 years validity',
        category: 'identity',
        required: true,
        validityPeriod: 10,
        issuingAuthority: 'Department of Immigration & Passports',
        checklist: [
          'Minimum 2 years validity remaining',
          'Submit cover to cover all pages',
          'Computer scan minimum 330 DPI',
          'All pages must be clear and legible'
        ],
        requirements: [
          'Must be in applicant\'s name',
          'Must have minimum 2 blank pages',
          'Must not be damaged or tampered'
        ],
        processingTime: '15-30 days',
        fees: 3450,
        currency: 'BDT'
      },
      {
        id: '4',
        title: 'Police Clearance Certificate',
        description: 'Police clearance certificate from Bangladesh',
        category: 'background',
        required: true,
        validityPeriod: 6,
        issuingAuthority: 'Bangladesh Police',
        checklist: [
          'Not older than 6 months from submission date',
          'Must be original',
          'Computer scan minimum 330 DPI'
        ],
        requirements: [
          'Must cover all addresses lived in last 5 years',
          'Must be clean (no criminal record)',
          'Must be properly attested'
        ],
        processingTime: '7-15 days',
        fees: 500,
        currency: 'BDT'
      },
      {
        id: '5',
        title: 'Photo',
        description: 'Passport size photograph',
        category: 'identity',
        required: true,
        validityPeriod: 3,
        checklist: [
          'PP size (35mm x 45mm)',
          'Not older than 3 months from submission date',
          'White background',
          'High resolution (minimum 600 DPI)'
        ],
        requirements: [
          'Must show full face clearly',
          'Must be in color',
          'No headwear (except religious)',
          'Neutral expression'
        ],
        processingTime: 'Same day',
        fees: 200,
        currency: 'BDT'
      },
      {
        id: '6',
        title: 'Medical Clearance',
        description: 'Medical clearance certificate from authorized doctor',
        category: 'medical',
        required: true,
        validityPeriod: 6,
        issuingAuthority: 'Authorized Medical Practitioner',
        checklist: [
          'Must be from authorized medical center',
          'Must include all required tests',
          'Computer scan minimum 330 DPI'
        ],
        requirements: [
          'Must show applicant is fit for work',
          'Must include chest X-ray',
          'Must include blood tests',
          'Must be properly signed and stamped'
        ],
        processingTime: '1-3 days',
        fees: 3000,
        currency: 'BDT'
      }
    ];
    
    let filteredDocs = requiredDocs;
    
    if (category) {
      filteredDocs = filteredDocs.filter(doc => doc.category === category);
    }
    
    res.json({
      success: true,
      data: {
        documents: filteredDocs,
        mobilePaymentRequirements: downloadData.mobilePaymentRequirements,
        documentRequirements: downloadData.documentRequirements,
        calibrationProcess: downloadData.calibrationProcess,
        appDownload: downloadData.appDownload,
        total: filteredDocs.length
      }
    });
  } catch (error) {
    console.error('Error fetching required documents:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch required documents'
    });
  }
};

export const getDocumentChecklist = async (req: Request, res: Response): Promise<void> => {
  try {
    const { stage } = req.query;
    
    // Create a comprehensive checklist based on migration stage
    const checklist = {
      registration: [
        {
          category: 'Identity Documents',
          items: ['National ID', 'Birth Certificate', 'Passport'],
          status: 'pending',
          required: true
        },
        {
          category: 'Photographs',
          items: ['PP Size Photos (6 copies)'],
          status: 'pending',
          required: true
        },
        {
          category: 'Contact Information',
          items: ['Valid Mobile Number', 'Email Address', 'Emergency Contact'],
          status: 'pending',
          required: true
        },
        {
          category: 'Payment Account',
          items: ['bKash/Nagad Account in Applicant Name'],
          status: 'pending',
          required: true
        }
      ],
      'job-matching': [
        {
          category: 'Professional Documents',
          items: ['Resume/CV', 'Experience Certificates', 'Skill Certificates'],
          status: 'pending',
          required: true
        },
        {
          category: 'Educational Documents',
          items: ['Educational Certificates', 'Training Certificates'],
          status: 'pending',
          required: true
        }
      ],
      documentation: [
        {
          category: 'Medical Documents',
          items: ['Medical Clearance Certificate', 'Vaccination Records'],
          status: 'pending',
          required: true
        },
        {
          category: 'Background Documents',
          items: ['Police Clearance Certificate', 'Character Certificate'],
          status: 'pending',
          required: true
        },
        {
          category: 'Financial Documents',
          items: ['Bank Statements', 'Income Proof', 'Tax Returns'],
          status: 'pending',
          required: false
        }
      ],
      'visa-processing': [
        {
          category: 'Visa Application Forms',
          items: ['Decreto Flussi Form', 'Nulla Osta Application', 'Visa Application'],
          status: 'pending',
          required: true
        },
        {
          category: 'Supporting Documents',
          items: ['Employment Contract', 'Job Offer Letter', 'Company Registration'],
          status: 'pending',
          required: true
        }
      ],
      'pre-departure': [
        {
          category: 'Travel Documents',
          items: ['Flight Tickets', 'Travel Insurance', 'Health Insurance'],
          status: 'pending',
          required: true
        },
        {
          category: 'Orientation Documents',
          items: ['Cultural Orientation Guide', 'Language Basics', 'Safety Training Certificate'],
          status: 'pending',
          required: true
        }
      ],
      'post-arrival': [
        {
          category: 'Registration Documents',
          items: ['INPS Registration', 'Residence Permit', 'Tax Code'],
          status: 'pending',
          required: true
        },
        {
          category: 'Local Setup',
          items: ['Bank Account', 'Mobile SIM', 'Accommodation Proof'],
          status: 'pending',
          required: true
        }
      ]
    };
    
    const selectedChecklist = stage ? checklist[stage as keyof typeof checklist] : checklist;
    
    res.json({
      success: true,
      data: {
        checklist: selectedChecklist,
        mobilePaymentRequirements: downloadData.mobilePaymentRequirements,
        documentRequirements: downloadData.documentRequirements,
        calibrationProcess: downloadData.calibrationProcess,
        appDownload: downloadData.appDownload
      }
    });
  } catch (error) {
    console.error('Error fetching document checklist:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch document checklist'
    });
  }
};

export const recordDownload = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const userId = req.user?.id;
    
    if (!userId) {
      res.status(401).json({
        success: false,
        error: 'User not authenticated'
      });
      return;
    }
    
    let foundItem: DownloadItem | undefined;
    
    for (const category of downloadData.categories as DownloadCategory[]) {
      const item = category.items.find(item => item.id === id && item.isActive);
      if (item) {
        foundItem = item;
        break;
      }
    }
    
    if (!foundItem) {
      res.status(404).json({
        success: false,
        error: 'Download item not found'
      });
      return;
    }
    
    // Record download progress (in real implementation, this would be saved to database)
    const downloadProgress = {
      userId,
      downloadId: id,
      downloadedAt: new Date(),
      completed: true,
      item: {
        title: foundItem.title,
        category: foundItem.category,
        fileName: foundItem.fileName
      }
    };
    
    res.json({
      success: true,
      message: 'Download recorded successfully',
      data: {
        downloadProgress
      }
    });
  } catch (error) {
    console.error('Error recording download:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to record download'
    });
  }
};
