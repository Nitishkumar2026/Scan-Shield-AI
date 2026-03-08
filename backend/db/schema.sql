-- AI Scam Shield X - Database Schema
-- National Cyber Intelligence Platform
-- PostgreSQL Schema

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    phone_number VARCHAR(20),
    avatar_url TEXT,
    role VARCHAR(50) DEFAULT 'user' CHECK (role IN ('user', 'admin', 'superadmin')),
    is_verified BOOLEAN DEFAULT FALSE,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    last_login TIMESTAMP WITH TIME ZONE
);

-- Family members table
CREATE TABLE family_members (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    relationship VARCHAR(100) NOT NULL,
    phone_number VARCHAR(20),
    email VARCHAR(255),
    risk_score INTEGER DEFAULT 0 CHECK (risk_score >= 0 AND risk_score <= 100),
    status VARCHAR(50) DEFAULT 'safe' CHECK (status IN ('safe', 'warning', 'danger')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Scam reports table
CREATE TABLE scam_reports (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    reporter_id UUID REFERENCES users(id) ON DELETE SET NULL,
    type VARCHAR(50) NOT NULL CHECK (type IN ('call', 'sms', 'upi', 'email', 'website', 'app')),
    title VARCHAR(500) NOT NULL,
    description TEXT NOT NULL,
    phone_number VARCHAR(20),
    upi_id VARCHAR(100),
    email VARCHAR(255),
    url TEXT,
    risk_score INTEGER,
    status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending', 'investigating', 'verified', 'false_positive', 'resolved')),
    upvotes INTEGER DEFAULT 0,
    evidence_urls TEXT[],
    location_lat DECIMAL(10, 8),
    location_lng DECIMAL(11, 8),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Threat alerts table
CREATE TABLE threat_alerts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    type VARCHAR(50) NOT NULL CHECK (type IN ('call', 'sms', 'upi', 'email', 'app')),
    severity VARCHAR(50) NOT NULL CHECK (severity IN ('low', 'medium', 'high', 'critical')),
    title VARCHAR(500) NOT NULL,
    description TEXT,
    source VARCHAR(255),
    risk_score INTEGER,
    status VARCHAR(50) DEFAULT 'active' CHECK (status IN ('active', 'resolved', 'false_positive')),
    metadata JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    resolved_at TIMESTAMP WITH TIME ZONE
);

-- Transactions table (for UPI analysis)
CREATE TABLE transactions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    upi_id VARCHAR(100) NOT NULL,
    amount DECIMAL(15, 2),
    currency VARCHAR(10) DEFAULT 'INR',
    risk_score INTEGER,
    is_fraudulent BOOLEAN DEFAULT FALSE,
    transaction_type VARCHAR(50),
    status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'blocked', 'flagged')),
    metadata JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Flagged entities table (for fraud network)
CREATE TABLE flagged_entities (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    type VARCHAR(50) NOT NULL CHECK (type IN ('phone', 'upi', 'email', 'url', 'cluster')),
    value VARCHAR(500) NOT NULL,
    risk_score INTEGER NOT NULL CHECK (risk_score >= 0 AND risk_score <= 100),
    report_count INTEGER DEFAULT 0,
    status VARCHAR(50) DEFAULT 'active' CHECK (status IN ('active', 'blocked', 'under_review')),
    first_reported_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    last_reported_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    metadata JSONB
);

-- Entity relationships table (for graph analysis)
CREATE TABLE entity_relationships (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    source_id UUID NOT NULL REFERENCES flagged_entities(id) ON DELETE CASCADE,
    target_id UUID NOT NULL REFERENCES flagged_entities(id) ON DELETE CASCADE,
    relationship_type VARCHAR(50) NOT NULL CHECK (relationship_type IN ('connected', 'reported', 'linked', 'belongs')),
    weight INTEGER DEFAULT 1,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(source_id, target_id, relationship_type)
);

-- Risk history table
CREATE TABLE risk_history (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    entity_type VARCHAR(50) NOT NULL,
    entity_value VARCHAR(500) NOT NULL,
    risk_score INTEGER NOT NULL,
    analysis_result JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Admin logs table
CREATE TABLE admin_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    admin_id UUID REFERENCES users(id) ON DELETE SET NULL,
    action VARCHAR(255) NOT NULL,
    entity_type VARCHAR(100),
    entity_id UUID,
    details JSONB,
    ip_address INET,
    user_agent TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Analytics table (aggregated data)
CREATE TABLE analytics (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    date DATE NOT NULL,
    metric_type VARCHAR(100) NOT NULL,
    metric_name VARCHAR(255) NOT NULL,
    value BIGINT NOT NULL,
    metadata JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(date, metric_type, metric_name)
);

-- Notifications table
CREATE TABLE notifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    type VARCHAR(50) NOT NULL CHECK (type IN ('alert', 'info', 'success', 'warning')),
    title VARCHAR(500) NOT NULL,
    message TEXT NOT NULL,
    is_read BOOLEAN DEFAULT FALSE,
    action_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    read_at TIMESTAMP WITH TIME ZONE
);

-- Indexes for performance
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_phone ON users(phone_number);
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_users_created_at ON users(created_at);

CREATE INDEX idx_family_members_user_id ON family_members(user_id);
CREATE INDEX idx_family_members_status ON family_members(status);

CREATE INDEX idx_scam_reports_type ON scam_reports(type);
CREATE INDEX idx_scam_reports_status ON scam_reports(status);
CREATE INDEX idx_scam_reports_phone ON scam_reports(phone_number);
CREATE INDEX idx_scam_reports_upi ON scam_reports(upi_id);
CREATE INDEX idx_scam_reports_created_at ON scam_reports(created_at);
CREATE INDEX idx_scam_reports_location ON scam_reports(location_lat, location_lng);

CREATE INDEX idx_threat_alerts_user_id ON threat_alerts(user_id);
CREATE INDEX idx_threat_alerts_type ON threat_alerts(type);
CREATE INDEX idx_threat_alerts_severity ON threat_alerts(severity);
CREATE INDEX idx_threat_alerts_status ON threat_alerts(status);
CREATE INDEX idx_threat_alerts_created_at ON threat_alerts(created_at);

CREATE INDEX idx_transactions_upi_id ON transactions(upi_id);
CREATE INDEX idx_transactions_user_id ON transactions(user_id);
CREATE INDEX idx_transactions_status ON transactions(status);

CREATE INDEX idx_flagged_entities_type ON flagged_entities(type);
CREATE INDEX idx_flagged_entities_value ON flagged_entities(value);
CREATE INDEX idx_flagged_entities_risk ON flagged_entities(risk_score);
CREATE INDEX idx_flagged_entities_status ON flagged_entities(status);

CREATE INDEX idx_entity_relationships_source ON entity_relationships(source_id);
CREATE INDEX idx_entity_relationships_target ON entity_relationships(target_id);

CREATE INDEX idx_risk_history_user_id ON risk_history(user_id);
CREATE INDEX idx_risk_history_created_at ON risk_history(created_at);

CREATE INDEX idx_admin_logs_admin_id ON admin_logs(admin_id);
CREATE INDEX idx_admin_logs_action ON admin_logs(action);
CREATE INDEX idx_admin_logs_created_at ON admin_logs(created_at);

CREATE INDEX idx_analytics_date ON analytics(date);
CREATE INDEX idx_analytics_metric ON analytics(metric_type, metric_name);

CREATE INDEX idx_notifications_user_id ON notifications(user_id);
CREATE INDEX idx_notifications_is_read ON notifications(is_read);
CREATE INDEX idx_notifications_created_at ON notifications(created_at);

-- Triggers for updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_family_members_updated_at BEFORE UPDATE ON family_members
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_scam_reports_updated_at BEFORE UPDATE ON scam_reports
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Views for common queries
CREATE VIEW user_risk_summary AS
SELECT 
    u.id,
    u.name,
    u.email,
    COUNT(DISTINCT ta.id) as total_alerts,
    COUNT(DISTINCT CASE WHEN ta.severity = 'critical' THEN ta.id END) as critical_alerts,
    AVG(rh.risk_score) as avg_risk_score
FROM users u
LEFT JOIN threat_alerts ta ON u.id = ta.user_id
LEFT JOIN risk_history rh ON u.id = rh.user_id
GROUP BY u.id, u.name, u.email;

CREATE VIEW daily_threat_stats AS
SELECT 
    DATE(created_at) as date,
    type,
    COUNT(*) as count,
    AVG(risk_score) as avg_risk_score
FROM threat_alerts
GROUP BY DATE(created_at), type;

-- Insert sample data (for development)
INSERT INTO users (email, password_hash, name, phone_number, role, is_verified) VALUES
('admin@aiscamshield.in', '$2b$12$...', 'Super Admin', '+91-99999-99999', 'superadmin', TRUE),
('user@example.com', '$2b$12$...', 'Test User', '+91-88888-88888', 'user', TRUE);
