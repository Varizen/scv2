# Labor Migration Platform - Backend Setup Guide

## Prerequisites

Before setting up the backend, ensure you have the following installed:

- Node.js (v16.0.0 or higher)
- PostgreSQL (v12.0 or higher)
- Redis (optional, for refresh token management)
- npm or yarn

## Quick Setup

### 1. Install Dependencies

```bash
cd /Users/shotah/Downloads/dot.Dev/SkillConnect/backend
npm install
```

### 2. Environment Configuration

Copy the example environment file and configure it:

```bash
cp .env.example .env
```

Edit `.env` with your configuration:

```env
# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_NAME=labor_migration_db
DB_USER=postgres
DB_PASSWORD=your_password

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_here
JWT_REFRESH_SECRET=your_super_secret_refresh_key_here

# Email Configuration (using Gmail SMTP)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password

# Redis Configuration (optional)
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=

# Server Configuration
PORT=3000
NODE_ENV=development

# File Upload Configuration
AWS_ACCESS_KEY_ID=your_aws_access_key
AWS_SECRET_ACCESS_KEY=your_aws_secret_key
AWS_REGION=us-east-1
AWS_S3_BUCKET=your_s3_bucket_name

# Payment Configuration (Stripe)
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret

# SMS Configuration (Twilio)
TWILIO_ACCOUNT_SID=your_twilio_account_sid
TWILIO_AUTH_TOKEN=your_twilio_auth_token
TWILIO_PHONE_NUMBER=your_twilio_phone_number
```

### 3. Database Setup

#### Option A: Automated Setup (Recommended)

Run the setup script that creates the database and runs migrations:

```bash
./setup-database.sh
```

#### Option B: Manual Setup

1. **Create PostgreSQL Database:**

```bash
# Connect to PostgreSQL
psql -U postgres

# Create database
CREATE DATABASE labor_migration_db;

# Create user (optional)
CREATE USER labor_user WITH PASSWORD 'your_password';
GRANT ALL PRIVILEGES ON DATABASE labor_migration_db TO labor_user;
\q
```

2. **Run Migrations:**

```bash
npm run db:migrate
```

3. **Seed Database (Optional):**

```bash
npm run db:seed
```

### 4. Start the Server

Development mode:
```bash
npm run dev
```

Production mode:
```bash
npm run build
npm start
```

## API Documentation

### Authentication Endpoints

#### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "SecurePass123!",
  "firstName": "John",
  "lastName": "Doe",
  "userType": "worker"
}
```

#### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "SecurePass123!"
}
```

#### Refresh Token
```http
POST /api/auth/refresh
Content-Type: application/json

{
  "refreshToken": "your_refresh_token"
}
```

### User Management

#### Get Current User
```http
GET /api/users/me
Authorization: Bearer your_access_token
```

#### Update User Profile
```http
PUT /api/users/profile
Authorization: Bearer your_access_token
Content-Type: application/json

{
  "firstName": "Updated",
  "lastName": "Name"
}
```

### Worker Management

#### Create Worker Profile
```http
POST /api/workers/profile
Authorization: Bearer your_access_token
Content-Type: application/json

{
  "passportNumber": "BG123456789",
  "dateOfBirth": "1990-01-15",
  "gender": "male",
  "phone": "+60-12-3456789",
  "address": "123 Jalan Ampang, Kuala Lumpur",
  "currentLocation": "Malaysia",
  "targetCountry": "Italy",
  "skills": ["Construction", "Carpentry"],
  "languages": ["Bengali", "English", "Malay"]
}
```

#### Get Worker Profile
```http
GET /api/workers/profile
Authorization: Bearer your_access_token
```

### Job Management

#### Create Job Posting (Employer)
```http
POST /api/jobs
Authorization: Bearer your_access_token
Content-Type: application/json

{
  "title": "Construction Worker - Italy",
  "description": "Experienced construction workers needed",
  "requirements": ["High School", "Construction Experience"],
  "salaryMin": 1200,
  "salaryMax": 1800,
  "salaryCurrency": "EUR",
  "location": "Milan",
  "country": "Italy",
  "skillsRequired": ["Construction", "Carpentry"],
  "experienceYearsMin": 2,
  "positionsAvailable": 5
}
```

#### Get Job Listings
```http
GET /api/jobs?page=1&limit=10&country=Italy&category=Construction
```

#### Apply for Job (Worker)
```http
POST /api/applications
Authorization: Bearer your_access_token
Content-Type: application/json

{
  "jobId": 1,
  "coverLetter": "I am interested in this position...",
  "expectedSalary": 1500,
  "availableStartDate": "2024-03-01"
}
```

### Document Management

#### Upload Document
```http
POST /api/documents/upload
Authorization: Bearer your_access_token
Content-Type: multipart/form-data

file: <upload_file>
documentType: passport
```

#### Get User Documents
```http
GET /api/documents
Authorization: Bearer your_access_token
```

### Visa Tracking

#### Create Visa Application
```http
POST /api/visa/applications
Authorization: Bearer your_access_token
Content-Type: application/json

{
  "applicationId": 1,
  "visaType": "work_permit",
  "embassyConsulate": "Italian Embassy, Kuala Lumpur",
  "processingFee": 150,
  "documentsRequired": ["passport", "job_offer", "medical_certificate"]
}
```

#### Get Visa Status
```http
GET /api/visa/applications
Authorization: Bearer your_access_token
```

### Payment Management

#### Create Payment
```http
POST /api/payments
Authorization: Bearer your_access_token
Content-Type: application/json

{
  "applicationId": 1,
  "paymentType": "application_fee",
  "amount": 250,
  "currency": "USD",
  "paymentMethod": "credit_card"
}
```

## Database Schema

The database consists of 10 main tables:

1. **users** - User authentication and profile
2. **workers** - Worker-specific profile information
3. **employers** - Employer/company information
4. **jobs** - Job postings and requirements
5. **applications** - Job applications and status tracking
6. **documents** - Document storage and verification
7. **visa_tracking** - Visa application management
8. **payments** - Payment processing and tracking
9. **notifications** - User notifications
10. **refresh_tokens** - JWT refresh token management

## Toll Gates Implementation

The platform implements 8 toll gates as specified in the business model:

1. **Registration Fee** - Worker registration
2. **Document Verification** - Document processing fees
3. **Job Matching** - Application fees
4. **Interview Coordination** - Interview arrangement fees
5. **Visa Processing** - Visa application fees
6. **Medical Checkup** - Medical examination fees
7. **Training & Orientation** - Pre-departure training
8. **Placement & Follow-up** - Final placement fees

## Error Handling

The API uses consistent error responses:

```json
{
  "success": false,
  "error": {
    "message": "Validation error",
    "code": "VALIDATION_ERROR",
    "details": ["Email is required", "Password must be at least 8 characters"]
  }
}
```

## Security Features

- JWT-based authentication
- Rate limiting (100 requests per 15 minutes per IP)
- Input validation with express-validator
- Password hashing with bcrypt
- CORS protection
- Helmet security headers
- SQL injection prevention with parameterized queries

## Development Tips

### Running Tests
```bash
npm test
```

### Linting
```bash
npm run lint
npm run lint:fix
```

### Database Reset
```bash
# Drop and recreate database (be careful!)
dropdb labor_migration_db
createdb labor_migration_db
npm run db:migrate
npm run db:seed
```

### Common Issues

1. **PostgreSQL Connection Error**: Ensure PostgreSQL is running and credentials are correct
2. **Redis Connection Error**: Redis is optional, but if configured, ensure it's running
3. **Migration Errors**: Check that all migration files are properly formatted
4. **Port Already in Use**: Change the PORT in .env file if 3000 is occupied

## Sample Data

After running the seeders, you'll have:

- **Admin User**: admin@skillconnect.com / admin123
- **Employer**: employer@example.com / employer123  
- **Worker**: worker@example.com / worker123
- **Sample Job**: Construction Worker position in Milan, Italy

## Next Steps

1. Set up the frontend React application
2. Implement payment integration with Stripe
3. Add document upload functionality with AWS S3
4. Implement SMS notifications with Twilio
5. Add admin dashboard for analytics and reporting
6. Implement visa tracking workflow
7. Add multi-language support (Bengali, English, Italian)
8. Set up production deployment