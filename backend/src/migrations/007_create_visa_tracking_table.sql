-- Migration: 007_create_visa_tracking_table.sql
-- Description: Create visa_tracking table for visa application management

CREATE TABLE visa_tracking (
    id SERIAL PRIMARY KEY,
    worker_id INTEGER NOT NULL REFERENCES workers(id) ON DELETE CASCADE,
    application_id INTEGER REFERENCES applications(id) ON DELETE CASCADE,
    visa_type VARCHAR(100) NOT NULL,
    application_reference VARCHAR(100) UNIQUE,
    application_status VARCHAR(50) DEFAULT 'submitted' CHECK (application_status IN ('submitted', 'under_review', 'additional_documents_required', 'approved', 'rejected', 'expired', 'cancelled')),
    application_date DATE,
    expected_processing_days INTEGER,
    expected_completion_date DATE,
    actual_completion_date DATE,
    embassy_consulate VARCHAR(200),
    processing_fee DECIMAL(10,2),
    processing_fee_currency VARCHAR(3) DEFAULT 'EUR',
    expedited_processing BOOLEAN DEFAULT FALSE,
    expedited_fee DECIMAL(10,2),
    rejection_reason TEXT,
    appeal_deadline DATE,
    appeal_status VARCHAR(50),
    appeal_date DATE,
    documents_required TEXT[],
    documents_submitted TEXT[],
    documents_approved TEXT[],
    notes TEXT,
    created_by INTEGER NOT NULL REFERENCES users(id),
    updated_by INTEGER REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes
CREATE INDEX idx_visa_tracking_worker_id ON visa_tracking(worker_id);
CREATE INDEX idx_visa_tracking_application_id ON visa_tracking(application_id);
CREATE INDEX idx_visa_tracking_status ON visa_tracking(application_status);
CREATE INDEX idx_visa_tracking_reference ON visa_tracking(application_reference);
CREATE INDEX idx_visa_tracking_completion_date ON visa_tracking(expected_completion_date);

-- Create updated_at trigger
CREATE TRIGGER update_visa_tracking_updated_at 
    BEFORE UPDATE ON visa_tracking 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();