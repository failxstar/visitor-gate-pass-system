-- Initial Database Seed Data
INSERT IGNORE INTO users (name, email, password_hash, role, created_at) VALUES 
('System Admin', 'admin@college.edu', '$2a$10$TH8uchNrkGrEu8bYX3PN8uTg9f6j0jVWXKxhHMawww/EVBIgRbwX.', 'ADMIN', CURRENT_TIMESTAMP),
('Security Guard', 'guard@college.edu', '$2a$10$TH8uchNrkGrEu8bYX3PN8uTg9f6j0jVWXKxhHMawww/EVBIgRbwX.', 'GUARD', CURRENT_TIMESTAMP),
('Prof. John Host', 'host@college.edu', '$2a$10$TH8uchNrkGrEu8bYX3PN8uTg9f6j0jVWXKxhHMawww/EVBIgRbwX.', 'HOST', CURRENT_TIMESTAMP);

UPDATE users SET password_hash = '$2a$10$TH8uchNrkGrEu8bYX3PN8uTg9f6j0jVWXKxhHMawww/EVBIgRbwX.' WHERE email IN ('admin@college.edu', 'guard@college.edu', 'host@college.edu');

INSERT IGNORE INTO visitors (name, phone, id_proof_number, photo_url, created_at) VALUES 
('Alice Smith', '9876543210', 'Aadhar-1234-5678', 'https://example.com/photos/alice.jpg', CURRENT_TIMESTAMP),
('Bob Johnson', '9123456789', 'PAN-ABCDE1234F', 'https://example.com/photos/bob.jpg', CURRENT_TIMESTAMP);

