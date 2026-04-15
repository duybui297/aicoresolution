-- ================= ENUM TYPES =================
CREATE TYPE user_role AS ENUM ('ADMIN','EDITOR','AUTHOR','CONTRIBUTOR');
CREATE TYPE user_status AS ENUM ('ACTIVE','INACTIVE','BANNED');

-- ================= USERS =================
CREATE TABLE users (
    id BIGSERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(150) NOT NULL,
    avatar_url VARCHAR(500),
    bio TEXT,
    social_links JSONB,
    role user_role DEFAULT 'CONTRIBUTOR',
    status user_status DEFAULT 'ACTIVE',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);