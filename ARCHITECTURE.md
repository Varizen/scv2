# System Architecture & Database Design

## Technology Stack

### Frontend
- **Framework**: React.js 18+ with TypeScript
- **UI Library**: Material-UI (MUI) for professional design
- **State Management**: Redux Toolkit with RTK Query
- **Routing**: React Router v6
- **Form Handling**: React Hook Form with Yup validation
- **Internationalization**: i18next for multi-language support

### Backend
- **Runtime**: Node.js with Express.js
- **Language**: TypeScript
- **Authentication**: JWT with refresh tokens
- **Validation**: Joi for request validation
- **File Upload**: Multer with AWS S3 integration
- **Email**: Nodemailer with SendGrid
- **SMS/WhatsApp**: Twilio integration

### Database
- **Primary**: PostgreSQL 14+
- **Caching**: Redis for session management and caching
- **File Storage**: AWS S3 with CloudFront CDN
- **Search**: PostgreSQL full-text search

### Infrastructure
- **Containerization**: Docker with Docker Compose
- **Web Server**: Nginx reverse proxy
- **SSL**: Let's Encrypt for HTTPS
- **Monitoring**: PM2 for process management

## Database Schema

### Users Table
```sql
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    phone VARCHAR(20),
    date_of_birth DATE,
    nationality VARCHAR(50),
    user_type ENUM('worker', 'employer', 'admin', 'agent') NOT NULL,
    status ENUM('active', 'inactive', 'suspended', 'pending') DEFAULT 'pending',
    email_verified BOOLEAN DEFAULT FALSE,
    phone_verified BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_login TIMESTAMP
);
```

### Workers Table
```sql
CREATE TABLE workers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    passport_number VARCHAR(50) UNIQUE,
    passport_expiry DATE,
    current_location VARCHAR(100),
    current_country ENUM('bangladesh', 'malaysia', 'italy') DEFAULT 'bangladesh',
    education_level VARCHAR(50),
    years_of_experience INTEGER,
    expected_salary DECIMAL(10,2),
    preferred_countries TEXT[],
    skills TEXT[],
    languages TEXT[],
    availability_date DATE,
    medical_status ENUM('pending', 'approved', 'rejected') DEFAULT 'pending',
    background_check_status ENUM('pending', 'approved', 'rejected') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Employers Table
```sql
CREATE TABLE employers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    company_name VARCHAR(255) NOT NULL,
    company_registration VARCHAR(100) UNIQUE,
    company_type VARCHAR(100),
    industry_sector VARCHAR(100),
    company_size VARCHAR(50),
    website VARCHAR(255),
    address TEXT,
    city VARCHAR(100),
    country VARCHAR(50),
    postal_code VARCHAR(20),
    tax_id VARCHAR(50),
    verification_status ENUM('pending', 'verified', 'rejected') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Jobs Table
```sql
CREATE TABLE jobs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    employer_id UUID REFERENCES employers(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    job_category VARCHAR(100),
    job_type ENUM('seasonal', 'permanent', 'contract') NOT NULL,
    location VARCHAR(100),
    country VARCHAR(50) NOT NULL,
    salary_min DECIMAL(10,2),
    salary_max DECIMAL(10,2),
    currency VARCHAR(3) DEFAULT 'EUR',
    required_skills TEXT[],
    required_languages TEXT[],
    experience_required INTEGER,
    education_required VARCHAR(100),
    visa_sponsorship BOOLEAN DEFAULT TRUE,
    accommodation_provided BOOLEAN DEFAULT FALSE,
    number_of_positions INTEGER DEFAULT 1,
    application_deadline DATE,
    status ENUM('draft', 'active', 'closed', 'filled') DEFAULT 'draft',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Applications Table
```sql
CREATE TABLE applications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    worker_id UUID REFERENCES workers(id) ON DELETE CASCADE,
    job_id UUID REFERENCES jobs(id) ON DELETE CASCADE,
    status ENUM('submitted', 'reviewing', 'interview_scheduled', 'interviewed', 'offered', 'accepted', 'rejected', 'withdrawn') DEFAULT 'submitted',
    cover_letter TEXT,
    expected_salary DECIMAL(10,2),
    available_start_date DATE,
    interview_date TIMESTAMP,
    interview_notes TEXT,
    employer_notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(worker_id, job_id)
);
```

### Documents Table
```sql
CREATE TABLE documents (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    document_type VARCHAR(100) NOT NULL,
    document_category ENUM('identity', 'education', 'experience', 'medical', 'visa', 'other') NOT NULL,
    file_name VARCHAR(255),
    file_path VARCHAR(500),
    file_size INTEGER,
    mime_type VARCHAR(100),
    original_name VARCHAR(255),
    verification_status ENUM('pending', 'verified', 'rejected') DEFAULT 'pending',
    verified_by UUID REFERENCES users(id),
    verified_at TIMESTAMP,
    rejection_reason TEXT,
    expiry_date DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### VisaApplications Table
```sql
CREATE TABLE visa_applications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    worker_id UUID REFERENCES workers(id) ON DELETE CASCADE,
    job_id UUID REFERENCES jobs(id) ON DELETE CASCADE,
    application_type VARCHAR(100) NOT NULL,
    destination_country VARCHAR(50) NOT NULL,
    application_reference VARCHAR(100) UNIQUE,
    status ENUM('preparing', 'submitted', 'under_review', 'approved', 'rejected', 'appealed') DEFAULT 'preparing',
    application_fee DECIMAL(10,2),
    processing_fee DECIMAL(10,2),
    submitted_date DATE,
    expected_decision_date DATE,
    decision_date DATE,
    rejection_reason TEXT,
    appeal_deadline DATE,
    documents_required TEXT[],
    documents_submitted TEXT[],
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Payments Table
```sql
CREATE TABLE payments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    payment_type VARCHAR(100) NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    currency VARCHAR(3) DEFAULT 'USD',
    status ENUM('pending', 'processing', 'completed', 'failed', 'refunded') DEFAULT 'pending',
    payment_method VARCHAR(50),
    transaction_id VARCHAR(255),
    stripe_payment_intent VARCHAR(255),
    description TEXT,
    related_application UUID REFERENCES applications(id),
    related_visa_application UUID REFERENCES visa_applications(id),
    refund_reason TEXT,
    refund_amount DECIMAL(10,2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Workflows Table
```sql
CREATE TABLE workflows (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    worker_id UUID REFERENCES workers(id) ON DELETE CASCADE,
    job_id UUID REFERENCES jobs(id) ON DELETE CASCADE,
    current_stage VARCHAR(100) NOT NULL,
    stage_status ENUM('pending', 'in_progress', 'completed', 'failed') DEFAULT 'pending',
    next_stage VARCHAR(100),
    stage_data JSONB,
    assigned_to UUID REFERENCES users(id),
    due_date DATE,
    completed_at TIMESTAMP,
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Communications Table
```sql
CREATE TABLE communications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    sender_id UUID REFERENCES users(id) ON DELETE CASCADE,
    recipient_id UUID REFERENCES users(id) ON DELETE CASCADE,
    related_application UUID REFERENCES applications(id),
    related_visa_application UUID REFERENCES visa_applications(id),
    message_type VARCHAR(50) NOT NULL,
    subject VARCHAR(255),
    message TEXT NOT NULL,
    is_read BOOLEAN DEFAULT FALSE,
    priority ENUM('low', 'medium', 'high', 'urgent') DEFAULT 'medium',
    sent_via ENUM('email', 'sms', 'whatsapp', 'platform') DEFAULT 'platform',
    external_message_id VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## API Architecture

### RESTful API Endpoints

#### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/refresh` - Refresh JWT token
- `POST /api/auth/logout` - User logout
- `POST /api/auth/verify-email` - Email verification
- `POST /api/auth/forgot-password` - Password reset

#### Workers
- `GET /api/workers` - List workers (with filters)
- `GET /api/workers/:id` - Get worker profile
- `POST /api/workers` - Create worker profile
- `PUT /api/workers/:id` - Update worker profile
- `POST /api/workers/:id/documents` - Upload documents
- `GET /api/workers/:id/documents` - List worker documents

#### Jobs
- `GET /api/jobs` - List jobs (with filters)
- `GET /api/jobs/:id` - Get job details
- `POST /api/jobs` - Create job posting
- `PUT /api/jobs/:id` - Update job posting
- `DELETE /api/jobs/:id` - Delete job posting
- `POST /api/jobs/:id/apply` - Apply for job

#### Applications
- `GET /api/applications` - List applications
- `GET /api/applications/:id` - Get application details
- `PUT /api/applications/:id/status` - Update application status
- `POST /api/applications/:id/interview` - Schedule interview

#### Visa Applications
- `GET /api/visa-applications` - List visa applications
- `POST /api/visa-applications` - Create visa application
- `PUT /api/visa-applications/:id` - Update visa application
- `POST /api/visa-applications/:id/documents` - Upload visa documents

#### Payments
- `POST /api/payments` - Create payment
- `GET /api/payments` - List payments
- `GET /api/payments/:id` - Get payment details
- `POST /api/payments/:id/refund` - Process refund

#### Communications
- `GET /api/communications` - List communications
- `POST /api/communications` - Send message
- `PUT /api/communications/:id/read` - Mark as read

## Security Features

### Authentication & Authorization
- JWT-based authentication with refresh tokens
- Role-based access control (RBAC)
- Multi-factor authentication (MFA) support
- Session management with Redis

### Data Protection
- Password hashing with bcrypt
- Sensitive data encryption at rest
- HTTPS enforcement
- Input validation and sanitization
- SQL injection prevention
- XSS protection

### Compliance
- GDPR compliance for EU operations
- Data retention policies
- Audit logging
- Privacy by design

## Scalability Considerations

### Database Optimization
- Proper indexing on frequently queried columns
- Database connection pooling
- Query optimization
- Read replicas for scaling

### Caching Strategy
- Redis for session management
- API response caching
- Static asset caching with CDN
- Database query result caching

### Performance Optimization
- Image optimization and compression
- Lazy loading for large datasets
- Pagination for list endpoints
- Background job processing
- Microservices architecture consideration

## Monitoring & Logging

### Application Monitoring
- Error tracking with Sentry
- Performance monitoring
- Uptime monitoring
- Log aggregation

### Business Intelligence
- User behavior analytics
- Conversion tracking
- Revenue reporting
- System performance metrics