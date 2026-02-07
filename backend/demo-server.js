import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';

// Mock data storage
const mockData = {
  users: [
    {
      id: 1,
      email: 'admin@skillconnect.my',
      password: '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password
      first_name: 'Admin',
      last_name: 'User',
      user_type: 'admin',
      status: 'active',
      email_verified: true,
      phone_verified: false,
      last_login: new Date(),
      created_at: new Date(),
      updated_at: new Date()
    }
  ],
  workers: [],
  employers: [],
  jobs: [],
  applications: [],
  documents: [],
  payments: [],
  notifications: [],
  refreshTokens: []
};

const app = express();

// Middleware
app.use(helmet());
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:3001'],
  credentials: true
}));
app.use(compression());
app.use(express.json({ limit: '10mb' }));

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'Labor Migration Platform API is running (Demo Mode)',
    timestamp: new Date().toISOString(),
    endpoints: [
      'POST /api/auth/register',
      'POST /api/auth/login',
      'GET /api/users/me',
      'GET /api/jobs',
      'POST /api/jobs',
      'GET /api/workers/profile',
      'POST /api/workers/profile',
      'GET /api/employers/profile',
      'POST /api/employers/profile',
      'GET /api/applications',
      'POST /api/applications',
      'GET /api/documents',
      'POST /api/documents',
      'GET /api/payments',
      'POST /api/payments',
      'GET /api/visa/applications',
      'POST /api/visa/applications'
    ]
  });
});

// Auth endpoints
app.post('/api/auth/register', (req, res) => {
  const { email, password, firstName, lastName, userType } = req.body;

  if (!email || !password || !firstName || !lastName || !userType) {
    return res.status(400).json({
      success: false,
      error: {
        message: 'All fields are required',
        code: 'VALIDATION_ERROR'
      }
    });
  }

  // Check if user exists
  const existingUser = mockData.users.find(u => u.email === email);
  if (existingUser) {
    return res.status(400).json({
      success: false,
      error: {
        message: 'User already exists',
        code: 'USER_EXISTS'
      }
    });
  }

  // Create new user
  const newUser = {
    id: mockData.users.length + 1,
    email,
    password: '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // Mock hashed password
    first_name: firstName,
    last_name: lastName,
    user_type: userType,
    status: 'active',
    email_verified: false,
    phone_verified: false,
    last_login: null,
    created_at: new Date(),
    updated_at: new Date()
  };

  mockData.users.push(newUser);

  // Create profile based on user type
  if (userType === 'worker') {
    const newWorker = {
      id: mockData.workers.length + 1,
      user_id: newUser.id,
      passport_number: null,
      nationality: 'Bangladeshi',
      date_of_birth: null,
      gender: null,
      phone: null,
      address: null,
      city: null,
      state: null,
      country: null,
      postal_code: null,
      emergency_contact_name: null,
      emergency_contact_phone: null,
      emergency_contact_relationship: null,
      current_location: 'Malaysia',
      target_country: 'Italy',
      education_level: null,
      years_of_experience: 0,
      current_employer: null,
      current_job_title: null,
      current_salary: null,
      skills: [],
      languages: [],
      certifications: [],
      profile_status: 'pending',
      created_at: new Date(),
      updated_at: new Date()
    };
    mockData.workers.push(newWorker);
  } else if (userType === 'employer') {
    const newEmployer = {
      id: mockData.employers.length + 1,
      user_id: newUser.id,
      company_name: null,
      company_registration_number: null,
      company_type: null,
      industry: null,
      company_size: null,
      website: null,
      phone: null,
      address: null,
      city: null,
      state: null,
      country: null,
      postal_code: null,
      tax_id: null,
      license_number: null,
      license_expiry: null,
      contact_person_name: null,
      contact_person_title: null,
      contact_person_phone: null,
      company_description: null,
      company_logo_url: null,
      verification_status: 'pending',
      created_at: new Date(),
      updated_at: new Date()
    };
    mockData.employers.push(newEmployer);
  }

  res.status(201).json({
    success: true,
    message: 'User registered successfully',
    data: {
      user: {
        id: newUser.id,
        email: newUser.email,
        firstName: newUser.first_name,
        lastName: newUser.last_name,
        userType: newUser.user_type,
        status: newUser.status,
        emailVerified: newUser.email_verified,
        phoneVerified: newUser.phone_verified,
        createdAt: newUser.created_at,
        updatedAt: newUser.updated_at
      }
    }
  });
});

app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      error: {
        message: 'Email and password are required',
        code: 'VALIDATION_ERROR'
      }
    });
  }

  const user = mockData.users.find(u => u.email === email);
  if (!user) {
    return res.status(401).json({
      success: false,
      error: {
        message: 'Invalid credentials',
        code: 'INVALID_CREDENTIALS'
      }
    });
  }

  // Mock password check (in real app, use bcrypt)
  if (password !== 'password123') {
    return res.status(401).json({
      success: false,
      error: {
        message: 'Invalid credentials',
        code: 'INVALID_CREDENTIALS'
      }
    });
  }

  // Update last login
  user.last_login = new Date();

  // Mock JWT tokens
  const accessToken = 'mock-jwt-access-token-' + Date.now();
  const refreshToken = 'mock-jwt-refresh-token-' + Date.now();

  res.json({
    success: true,
    data: {
      user: {
        id: user.id,
        email: user.email,
        firstName: user.first_name,
        lastName: user.last_name,
        userType: user.user_type,
        status: user.status,
        emailVerified: user.email_verified,
        phoneVerified: user.phone_verified,
        createdAt: user.created_at,
        updatedAt: user.updated_at
      },
      accessToken,
      refreshToken
    }
  });
});

// User endpoints
app.get('/api/users/me', (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      success: false,
      error: {
        message: 'No token provided',
        code: 'UNAUTHORIZED'
      }
    });
  }

  // Mock user lookup
  const user = mockData.users[0]; // Return first user
  res.json({
    success: true,
    data: {
      user: {
        id: user.id,
        email: user.email,
        firstName: user.first_name,
        lastName: user.last_name,
        userType: user.user_type,
        status: user.status,
        emailVerified: user.email_verified,
        phoneVerified: user.phone_verified,
        createdAt: user.created_at,
        updatedAt: user.updated_at
      }
    }
  });
});

// Jobs endpoints
app.get('/api/jobs', (req, res) => {
  const { page = 1, limit = 10, country, category } = req.query;

  let filteredJobs = [...mockData.jobs];

  if (country) {
    filteredJobs = filteredJobs.filter(job => job.country === country);
  }

  if (category) {
    filteredJobs = filteredJobs.filter(job => job.category === category);
  }

  const startIndex = (Number(page) - 1) * Number(limit);
  const endIndex = startIndex + Number(limit);
  const paginatedJobs = filteredJobs.slice(startIndex, endIndex);

  res.json({
    success: true,
    data: {
      jobs: paginatedJobs,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total: filteredJobs.length,
        totalPages: Math.ceil(filteredJobs.length / Number(limit))
      }
    }
  });
});

app.post('/api/jobs', (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      success: false,
      error: {
        message: 'No token provided',
        code: 'UNAUTHORIZED'
      }
    });
  }

  const jobData = req.body;
  const newJob = {
    id: mockData.jobs.length + 1,
    ...jobData,
    employer_id: 1, // Mock employer ID
    applications_count: 0,
    views_count: 0,
    status: 'active',
    created_at: new Date(),
    updated_at: new Date()
  };

  mockData.jobs.push(newJob);

  res.status(201).json({
    success: true,
    message: 'Job created successfully',
    data: { job: newJob }
  });
});

// Worker profile endpoints
app.get('/api/workers/profile', (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      success: false,
      error: {
        message: 'No token provided',
        code: 'UNAUTHORIZED'
      }
    });
  }

  const worker = mockData.workers[0];
  if (!worker) {
    return res.status(404).json({
      success: false,
      error: {
        message: 'Worker profile not found',
        code: 'NOT_FOUND'
      }
    });
  }

  res.json({
    success: true,
    data: { worker }
  });
});

app.post('/api/workers/profile', (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      success: false,
      error: {
        message: 'No token provided',
        code: 'UNAUTHORIZED'
      }
    });
  }

  const profileData = req.body;
  const worker = mockData.workers[0];

  if (worker) {
    Object.assign(worker, profileData);
    worker.updated_at = new Date();
  }

  res.json({
    success: true,
    message: 'Worker profile updated successfully',
    data: { worker }
  });
});

// Employer profile endpoints
app.get('/api/employers/profile', (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      success: false,
      error: {
        message: 'No token provided',
        code: 'UNAUTHORIZED'
      }
    });
  }

  const employer = mockData.employers[0];
  if (!employer) {
    return res.status(404).json({
      success: false,
      error: {
        message: 'Employer profile not found',
        code: 'NOT_FOUND'
      }
    });
  }

  res.json({
    success: true,
    data: { employer }
  });
});

app.post('/api/employers/profile', (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      success: false,
      error: {
        message: 'No token provided',
        code: 'UNAUTHORIZED'
      }
    });
  }

  const profileData = req.body;
  const employer = mockData.employers[0];

  if (employer) {
    Object.assign(employer, profileData);
    employer.updated_at = new Date();
  }

  res.json({
    success: true,
    message: 'Employer profile updated successfully',
    data: { employer }
  });
});

// Applications endpoints
app.get('/api/applications', (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      success: false,
      error: {
        message: 'No token provided',
        code: 'UNAUTHORIZED'
      }
    });
  }

  res.json({
    success: true,
    data: { applications: mockData.applications }
  });
});

app.post('/api/applications', (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      success: false,
      error: {
        message: 'No token provided',
        code: 'UNAUTHORIZED'
      }
    });
  }

  const applicationData = req.body;
  const newApplication = {
    id: mockData.applications.length + 1,
    ...applicationData,
    status: 'submitted',
    application_fee_paid: false,
    created_at: new Date(),
    updated_at: new Date()
  };

  mockData.applications.push(newApplication);

  res.status(201).json({
    success: true,
    message: 'Application submitted successfully',
    data: { application: newApplication }
  });
});

// Documents endpoints
app.get('/api/documents', (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      success: false,
      error: {
        message: 'No token provided',
        code: 'UNAUTHORIZED'
      }
    });
  }

  res.json({
    success: true,
    data: { documents: mockData.documents }
  });
});

app.post('/api/documents', (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      success: false,
      error: {
        message: 'No token provided',
        code: 'UNAUTHORIZED'
      }
    });
  }

  const documentData = req.body;
  const newDocument = {
    id: mockData.documents.length + 1,
    ...documentData,
    verification_status: 'pending',
    is_active: true,
    created_at: new Date(),
    updated_at: new Date()
  };

  mockData.documents.push(newDocument);

  res.status(201).json({
    success: true,
    message: 'Document uploaded successfully',
    data: { document: newDocument }
  });
});

// Payments endpoints
app.get('/api/payments', (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      success: false,
      error: {
        message: 'No token provided',
        code: 'UNAUTHORIZED'
      }
    });
  }

  res.json({
    success: true,
    data: { payments: mockData.payments }
  });
});

app.post('/api/payments', (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      success: false,
      error: {
        message: 'No token provided',
        code: 'UNAUTHORIZED'
      }
    });
  }

  const paymentData = req.body;
  const newPayment = {
    id: mockData.payments.length + 1,
    ...paymentData,
    payment_reference: 'PAY-' + Date.now(),
    payment_status: 'pending',
    created_at: new Date(),
    updated_at: new Date()
  };

  mockData.payments.push(newPayment);

  res.status(201).json({
    success: true,
    message: 'Payment initiated successfully',
    data: { payment: newPayment }
  });
});

// Visa endpoints
app.get('/api/visa/applications', (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      success: false,
      error: {
        message: 'No token provided',
        code: 'UNAUTHORIZED'
      }
    });
  }

  res.json({
    success: true,
    data: { visaApplications: [] }
  });
});

app.post('/api/visa/applications', (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      success: false,
      error: {
        message: 'No token provided',
        code: 'UNAUTHORIZED'
      }
    });
  }

  const visaData = req.body;
  const newVisaApplication = {
    id: Date.now(),
    ...visaData,
    application_reference: 'VISA-' + Date.now(),
    application_status: 'submitted',
    created_at: new Date(),
    updated_at: new Date()
  };

  res.status(201).json({
    success: true,
    message: 'Visa application submitted successfully',
    data: { visaApplication: newVisaApplication }
  });
});

// Downloads endpoints
app.get('/api/downloads/categories', (req, res) => {
  const { language, stage, required } = req.query;
  
  // Mock download categories data
  const downloadCategories = [
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
          downloadCount: 156,
          version: '1.0.0',
          isActive: true,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ]
    },
    {
      id: 'financial-aid',
      name: 'Financial Aid',
      description: 'Financial assistance documents and loan applications',
      icon: 'money-bill-wave',
      displayOrder: 2,
      items: [
        {
          id: 'loan-application',
          title: 'Migration Loan Application',
          description: 'Application form for migration assistance loans',
          category: 'form',
          subcategory: 'loan',
          fileName: 'migration-loan-application.pdf',
          filePath: '/downloads/financial/loan-application.pdf',
          fileSize: 184320,
          mimeType: 'application/pdf',
          language: 'en',
          required: false,
          stage: 'pre-departure',
          downloadCount: 89,
          version: '1.0.0',
          isActive: true,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ]
    }
  ];
  
  let filteredCategories = downloadCategories;
  
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
});

app.get('/api/downloads/items/:id', (req, res) => {
  const { id } = req.params;
  
  // Mock item data
  const mockItem = {
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
    downloadCount: 157,
    version: '1.0.0',
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  };
  
  res.json({
    success: true,
    data: { item: mockItem }
  });
});

app.get('/api/downloads/required-documents', (req, res) => {
  const { category } = req.query;
  
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
      mobilePaymentRequirements: {
        title: 'Mobile Phone & Payment Account Requirements',
        description: 'Valid mobile phone number with bKash or Nagad account under same applicant\'s name',
        requirements: [
          'Mobile phone number must be in applicant\'s name',
          'bKash or Nagad account must be under same name as applicant',
          'Third party or others name not acceptable',
          'Account must be active and verified',
          'Must have transaction history'
        ]
      },
      documentRequirements: {
        title: 'Document Scanning Requirements',
        description: 'All documents must be scanned at minimum 330 DPI resolution',
        requirements: [
          'Computer scan minimum 330 DPI',
          'All text must be clearly readable',
          'No shadows or reflections',
          'Original documents only (no photocopies unless specified)',
          'Proper lighting and contrast'
        ]
      },
      calibrationProcess: {
        title: 'Calibration Appointment Process',
        description: 'After document submission, applicants must attend in-person assessment',
        steps: [
          'Submit all required documents online',
          'Wait for document verification (3-5 working days)',
          'Receive calibration appointment notification',
          'Attend in-person assessment at designated center',
          'Complete biometric verification',
          'Receive final approval notification'
        ],
        duration: '2-3 hours per appointment',
        locations: ['Dhaka', 'Chittagong', 'Rajshahi', 'Khulna', 'Sylhet']
      },
      appDownload: {
        title: 'SkillConnect Mobile App',
        description: 'Download our mobile app for easier document management and tracking',
        android: {
          url: 'https://play.google.com/store/apps/skillconnect',
          version: '1.0.0',
          size: '25MB'
        },
        ios: {
          url: 'https://apps.apple.com/skillconnect',
          version: '1.0.0',
          size: '28MB'
        }
      },
      total: filteredDocs.length
    }
  });
});

app.get('/api/downloads/document-checklist', (req, res) => {
  const { stage } = req.query;
  
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
  
  const selectedChecklist = stage ? checklist[stage] : checklist;
  
  res.json({
    success: true,
    data: {
      checklist: selectedChecklist,
      mobilePaymentRequirements: {
        title: 'Mobile Phone & Payment Account Requirements',
        description: 'Valid mobile phone number with bKash or Nagad account under same applicant\'s name',
        requirements: [
          'Mobile phone number must be in applicant\'s name',
          'bKash or Nagad account must be under same name as applicant',
          'Third party or others name not acceptable',
          'Account must be active and verified',
          'Must have transaction history'
        ]
      },
      documentRequirements: {
        title: 'Document Scanning Requirements',
        description: 'All documents must be scanned at minimum 330 DPI resolution',
        requirements: [
          'Computer scan minimum 330 DPI',
          'All text must be clearly readable',
          'No shadows or reflections',
          'Original documents only (no photocopies unless specified)',
          'Proper lighting and contrast'
        ]
      },
      calibrationProcess: {
        title: 'Calibration Appointment Process',
        description: 'After document submission, applicants must attend in-person assessment',
        steps: [
          'Submit all required documents online',
          'Wait for document verification (3-5 working days)',
          'Receive calibration appointment notification',
          'Attend in-person assessment at designated center',
          'Complete biometric verification',
          'Receive final approval notification'
        ],
        duration: '2-3 hours per appointment',
        locations: ['Dhaka', 'Chittagong', 'Rajshahi', 'Khulna', 'Sylhet']
      },
      appDownload: {
        title: 'SkillConnect Mobile App',
        description: 'Download our mobile app for easier document management and tracking',
        android: {
          url: 'https://play.google.com/store/apps/skillconnect',
          version: '1.0.0',
          size: '25MB'
        },
        ios: {
          url: 'https://apps.apple.com/skillconnect',
          version: '1.0.0',
          size: '28MB'
        }
      }
    }
  });
});

app.get('/api/downloads/download/:id', (req, res) => {
  const { id } = req.params;
  
  // Mock file download
  const mockFileContent = `Mock file content for download ID: ${id}

This is a demo file. In production, the actual file would be served.

File Details:
- Download ID: ${id}
- Content: Sample employment agreement template
- Format: PDF
- Size: 245KB
- Version: 1.0.0`;
  
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', `attachment; filename="demo-file-${id}.pdf"`);
  res.setHeader('Content-Length', Buffer.byteLength(mockFileContent));
  
  res.send(mockFileContent);
});

app.post('/api/downloads/record-download/:id', (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      success: false,
      error: {
        message: 'No token provided',
        code: 'UNAUTHORIZED'
      }
    });
  }
  
  const { id } = req.params;
  
  // Record download progress (mock)
  const downloadProgress = {
    userId: 1,
    downloadId: id,
    downloadedAt: new Date(),
    completed: true,
    item: {
      title: 'Employment Agreement Template',
      category: 'agreement',
      fileName: 'employment-agreement-template.pdf'
    }
  };
  
  res.json({
    success: true,
    message: 'Download recorded successfully',
    data: {
      downloadProgress
    }
  });
});

// Demo data initialization
function initializeDemoData() {
  // Add sample job
  mockData.jobs.push({
    id: 1,
    employer_id: 1,
    title: 'Construction Worker - Milan, Italy',
    description: 'Experienced construction workers needed for building projects in Milan. Visa sponsorship provided.',
    requirements: ['High School Diploma', '2+ years experience', 'English communication'],
    responsibilities: ['Building construction', 'Concrete work', 'Site preparation'],
    job_type: 'full_time',
    contract_duration_months: 24,
    salary_min: 1200,
    salary_max: 1800,
    salary_currency: 'EUR',
    location: 'Milan',
    country: 'Italy',
    region: 'Lombardy',
    industry: 'Construction',
    category: 'Skilled Labor',
    skills_required: ['Construction', 'Concrete', 'Masonry'],
    languages_required: ['English', 'Italian'],
    education_level_required: 'High School',
    experience_years_min: 2,
    experience_years_max: 10,
    age_min: 22,
    age_max: 45,
    gender_preference: 'any',
    accommodation_provided: true,
    food_provided: true,
    transportation_provided: true,
    medical_insurance: true,
    visa_sponsorship: true,
    relocation_assistance: true,
    application_deadline: '2024-06-30',
    positions_available: 5,
    positions_filled: 0,
    status: 'active',
    featured: true,
    views_count: 156,
    applications_count: 12,
    created_at: new Date(),
    updated_at: new Date()
  });

  // Add sample worker profile
  mockData.workers.push({
    id: 1,
    user_id: 2,
    passport_number: 'BG123456789',
    nationality: 'Bangladeshi',
    date_of_birth: '1990-01-15',
    gender: 'male',
    phone: '+60-12-3456789',
    address: '123 Jalan Ampang, Kuala Lumpur',
    city: 'Kuala Lumpur',
    state: 'Wilayah Persekutuan',
    country: 'Malaysia',
    postal_code: '50450',
    emergency_contact_name: 'Abdul Rahman',
    emergency_contact_phone: '+880-1712345678',
    emergency_contact_relationship: 'Father',
    current_location: 'Malaysia',
    target_country: 'Italy',
    education_level: 'High School',
    years_of_experience: 5,
    current_employer: 'Malaysian Construction Ltd.',
    current_job_title: 'Construction Worker',
    current_salary: 2500.00,
    skills: ['Construction', 'Carpentry', 'Masonry', 'Steel Work'],
    languages: ['Bengali', 'English', 'Malay'],
    certifications: ['Safety Training', 'First Aid'],
    profile_status: 'approved',
    created_at: new Date(),
    updated_at: new Date()
  });

  // Add sample employer profile
  mockData.employers.push({
    id: 1,
    user_id: 1,
    company_name: 'Italian Construction Co. Ltd.',
    company_registration_number: 'IT123456789',
    company_type: 'private',
    industry: 'Construction',
    company_size: 'large',
    website: 'https://italianconstruction.example.com',
    phone: '+39-02-1234567',
    address: 'Via Roma 123, Milano',
    city: 'Milano',
    state: 'Lombardy',
    country: 'Italy',
    postal_code: '20121',
    tax_id: 'IT987654321',
    license_number: 'LC123456',
    license_expiry: '2025-12-31',
    contact_person_name: 'Mario Rossi',
    contact_person_title: 'HR Manager',
    contact_person_phone: '+39-333-1234567',
    company_description: 'Leading construction company in Milan with 20+ years of experience.',
    company_logo_url: 'https://example.com/logo.png',
    verification_status: 'verified',
    created_at: new Date(),
    updated_at: new Date()
  });
}

// Initialize demo data
initializeDemoData();

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`🚀 labor-migration-platform-backend Demo Server running on port ${PORT}`);
  console.log(`📋 Demo API available at: http://localhost:${PORT}/api/health`);
  console.log(`🔑 Test credentials: admin@skillconnect.my / password123`);
});

export default app;