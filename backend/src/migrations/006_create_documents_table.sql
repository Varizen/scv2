-- Migration: 006_create_documents_table.sql
-- Description: Create documents table for document management

CREATE TABLE documents (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    worker_id INTEGER REFERENCES workers(id) ON DELETE CASCADE,
    employer_id INTEGER REFERENCES employers(id) ON DELETE CASCADE,
    document_type VARCHAR(100) NOT NULL CHECK (document_type IN ('passport', 'visa', 'work_permit', 'id_card', 'birth_certificate', 'education_certificate', 'experience_certificate', 'medical_certificate', 'police_clearance', 'contract', 'offer_letter', 'company_registration', 'tax_certificate', 'license', 'other')),
    document_name VARCHAR(200) NOT NULL,
    file_name VARCHAR(255),
    file_path VARCHAR(500),
    file_size INTEGER,
    file_type VARCHAR(50),
    document_number VARCHAR(100),
    issue_date DATE,
    expiry_date DATE,
    issuing_authority VARCHAR(200),
    issuing_country VARCHAR(100),
    verification_status VARCHAR(20) DEFAULT 'pending' CHECK (verification_status IN ('pending', 'verified', 'rejected', 'expired')),
    verification_notes TEXT,
    verified_by INTEGER REFERENCES users(id),
    verified_at TIMESTAMP,
    is_active BOOLEAN DEFAULT TRUE,
    upload_ip VARCHAR(45),
    metadata JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes
CREATE INDEX idx_documents_user_id ON documents(user_id);
CREATE INDEX idx_documents_worker_id ON documents(worker_id);
CREATE INDEX idx_documents_employer_id ON documents(employer_id);
CREATE INDEX idx_documents_type ON documents(document_type);
CREATE INDEX idx_documents_status ON documents(verification_status);
CREATE INDEX idx_documents_expiry ON documents(expiry_date);

-- Create updated_at trigger
CREATE TRIGGER update_documents_updated_at 
    BEFORE UPDATE ON documents 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();