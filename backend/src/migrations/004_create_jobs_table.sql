-- Migration: 004_create_jobs_table.sql
-- Description: Create jobs table for job postings

CREATE TABLE jobs (
    id SERIAL PRIMARY KEY,
    employer_id INTEGER NOT NULL REFERENCES employers(id) ON DELETE CASCADE,
    title VARCHAR(200) NOT NULL,
    description TEXT NOT NULL,
    requirements TEXT[],
    responsibilities TEXT[],
    job_type VARCHAR(50) CHECK (job_type IN ('full_time', 'part_time', 'contract', 'temporary')),
    contract_duration_months INTEGER,
    salary_min DECIMAL(10,2),
    salary_max DECIMAL(10,2),
    salary_currency VARCHAR(3) DEFAULT 'EUR',
    location VARCHAR(200),
    country VARCHAR(100) DEFAULT 'Italy',
    region VARCHAR(100),
    industry VARCHAR(100),
    category VARCHAR(100),
    skills_required TEXT[],
    languages_required TEXT[],
    education_level_required VARCHAR(50),
    experience_years_min INTEGER DEFAULT 0,
    experience_years_max INTEGER,
    age_min INTEGER,
    age_max INTEGER,
    gender_preference VARCHAR(20) CHECK (gender_preference IN ('male', 'female', 'any')),
    accommodation_provided BOOLEAN DEFAULT FALSE,
    food_provided BOOLEAN DEFAULT FALSE,
    transportation_provided BOOLEAN DEFAULT FALSE,
    medical_insurance BOOLEAN DEFAULT FALSE,
    visa_sponsorship BOOLEAN DEFAULT TRUE,
    relocation_assistance BOOLEAN DEFAULT TRUE,
    application_deadline DATE,
    positions_available INTEGER DEFAULT 1,
    positions_filled INTEGER DEFAULT 0,
    status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('draft', 'active', 'paused', 'closed', 'filled')),
    featured BOOLEAN DEFAULT FALSE,
    views_count INTEGER DEFAULT 0,
    applications_count INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes
CREATE INDEX idx_jobs_employer_id ON jobs(employer_id);
CREATE INDEX idx_jobs_status ON jobs(status);
CREATE INDEX idx_jobs_country ON jobs(country);
CREATE INDEX idx_jobs_category ON jobs(category);
CREATE INDEX idx_jobs_salary_range ON jobs(salary_min, salary_max);
CREATE INDEX idx_jobs_experience ON jobs(experience_years_min, experience_years_max);
CREATE INDEX idx_jobs_application_deadline ON jobs(application_deadline);

-- Create updated_at trigger
CREATE TRIGGER update_jobs_updated_at 
    BEFORE UPDATE ON jobs 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();