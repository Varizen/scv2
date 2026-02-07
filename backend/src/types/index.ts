import { Request } from 'express';

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  dateOfBirth?: Date;
  nationality?: string;
  userType: 'worker' | 'employer' | 'admin' | 'agent';
  status: 'active' | 'inactive' | 'suspended' | 'pending';
  emailVerified: boolean;
  phoneVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
  lastLogin?: Date;
}

export interface Worker {
  id: string;
  userId: string;
  passportNumber?: string;
  passportExpiry?: Date;
  currentLocation?: string;
  currentCountry: 'bangladesh' | 'malaysia' | 'italy';
  educationLevel?: string;
  yearsOfExperience?: number;
  expectedSalary?: number;
  preferredCountries: string[];
  skills: string[];
  languages: string[];
  availabilityDate?: Date;
  medicalStatus: 'pending' | 'approved' | 'rejected';
  backgroundCheckStatus: 'pending' | 'approved' | 'rejected';
  createdAt: Date;
  updatedAt: Date;
}

export interface Employer {
  id: string;
  userId: string;
  companyName: string;
  companyRegistration?: string;
  companyType?: string;
  industrySector?: string;
  companySize?: string;
  website?: string;
  address?: string;
  city?: string;
  country?: string;
  postalCode?: string;
  taxId?: string;
  verificationStatus: 'pending' | 'verified' | 'rejected';
  createdAt: Date;
  updatedAt: Date;
}

export interface Job {
  id: string;
  employerId: string;
  title: string;
  description?: string;
  jobCategory?: string;
  jobType: 'seasonal' | 'permanent' | 'contract';
  location: string;
  country: string;
  salaryMin?: number;
  salaryMax?: number;
  currency: string;
  requiredSkills: string[];
  requiredLanguages: string[];
  experienceRequired?: number;
  educationRequired?: string;
  visaSponsorship: boolean;
  accommodationProvided: boolean;
  numberOfPositions: number;
  applicationDeadline?: Date;
  status: 'draft' | 'active' | 'closed' | 'filled';
  createdAt: Date;
  updatedAt: Date;
}

export interface Application {
  id: string;
  workerId: string;
  jobId: string;
  status: 'submitted' | 'reviewing' | 'interview_scheduled' | 'interviewed' | 'offered' | 'accepted' | 'rejected' | 'withdrawn';
  coverLetter?: string;
  expectedSalary?: number;
  availableStartDate?: Date;
  interviewDate?: Date;
  interviewNotes?: string;
  employerNotes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Document {
  id: string;
  userId: string;
  documentType: string;
  documentCategory: 'identity' | 'education' | 'experience' | 'medical' | 'visa' | 'other';
  fileName?: string;
  filePath?: string;
  fileSize?: number;
  mimeType?: string;
  originalName?: string;
  verificationStatus: 'pending' | 'verified' | 'rejected';
  verifiedBy?: string;
  verifiedAt?: Date;
  rejectionReason?: string;
  expiryDate?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface VisaApplication {
  id: string;
  workerId: string;
  jobId?: string;
  applicationType: string;
  destinationCountry: string;
  applicationReference?: string;
  status: 'preparing' | 'submitted' | 'under_review' | 'approved' | 'rejected' | 'appealed';
  applicationFee?: number;
  processingFee?: number;
  submittedDate?: Date;
  expectedDecisionDate?: Date;
  decisionDate?: Date;
  rejectionReason?: string;
  appealDeadline?: Date;
  documentsRequired: string[];
  documentsSubmitted: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Payment {
  id: string;
  userId: string;
  paymentType: string;
  amount: number;
  currency: string;
  status: 'pending' | 'processing' | 'completed' | 'failed' | 'refunded';
  paymentMethod?: string;
  transactionId?: string;
  stripePaymentIntent?: string;
  description?: string;
  relatedApplication?: string;
  relatedVisaApplication?: string;
  refundReason?: string;
  refundAmount?: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Workflow {
  id: string;
  workerId: string;
  jobId?: string;
  currentStage: string;
  stageStatus: 'pending' | 'in_progress' | 'completed' | 'failed';
  nextStage?: string;
  stageData?: any;
  assignedTo?: string;
  dueDate?: Date;
  completedAt?: Date;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Communication {
  id: string;
  senderId: string;
  recipientId: string;
  relatedApplication?: string;
  relatedVisaApplication?: string;
  messageType: string;
  subject?: string;
  message: string;
  isRead: boolean;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  sentVia: 'email' | 'sms' | 'whatsapp' | 'platform';
  externalMessageId?: string;
  createdAt: Date;
}

export interface AuthRequest extends Request {
  user?: {
    id: string;
    email: string;
    userType: string;
  };
}

export interface PaginationOptions {
  page: number;
  limit: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface FilterOptions {
  [key: string]: any;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface MigrationCosts {
  registration: number;
  job_matching: number;
  documentation: number;
  visa_processing: number;
  pre_departure: number;
  post_arrival: number;
  employer_services: number;
}

export interface VisaRequirements {
  document_type: string;
  required: boolean;
  description: string;
  validity_period?: number;
  issuing_authority?: string;
}

export interface JobMatchingCriteria {
  skills: string[];
  experience: number;
  education: string;
  languages: string[];
  location_preference: string[];
  salary_range: {
    min: number;
    max: number;
    currency: string;
  };
}

export interface DownloadItem {
  id: string;
  title: string;
  description: string;
  category: 'agreement' | 'form' | 'document' | 'guide' | 'template' | 'certificate';
  subcategory?: string;
  fileName: string;
  filePath: string;
  fileSize: number;
  mimeType: string;
  language: 'en' | 'it' | 'bn';
  required: boolean;
  stage: string;
  downloadCount: number;
  version: string;
  expiryDate?: Date;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface DownloadCategory {
  id: string;
  name: string;
  description: string;
  icon?: string;
  displayOrder: number;
  isActive: boolean;
  items: DownloadItem[];
}

export interface DownloadProgress {
  userId: string;
  downloadId: string;
  downloadedAt: Date;
  completed: boolean;
}

export interface RequiredDocument {
  id: string;
  title: string;
  description: string;
  category: string;
  required: boolean;
  validityPeriod?: number;
  issuingAuthority?: string;
  sampleFile?: string;
  templateFile?: string;
  checklist: string[];
  requirements: string[];
  processingTime?: string;
  fees?: number;
  currency?: string;
}