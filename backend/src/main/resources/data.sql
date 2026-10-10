-- Initial Database Seed Data for PostgreSQL
-- Default password for all accounts: admin123

-- Admins
INSERT INTO admins (id, name, email, password_hash, role, created_at)
VALUES (101, 'System Admin', 'admin@college.edu', '$2b$10$4JEKFD8lBKIiW7iT2mtub.coD94Mh3RG8Mku4PI1SZC1zdlLlGXxe', 'ADMIN', CURRENT_TIMESTAMP)
ON CONFLICT (id) DO UPDATE SET password_hash = EXCLUDED.password_hash;

-- Guards
INSERT INTO guards (id, name, email, password_hash, role, created_at)
VALUES (102, 'Security Guard', 'guard@college.edu', '$2b$10$4JEKFD8lBKIiW7iT2mtub.coD94Mh3RG8Mku4PI1SZC1zdlLlGXxe', 'GUARD', CURRENT_TIMESTAMP)
ON CONFLICT (id) DO UPDATE SET password_hash = EXCLUDED.password_hash;

-- Hosts
INSERT INTO hosts (id, name, email, password_hash, role, created_at)
VALUES (103, 'Prof. John Host', 'host@college.edu', '$2b$10$4JEKFD8lBKIiW7iT2mtub.coD94Mh3RG8Mku4PI1SZC1zdlLlGXxe', 'HOST', CURRENT_TIMESTAMP)
ON CONFLICT (id) DO UPDATE SET password_hash = EXCLUDED.password_hash;

-- Visitors
INSERT INTO visitors (id, name, phone, id_proof_number, photo_url, created_at)
VALUES (101, 'Alice Smith', '9876543210', 'Aadhar-1234-5678', 'https://example.com/photos/alice.jpg', CURRENT_TIMESTAMP)
ON CONFLICT (id) DO NOTHING;

INSERT INTO visitors (id, name, phone, id_proof_number, photo_url, created_at)
VALUES (102, 'Bob Johnson', '9123456789', 'PAN-ABCDE1234F', 'https://example.com/photos/bob.jpg', CURRENT_TIMESTAMP)
ON CONFLICT (id) DO NOTHING;
