-- Initialize DTTools database
-- This file is executed when PostgreSQL container starts for the first time

-- Create extensions if needed
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create database user if not exists
DO
$do$
BEGIN
   IF NOT EXISTS (
      SELECT FROM pg_catalog.pg_roles
      WHERE  rolname = 'dttools') THEN

      CREATE ROLE dttools LOGIN PASSWORD 'dttools_password';
   END IF;
END
$do$;

-- Grant privileges
GRANT ALL PRIVILEGES ON DATABASE dttools TO dttools;

-- Set timezone
SET timezone = 'UTC';