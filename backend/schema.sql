-- Create blood_requests table
CREATE TABLE IF NOT EXISTS blood_requests (
    id SERIAL PRIMARY KEY,
    hospital_id VARCHAR(255) NOT NULL,
    blood_type VARCHAR(5) NOT NULL,
    units_needed INTEGER NOT NULL,
    units_fulfilled INTEGER DEFAULT 0,
    location VARCHAR(255),
    deadline DATE,
    notes TEXT,
    status VARCHAR(20) DEFAULT 'Active',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create index on hospital_id for faster queries
CREATE INDEX IF NOT EXISTS idx_blood_requests_hospital_id ON blood_requests(hospital_id);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_blood_requests_updated_at
    BEFORE UPDATE ON blood_requests
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column(); 