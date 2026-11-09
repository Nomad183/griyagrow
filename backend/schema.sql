-- Griya Grow Database Schema
-- Run this in PostgreSQL to create the required tables

-- Create database (run as postgres superuser)
-- CREATE DATABASE griya_melon_db;
-- CREATE USER gria_user WITH PASSWORD 'admin';
-- GRANT ALL PRIVILEGES ON DATABASE griya_melon_db TO gria_user;

-- Connect to the database first: \c griya_melon_db

-- Users table
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    phone VARCHAR(20) UNIQUE NOT NULL,
    role VARCHAR(20) NOT NULL CHECK (role IN ('customer', 'mitra', 'owner', 'staff')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Index for faster phone lookups
CREATE INDEX IF NOT EXISTS idx_users_phone ON users(phone);

-- Sample data for testing (optional)
-- INSERT INTO users (name, phone, role) VALUES
--   ('Test Customer', '628123456789', 'customer'),
--   ('Test Mitra', '628123456790', 'mitra'),
--   ('Test Owner', '628123456791', 'owner'),
--   ('Test Staff', '628123456792', 'staff')
-- ON CONFLICT (phone) DO NOTHING;