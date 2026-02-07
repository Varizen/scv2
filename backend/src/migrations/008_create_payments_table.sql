-- Migration: 008_create_payments_table.sql
-- Description: Create payments table for payment management

CREATE TABLE payments (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    worker_id INTEGER REFERENCES workers(id) ON DELETE CASCADE,
    employer_id INTEGER REFERENCES employers(id) ON DELETE CASCADE,
    application_id INTEGER REFERENCES applications(id) ON DELETE CASCADE,
    visa_tracking_id INTEGER REFERENCES visa_tracking(id) ON DELETE CASCADE,
    payment_reference VARCHAR(100) UNIQUE NOT NULL,
    payment_type VARCHAR(50) NOT NULL CHECK (payment_type IN ('registration_fee', 'application_fee', 'document_verification', 'visa_processing', 'medical_checkup', 'training_fee', 'placement_fee', 'service_charge', 'refund')),
    amount DECIMAL(10,2) NOT NULL,
    currency VARCHAR(3) DEFAULT 'USD',
    payment_method VARCHAR(50) CHECK (payment_method IN ('credit_card', 'debit_card', 'bank_transfer', 'mobile_money', 'cash', 'cryptocurrency')),
    payment_provider VARCHAR(50),
    transaction_id VARCHAR(200),
    payment_status VARCHAR(50) DEFAULT 'pending' CHECK (payment_status IN ('pending', 'processing', 'completed', 'failed', 'cancelled', 'refunded', 'partially_refunded')),
    payment_date TIMESTAMP,
    gateway_response JSONB,
    failure_reason TEXT,
    refund_amount DECIMAL(10,2),
    refund_reason TEXT,
    refund_date TIMESTAMP,
    due_date DATE,
    late_fee DECIMAL(10,2),
    total_amount DECIMAL(10,2),
    installment_number INTEGER,
    total_installments INTEGER,
    notes TEXT,
    created_by INTEGER NOT NULL REFERENCES users(id),
    updated_by INTEGER REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes
CREATE INDEX idx_payments_user_id ON payments(user_id);
CREATE INDEX idx_payments_worker_id ON payments(worker_id);
CREATE INDEX idx_payments_employer_id ON payments(employer_id);
CREATE INDEX idx_payments_application_id ON payments(application_id);
CREATE INDEX idx_payments_type ON payments(payment_type);
CREATE INDEX idx_payments_status ON payments(payment_status);
CREATE INDEX idx_payments_reference ON payments(payment_reference);
CREATE INDEX idx_payments_date ON payments(payment_date);

-- Create updated_at trigger
CREATE TRIGGER update_payments_updated_at 
    BEFORE UPDATE ON payments 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();