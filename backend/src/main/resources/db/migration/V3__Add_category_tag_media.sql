-- ================= ENUM TYPES (PHASE 3) =================
CREATE TYPE media_role AS ENUM ('CONTENT','GALLERY','ATTACHMENT');

-- ================= CATEGORIES =================
CREATE TABLE categories (
    id BIGSERIAL PRIMARY KEY,
    parent_id BIGINT REFERENCES categories(id) ON DELETE RESTRICT,
    name VARCHAR(150) NOT NULL,
    slug VARCHAR(200) UNIQUE NOT NULL,
    description TEXT,
    thumbnail_url VARCHAR(500),
    meta_title VARCHAR(160),
    meta_description VARCHAR(300),
    canonical_url VARCHAR(500),
    og_image VARCHAR(500),
    robots_meta VARCHAR(50) DEFAULT 'index,follow',
    sort_order INT DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_categories_slug ON categories(slug);
CREATE INDEX idx_categories_parent_id ON categories(parent_id);

-- ================= TAGS =================
CREATE TABLE tags (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    slug VARCHAR(120) UNIQUE NOT NULL,
    description VARCHAR(500),
    meta_title VARCHAR(160),
    meta_description VARCHAR(300),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_tags_slug ON tags(slug);

-- ================= MEDIA =================
CREATE TABLE media (
    id BIGSERIAL PRIMARY KEY,
    file_url VARCHAR(500) NOT NULL,
    file_name VARCHAR(255) NOT NULL,
    mime_type VARCHAR(100) NOT NULL,
    file_size BIGINT,
    width INT,
    height INT,
    alt_text VARCHAR(300),
    caption VARCHAR(500),
    title_attr VARCHAR(300),
    uploaded_by BIGINT REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_media_file_url ON media(file_url);
CREATE INDEX idx_media_uploaded_by ON media(uploaded_by);

-- ================= PIVOT TABLES (PHASE 3) =================
CREATE TABLE post_categories (
    post_id BIGINT REFERENCES posts(id) ON DELETE CASCADE,
    category_id BIGINT REFERENCES categories(id) ON DELETE CASCADE,
    is_primary BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (post_id, category_id)
);

CREATE TABLE post_tags (
    post_id BIGINT REFERENCES posts(id) ON DELETE CASCADE,
    tag_id BIGINT REFERENCES tags(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (post_id, tag_id)
);

CREATE TABLE post_media (
    post_id BIGINT REFERENCES posts(id) ON DELETE CASCADE,
    media_id BIGINT REFERENCES media(id) ON DELETE CASCADE,
    sort_order INT DEFAULT 0,
    role media_role DEFAULT 'CONTENT',
    PRIMARY KEY (post_id, media_id)
);
