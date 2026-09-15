-- Initial Database Seed Data for PostgreSQL

-- Admins
INSERT INTO admins (id, name, email, password_hash, role, created_at) 
VALUES (101, 'System Admin', 'admin@college.edu', '$2a$10$TH8uchNrkGrEu8bYX3PN8uTg9f6j0jVWXKxhHMawww/EVBIgRbwX.', 'ADMIN', CURRENT_TIMESTAMP)
ON CONFLICT (id) DO NOTHING;

-- Guards
INSERT INTO guards (id, name, email, password_hash, role, created_at) 
VALUES (102, 'Security Guard', 'guard@college.edu', '$2a$10$TH8uchNrkGrEu8bYX3PN8uTg9f6j0jVWXKxhHMawww/EVBIgRbwX.', 'GUARD', CURRENT_TIMESTAMP)
ON CONFLICT (id) DO NOTHING;

-- Hosts
INSERT INTO hosts (id, name, email, password_hash, role, created_at) 
VALUES (103, 'Prof. John Host', 'host@college.edu', '$2a$10$TH8uchNrkGrEu8bYX3PN8uTg9f6j0jVWXKxhHMawww/EVBIgRbwX.', 'HOST', CURRENT_TIMESTAMP)
ON CONFLICT (id) DO NOTHING;

-- Visitors
INSERT INTO visitors (id, name, phone, id_proof_number, photo_url, created_at) 
VALUES (101, 'Alice Smith', '9876543210', 'Aadhar-1234-5678', 'https://example.com/photos/alice.jpg', CURRENT_TIMESTAMP)
ON CONFLICT (id) DO NOTHING;

INSERT INTO visitors (id, name, phone, id_proof_number, photo_url, created_at) 
VALUES (102, 'Bob Johnson', '9123456789', 'PAN-ABCDE1234F', 'https://example.com/photos/bob.jpg', CURRENT_TIMESTAMP)
ON CONFLICT (id) DO NOTHING;
