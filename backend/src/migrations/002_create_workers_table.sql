-- Migration: 002_create_workers_table.sql
-- Description: Create workers table for worker profiles

CREATE TABLE workers (
    id SERIAL PRIMARY KEY,
    user_id INTEGER UNIQUE NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    passport_number VARCHAR(50) UNIQUE,
    nationality VARCHAR(50) DEFAULT 'Bangladeshi',
    date_of_birth DATE,
    gender VARCHAR(10) CHECK (gender IN ('male', 'female', 'other')),
    phone VARCHAR(20),
    address TEXT,
    city VARCHAR(100),
    state VARCHAR(100),
    country VARCHAR(100),
    postal_code VARCHAR(20),
    emergency_contact_name VARCHAR(200),
    emergency_contact_phone VARCHAR(20),
    emergency_contact_relationship VARCHAR(100),
    current_location VARCHAR(100) DEFAULT 'Malaysia',
    target_country VARCHAR(100) DEFAULT 'Italy',
    education_level VARCHAR(50),
    years_of_experience INTEGER DEFAULT 0,
    current_employer VARCHAR(200),
    current_job_title VARCHAR(200),
    current_salary DECIMAL(10,2),
    skills TEXT[],
    languages TEXT[],
    certifications TEXT[],
    profile_status VARCHAR(20) DEFAULT 'pending' CHECK (profile_status IN ('pending', 'approved', 'rejected')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes
CREATE INDEX idx_workers_user_id ON workers(user_id);
CREATE INDEX idx_workers_passport ON workers(passport_number);
CREATE INDEX idx_workers_current_location ON workers(current_location);
CREATE INDEX idx_workers_target_country ON workers(target_country);
CREATE INDEX idx_workers_profile_status ON workers(profile_status);

-- Create updated_at trigger
CREATE TRIGGER update_workers_updated_at 
    BEFORE UPDATE ON workers 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();