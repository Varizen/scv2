"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.downloadData = void 0;
exports.downloadData = {
    categories: [
        {
            id: 'legal-agreements',
            name: 'Legal Agreements',
            description: 'Legal documents and agreements required for migration process',
            icon: 'file-contract',
            displayOrder: 1,
            items: [
                {
                    id: 'employment-agreement',
                    title: 'Employment Agreement Template',
                    description: 'Standard employment contract template for Italian construction jobs',
                    category: 'agreement',
                    subcategory: 'employment',
                    fileName: 'employment-agreement-template.pdf',
                    filePath: '/downloads/agreements/employment-agreement-template.pdf',
                    fileSize: 245760,
                    mimeType: 'application/pdf',
                    language: 'en',
                    required: true,
                    stage: 'job-matching',
                    downloadCount: 0,
                    version: '1.0.0',
                    isActive: true,
                    createdAt: new Date(),
                    updatedAt: new Date()
                }
            ]
        },
        {
            id: 'financial-aid',
            name: 'Financial Aid Forms',
            description: 'Financial assistance forms for non-local skilled job holders',
            icon: 'hand-holding-usd',
            displayOrder: 2,
            items: [
                {
                    id: 'financial-aid-application',
                    title: 'Financial Aid Application Form',
                    description: 'Application for financial assistance against non-local skilled job holders (already serving)',
                    category: 'form',
                    subcategory: 'financial-aid',
                    fileName: 'financial-aid-application-form.pdf',
                    filePath: '/downloads/forms/financial-aid-application-form.pdf',
                    fileSize: 102400,
                    mimeType: 'application/pdf',
                    language: 'en',
                    required: false,
                    stage: 'documentation',
                    downloadCount: 0,
                    version: '1.0.0',
                    isActive: true,
                    createdAt: new Date(),
                    updatedAt: new Date()
                }
            ]
        },
        {
            id: 'migration-forms',
            name: 'Special Migration Forms',
            description: 'Special migration forms for Italy work permit applications',
            icon: 'passport',
            displayOrder: 3,
            items: [
                {
                    id: 'special-migration-form',
                    title: 'Special Migration Form',
                    description: 'Special migration form for Bangladeshi workers to Italy',
                    category: 'form',
                    subcategory: 'migration',
                    fileName: 'special-migration-form.pdf',
                    filePath: '/downloads/forms/special-migration-form.pdf',
                    fileSize: 143360,
                    mimeType: 'application/pdf',
                    language: 'en',
                    required: true,
                    stage: 'visa-processing',
                    downloadCount: 0,
                    version: '1.0.0',
                    isActive: true,
                    createdAt: new Date(),
                    updatedAt: new Date()
                }
            ]
        },
        {
            id: 'safety-compliance',
            name: 'Safety Compliance (D.Lgs. 81/08)',
            description: 'Safety compliance documents for Italian workplace',
            icon: 'shield-alt',
            displayOrder: 4,
            items: [
                {
                    id: 'safety-compliance-certificate',
                    title: 'Safety Compliance Certificate D.Lgs. 81/08',
                    description: 'Italian safety compliance certificate template (D.Lgs. 81/08)',
                    category: 'certificate',
                    subcategory: 'safety',
                    fileName: 'safety-compliance-certificate-dlgs-81-08.pdf',
                    filePath: '/downloads/certificates/safety-compliance-certificate-dlgs-81-08.pdf',
                    fileSize: 204800,
                    mimeType: 'application/pdf',
                    language: 'it',
                    required: true,
                    stage: 'pre-departure',
                    downloadCount: 0,
                    version: '1.0.0',
                    isActive: true,
                    createdAt: new Date(),
                    updatedAt: new Date()
                }
            ]
        },
        {
            id: 'decreto-flussi',
            name: 'Decreto Flussi',
            description: 'Decreto Flussi application forms and guidelines 2026-2028',
            icon: 'calendar-alt',
            displayOrder: 5,
            items: [
                {
                    id: 'decreto-flussi-guide',
                    title: 'Decreto Flussi 2026-2028 Application Guide',
                    description: 'Complete guide for Decreto Flussi applications 2026-2028',
                    category: 'guide',
                    subcategory: 'decreto-flussi',
                    fileName: 'decreto-flussi-2026-2028-guide.pdf',
                    filePath: '/downloads/guides/decreto-flussi-2026-2028-guide.pdf',
                    fileSize: 307200,
                    mimeType: 'application/pdf',
                    language: 'en',
                    required: true,
                    stage: 'visa-processing',
                    downloadCount: 0,
                    version: '1.0.0',
                    isActive: true,
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    id: 'decreto-flussi-form',
                    title: 'Decreto Flussi Application Form',
                    description: 'Official Decreto Flussi application form',
                    category: 'form',
                    subcategory: 'decreto-flussi',
                    fileName: 'decreto-flussi-application-form.pdf',
                    filePath: '/downloads/forms/decreto-flussi-application-form.pdf',
                    fileSize: 122880,
                    mimeType: 'application/pdf',
                    language: 'it',
                    required: true,
                    stage: 'visa-processing',
                    downloadCount: 0,
                    version: '1.0.0',
                    isActive: true,
                    createdAt: new Date(),
                    updatedAt: new Date()
                }
            ]
        },
        {
            id: 'nulla-osta',
            name: 'Nulla Osta Application',
            description: 'Nulla Osta (work permit) application forms',
            icon: 'stamp',
            displayOrder: 6,
            items: [
                {
                    id: 'nulla-osta-application-form',
                    title: 'Nulla Osta Application Form',
                    description: 'Nulla Osta (work permit) application form for Italy',
                    category: 'form',
                    subcategory: 'nulla-osta',
                    fileName: 'nulla-osta-application-form.pdf',
                    filePath: '/downloads/forms/nulla-osta-application-form.pdf',
                    fileSize: 163840,
                    mimeType: 'application/pdf',
                    language: 'it',
                    required: true,
                    stage: 'visa-processing',
                    downloadCount: 0,
                    version: '1.0.0',
                    isActive: true,
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    id: 'nulla-osta-checklist',
                    title: 'Nulla Osta Requirements Checklist',
                    description: 'Complete checklist for Nulla Osta application requirements',
                    category: 'guide',
                    subcategory: 'nulla-osta',
                    fileName: 'nulla-osta-requirements-checklist.pdf',
                    filePath: '/downloads/guides/nulla-osta-requirements-checklist.pdf',
                    fileSize: 102400,
                    mimeType: 'application/pdf',
                    language: 'en',
                    required: true,
                    stage: 'visa-processing',
                    downloadCount: 0,
                    version: '1.0.0',
                    isActive: true,
                    createdAt: new Date(),
                    updatedAt: new Date()
                }
            ]
        },
        {
            id: 'inps-registration',
            name: 'INPS Registration',
            description: 'INPS (Italian Social Security) registration forms',
            icon: 'id-card',
            displayOrder: 7,
            items: [
                {
                    id: 'inps-registration-form',
                    title: 'INPS Registration Form',
                    description: 'INPS social security registration form for foreign workers',
                    category: 'form',
                    subcategory: 'inps',
                    fileName: 'inps-registration-form.pdf',
                    filePath: '/downloads/forms/inps-registration-form.pdf',
                    fileSize: 143360,
                    mimeType: 'application/pdf',
                    language: 'it',
                    required: true,
                    stage: 'post-arrival',
                    downloadCount: 0,
                    version: '1.0.0',
                    isActive: true,
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    id: 'inps-registration-guide',
                    title: 'INPS Registration Guide',
                    description: 'Step-by-step guide for INPS registration process',
                    category: 'guide',
                    subcategory: 'inps',
                    fileName: 'inps-registration-guide.pdf',
                    filePath: '/downloads/guides/inps-registration-guide.pdf',
                    fileSize: 184320,
                    mimeType: 'application/pdf',
                    language: 'en',
                    required: true,
                    stage: 'post-arrival',
                    downloadCount: 0,
                    version: '1.0.0',
                    isActive: true,
                    createdAt: new Date(),
                    updatedAt: new Date()
                }
            ]
        },
        {
            id: 'insurance',
            name: 'Insurance',
            description: 'Insurance forms and policy documents',
            icon: 'umbrella',
            displayOrder: 8,
            items: [
                {
                    id: 'health-insurance-form',
                    title: 'Health Insurance Application Form',
                    description: 'Health insurance application form for Italian workers',
                    category: 'form',
                    subcategory: 'health-insurance',
                    fileName: 'health-insurance-application-form.pdf',
                    filePath: '/downloads/forms/health-insurance-application-form.pdf',
                    fileSize: 122880,
                    mimeType: 'application/pdf',
                    language: 'en',
                    required: true,
                    stage: 'pre-departure',
                    downloadCount: 0,
                    version: '1.0.0',
                    isActive: true,
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    id: 'travel-insurance-policy',
                    title: 'Travel Insurance Policy',
                    description: 'Travel insurance policy document for migration journey',
                    category: 'document',
                    subcategory: 'travel-insurance',
                    fileName: 'travel-insurance-policy.pdf',
                    filePath: '/downloads/insurance/travel-insurance-policy.pdf',
                    fileSize: 204800,
                    mimeType: 'application/pdf',
                    language: 'en',
                    required: true,
                    stage: 'pre-departure',
                    downloadCount: 0,
                    version: '1.0.0',
                    isActive: true,
                    createdAt: new Date(),
                    updatedAt: new Date()
                }
            ]
        },
        {
            id: 'sample-documents',
            name: 'Sample Document Set',
            description: 'Sample document sets for reference and guidance',
            icon: 'file-alt',
            displayOrder: 9,
            items: [
                {
                    id: 'passport-sample',
                    title: 'Passport Sample - Bangladesh',
                    description: 'Sample Bangladeshi passport showing all required pages and format',
                    category: 'document',
                    subcategory: 'passport',
                    fileName: 'passport-sample-bangladesh.pdf',
                    filePath: '/downloads/samples/passport-sample-bangladesh.pdf',
                    fileSize: 307200,
                    mimeType: 'application/pdf',
                    language: 'en',
                    required: false,
                    stage: 'documentation',
                    downloadCount: 0,
                    version: '1.0.0',
                    isActive: true,
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    id: 'nulla-osta-sample',
                    title: 'Nulla Osta Sample',
                    description: 'Sample Nulla Osta (work permit) document showing format and content',
                    category: 'document',
                    subcategory: 'nulla-osta',
                    fileName: 'nulla-osta-sample.pdf',
                    filePath: '/downloads/samples/nulla-osta-sample.pdf',
                    fileSize: 245760,
                    mimeType: 'application/pdf',
                    language: 'it',
                    required: false,
                    stage: 'documentation',
                    downloadCount: 0,
                    version: '1.0.0',
                    isActive: true,
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    id: 'employment-contract-sample',
                    title: 'Employment Contract Sample',
                    description: 'Sample employment contract for Italian construction work with all clauses',
                    category: 'document',
                    subcategory: 'employment-contract',
                    fileName: 'employment-contract-sample.pdf',
                    filePath: '/downloads/samples/employment-contract-sample.pdf',
                    fileSize: 389120,
                    mimeType: 'application/pdf',
                    language: 'en',
                    required: false,
                    stage: 'documentation',
                    downloadCount: 0,
                    version: '1.0.0',
                    isActive: true,
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    id: 'medical-clearance-sample',
                    title: 'Medical Clearance Sample',
                    description: 'Sample medical clearance certificate showing required format',
                    category: 'document',
                    subcategory: 'medical-clearance',
                    fileName: 'medical-clearance-sample.pdf',
                    filePath: '/downloads/samples/medical-clearance-sample.pdf',
                    fileSize: 184320,
                    mimeType: 'application/pdf',
                    language: 'en',
                    required: false,
                    stage: 'documentation',
                    downloadCount: 0,
                    version: '1.0.0',
                    isActive: true,
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    id: 'police-clearance-sample',
                    title: 'Police Clearance Sample',
                    description: 'Sample police clearance certificate from Bangladesh',
                    category: 'document',
                    subcategory: 'police-clearance',
                    fileName: 'police-clearance-sample.pdf',
                    filePath: '/downloads/samples/police-clearance-sample.pdf',
                    fileSize: 163840,
                    mimeType: 'application/pdf',
                    language: 'en',
                    required: false,
                    stage: 'documentation',
                    downloadCount: 0,
                    version: '1.0.0',
                    isActive: true,
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    id: 'proof-of-accommodation-sample',
                    title: 'Proof of Accommodation Sample',
                    description: 'Sample proof of accommodation document',
                    category: 'document',
                    subcategory: 'accommodation',
                    fileName: 'proof-of-accommodation-sample.pdf',
                    filePath: '/downloads/samples/proof-of-accommodation-sample.pdf',
                    fileSize: 143360,
                    mimeType: 'application/pdf',
                    language: 'en',
                    required: false,
                    stage: 'documentation',
                    downloadCount: 0,
                    version: '1.0.0',
                    isActive: true,
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    id: 'visa-fee-receipt-sample',
                    title: 'Visa Fee Receipt Sample',
                    description: 'Sample visa fee payment receipt',
                    category: 'document',
                    subcategory: 'visa-fee',
                    fileName: 'visa-fee-receipt-sample.pdf',
                    filePath: '/downloads/samples/visa-fee-receipt-sample.pdf',
                    fileSize: 102400,
                    mimeType: 'application/pdf',
                    language: 'en',
                    required: false,
                    stage: 'documentation',
                    downloadCount: 0,
                    version: '1.0.0',
                    isActive: true,
                    createdAt: new Date(),
                    updatedAt: new Date()
                }
            ]
        }
    ],
    mobilePaymentRequirements: {
        title: 'Mobile Phone & Payment Account Requirements',
        description: 'Valid mobile phone number with bKash or Nagad account under same applicant\'s name',
        requirements: [
            'Mobile phone number must be in applicant\'s name',
            'bKash or Nagad account must be under same name as applicant',
            'Third party or others name not acceptable',
            'Account must be active and verified',
            'Must have transaction history'
        ],
        documents: [
            'Mobile phone bill or ownership proof',
            'bKash/Nagad account statement',
            'Account verification screenshot'
        ],
        processingTime: 'Same day',
        fees: 0,
        currency: 'BDT'
    },
    documentRequirements: {
        passport: {
            title: 'Passport Requirements',
            specifications: [
                'Minimum 2 years validity remaining',
                'Submit cover to cover all pages',
                'Computer scan copy minimum 330 DPI',
                'All pages must be clear and legible',
                'No damage or tampering'
            ],
            validity: '2+ years remaining',
            format: 'PDF scan, 330+ DPI',
            size: 'Maximum 5MB'
        },
        policeClearance: {
            title: 'Police Clearance Certificate',
            specifications: [
                'Not older than 6 months from submission date',
                'Must be original certificate',
                'Computer scan minimum 330 DPI',
                'Cover all addresses lived in last 5 years',
                'Must be clean (no criminal record)'
            ],
            validity: 'Maximum 6 months old',
            format: 'PDF scan, 330+ DPI',
            size: 'Maximum 2MB'
        },
        photo: {
            title: 'Passport Size Photograph',
            specifications: [
                'PP size (35mm x 45mm)',
                'Not older than 3 months from submission date',
                'White background',
                'High resolution (minimum 600 DPI)',
                'Full face clearly visible',
                'Color photo only',
                'No headwear (except religious)',
                'Neutral expression'
            ],
            validity: 'Maximum 3 months old',
            format: 'JPEG, 600+ DPI',
            size: 'Maximum 1MB'
        },
        medicalClearance: {
            title: 'Medical Clearance Certificate',
            specifications: [
                'Must be from authorized medical center',
                'Must include all required tests',
                'Computer scan minimum 330 DPI',
                'Must show applicant is fit for work',
                'Must include chest X-ray',
                'Must include blood tests',
                'Must be properly signed and stamped'
            ],
            validity: 'Maximum 6 months old',
            format: 'PDF scan, 330+ DPI',
            size: 'Maximum 3MB'
        }
    },
    calibrationProcess: {
        title: 'Calibration Appointment Process',
        steps: [
            'Submit all required documents online',
            'Wait for verification call from SkillConnect',
            'Schedule calibration appointment',
            'Attend calibration session in person',
            'Complete assessment tests',
            'Wait for results and next steps'
        ],
        timeline: 'Several days depending on schedule received',
        requirements: [
            'Must attend in person',
            'Bring original documents',
            'Be prepared for assessment',
            'Dress formally',
            'Arrive 15 minutes early'
        ],
        whatToExpect: [
            'Document verification',
            'Skills assessment',
            'Language proficiency test',
            'Cultural orientation briefing',
            'Q&A session'
        ]
    },
    appDownload: {
        title: 'SkillConnect Mobile App',
        description: 'Download the official SkillConnect app for easy access to all services',
        platforms: [
            {
                name: 'App Store',
                url: 'https://apps.apple.com/skillconnect',
                icon: 'apple',
                description: 'Download for iPhone and iPad'
            },
            {
                name: 'Google Play Store',
                url: 'https://play.google.com/store/apps/details?id=com.skillconnect',
                icon: 'google-play',
                description: 'Download for Android devices'
            }
        ],
        features: [
            'Track application status',
            'Upload documents easily',
            'Receive notifications',
            'Chat with support',
            'Access all forms and downloads',
            'Schedule appointments',
            'Make payments securely'
        ]
    }
};
//# sourceMappingURL=downloads.js.map