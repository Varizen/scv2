-- Migration: 003_create_employers_table.sql
-- Description: Create employers table for employer profiles

CREATE TABLE employers (
    id SERIAL PRIMARY KEY,
    user_id INTEGER UNIQUE NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    company_name VARCHAR(200) NOT NULL,
    company_registration_number VARCHAR(100) UNIQUE,
    company_type VARCHAR(50) CHECK (company_type IN ('private', 'public', 'government', 'ngo')),
    industry VARCHAR(100),
    company_size VARCHAR(20) CHECK (company_size IN ('small', 'medium', 'large')),
    website VARCHAR(255),
    phone VARCHAR(20),
    address TEXT,
    city VARCHAR(100),
    state VARCHAR(100),
    country VARCHAR(100),
    postal_code VARCHAR(20),
    tax_id VARCHAR(100),
    license_number VARCHAR(100),
    license_expiry DATE,
    contact_person_name VARCHAR(200),
    contact_person_title VARCHAR(100),
    contact_person_phone VARCHAR(20),
    company_description TEXT,
    company_logo_url VARCHAR(500),
    verification_status VARCHAR(20) DEFAULT 'pending' CHECK (verification_status IN ('pending', 'verified', 'rejected')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes
CREATE INDEX idx_employers_user_id ON employers(user_id);
CREATE INDEX idx_employers_company_name ON employers(company_name);
CREATE INDEX idx_employers_verification_status ON employers(verification_status);

-- Create updated_at trigger
CREATE TRIGGER update_employers_updated_at 
    BEFORE UPDATE ON employers 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();