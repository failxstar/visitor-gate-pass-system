-- Initial Database Seed Data
INSERT IGNORE INTO users (name, email, password_hash, role, created_at) VALUES 
('System Admin', 'admin@college.edu', '$2a$10$wN31n2xH1Q4g8gL1f4m9uO3gQ7g2x1v4m8u2N31n2xH1Q4g8gL1f4', 'ADMIN', CURRENT_TIMESTAMP),
('Security Guard', 'guard@college.edu', '$2a$10$wN31n2xH1Q4g8gL1f4m9uO3gQ7g2x1v4m8u2N31n2xH1Q4g8gL1f4', 'GUARD', CURRENT_TIMESTAMP),
('Prof. John Host', 'host@college.edu', '$2a$10$wN31n2xH1Q4g8gL1f4m9uO3gQ7g2x1v4m8u2N31n2xH1Q4g8gL1f4', 'HOST', CURRENT_TIMESTAMP);

INSERT IGNORE INTO visitors (name, phone, id_proof_number, photo_url, created_at) VALUES 
('Alice Smith', '9876543210', 'Aadhar-1234-5678', 'https://example.com/photos/alice.jpg', CURRENT_TIMESTAMP),
('Bob Johnson', '9123456789', 'PAN-ABCDE1234F', 'https://example.com/photos/bob.jpg', CURRENT_TIMESTAMP);

