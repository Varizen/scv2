-- Migration: 005_create_applications_table.sql
-- Description: Create applications table for job applications

CREATE TABLE applications (
    id SERIAL PRIMARY KEY,
    worker_id INTEGER NOT NULL REFERENCES workers(id) ON DELETE CASCADE,
    job_id INTEGER NOT NULL REFERENCES jobs(id) ON DELETE CASCADE,
    employer_id INTEGER NOT NULL REFERENCES employers(id) ON DELETE CASCADE,
    status VARCHAR(50) DEFAULT 'submitted' CHECK (status IN ('submitted', 'reviewing', 'interview_scheduled', 'interviewed', 'offer_pending', 'accepted', 'rejected', 'withdrawn')),
    cover_letter TEXT,
    expected_salary DECIMAL(10,2),
    available_start_date DATE,
    application_fee_paid BOOLEAN DEFAULT FALSE,
    application_fee_amount DECIMAL(10,2),
    application_fee_currency VARCHAR(3) DEFAULT 'USD',
    interview_date TIMESTAMP,
    interview_location VARCHAR(200),
    interview_notes TEXT,
    employer_notes TEXT,
    worker_notes TEXT,
    rating_by_employer INTEGER CHECK (rating_by_employer >= 1 AND rating_by_employer <= 5),
    rating_by_worker INTEGER CHECK (rating_by_worker >= 1 AND rating_by_worker <= 5),
    rejection_reason VARCHAR(200),
    withdrawal_reason VARCHAR(200),
    documents_submitted TEXT[],
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(worker_id, job_id)
);

-- Create indexes
CREATE INDEX idx_applications_worker_id ON applications(worker_id);
CREATE INDEX idx_applications_job_id ON applications(job_id);
CREATE INDEX idx_applications_employer_id ON applications(employer_id);
CREATE INDEX idx_applications_status ON applications(status);
CREATE INDEX idx_applications_created_at ON applications(created_at);

-- Create updated_at trigger
CREATE TRIGGER update_applications_updated_at 
    BEFORE UPDATE ON applications 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();