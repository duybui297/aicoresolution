-- ================= ENUM TYPES (PHASE 5) =================
CREATE TYPE post_author_role AS ENUM ('AUTHOR','CO_AUTHOR','REVIEWER','TRANSLATOR');

-- ================= REDIRECTS =================
CREATE TABLE redirects (
    id BIGSERIAL PRIMARY KEY,
    from_path VARCHAR(500) UNIQUE NOT NULL,
    to_path VARCHAR(500) NOT NULL,
    status_code SMALLINT DEFAULT 301,
    hit_count BIGINT DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    note VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ================= POST AUTHORS (Intermediate Table) =================
CREATE TABLE post_authors (
    post_id BIGINT REFERENCES posts(id) ON DELETE CASCADE,
    user_id BIGINT REFERENCES users(id) ON DELETE CASCADE,
    role post_author_role DEFAULT 'CO_AUTHOR',
    sort_order INT DEFAULT 0,
    PRIMARY KEY (post_id, user_id)
);

-- ================= INDEXES =================
CREATE INDEX idx_redirects_from_path ON redirects(from_path);
CREATE INDEX idx_post_authors_post_id ON post_authors(post_id);
CREATE INDEX idx_post_authors_user_id ON post_authors(user_id);
