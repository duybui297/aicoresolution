-- ================= ENUM TYPES =================
CREATE TYPE user_role AS ENUM ('ADMIN','EDITOR','AUTHOR','CONTRIBUTOR');
CREATE TYPE user_status AS ENUM ('ACTIVE','INACTIVE','BANNED');
CREATE TYPE post_status AS ENUM ('DRAFT','PENDING','PUBLISHED','SCHEDULED','ARCHIVED');
CREATE TYPE content_format_enum AS ENUM ('HTML','MARKDOWN');
CREATE TYPE media_role AS ENUM ('CONTENT','GALLERY','ATTACHMENT');
CREATE TYPE post_author_role AS ENUM ('AUTHOR','CO_AUTHOR','REVIEWER','TRANSLATOR');

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
    role user_role DEFAULT 'AUTHOR',
    status user_status DEFAULT 'ACTIVE',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ================= CATEGORIES =================
CREATE TABLE categories (
    id BIGSERIAL PRIMARY KEY,
    parent_id BIGINT REFERENCES categories(id),
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

-- ================= POSTS =================
CREATE TABLE posts (
    id BIGSERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL,
    excerpt VARCHAR(500),
    content TEXT NOT NULL,
    content_format content_format_enum DEFAULT 'HTML',
    thumbnail_url VARCHAR(500),
    thumbnail_alt VARCHAR(300),
    status post_status DEFAULT 'DRAFT',
    published_at TIMESTAMP,
    scheduled_at TIMESTAMP,
    meta_title VARCHAR(160),
    meta_description VARCHAR(300),
    meta_keywords VARCHAR(500),
    canonical_url VARCHAR(500),
    robots_meta VARCHAR(50) DEFAULT 'index,follow',
    og_title VARCHAR(200),
    og_description VARCHAR(500),
    og_image VARCHAR(500),
    og_type VARCHAR(50) DEFAULT 'article',
    twitter_card VARCHAR(50) DEFAULT 'summary_large_image',
    twitter_title VARCHAR(200),
    twitter_description VARCHAR(500),
    twitter_image VARCHAR(500),
    schema_type VARCHAR(50) DEFAULT 'NewsArticle',
    schema_json JSONB,
    locale VARCHAR(10) DEFAULT 'vi-VN',
    reading_time INT,
    word_count INT,
    view_count BIGINT DEFAULT 0,
    comment_count INT DEFAULT 0,
    featured BOOLEAN DEFAULT FALSE,
    allow_comments BOOLEAN DEFAULT TRUE,
    author_id BIGINT NOT NULL REFERENCES users(id),
    created_by BIGINT REFERENCES users(id),
    updated_by BIGINT REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP,
    UNIQUE (slug, locale)
);

-- ================= PIVOT TABLES =================
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

CREATE TABLE post_authors (
    post_id BIGINT REFERENCES posts(id) ON DELETE CASCADE,
    user_id BIGINT REFERENCES users(id) ON DELETE CASCADE,
    role post_author_role DEFAULT 'CO_AUTHOR',
    sort_order INT DEFAULT 0,
    PRIMARY KEY (post_id, user_id)
);

-- ================= REVISIONS =================
CREATE TABLE post_revisions (
    id BIGSERIAL PRIMARY KEY,
    post_id BIGINT NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    excerpt VARCHAR(500),
    content TEXT NOT NULL,
    meta_title VARCHAR(160),
    meta_description VARCHAR(300),
    change_note VARCHAR(500),
    edited_by BIGINT REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

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

-- ================= TRANSLATIONS =================
CREATE TABLE post_translations (
    id BIGSERIAL PRIMARY KEY,
    post_id BIGINT NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
    locale VARCHAR(10) NOT NULL,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL,
    excerpt VARCHAR(500),
    content TEXT NOT NULL,
    meta_title VARCHAR(160),
    meta_description VARCHAR(300),
    og_title VARCHAR(200),
    og_description VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (slug, locale)
);

-- ================= INDEXES =================
CREATE INDEX idx_posts_slug ON posts(slug);
CREATE INDEX idx_posts_status_published_at ON posts(status, published_at);
CREATE INDEX idx_categories_slug ON categories(slug);
CREATE INDEX idx_tags_slug ON tags(slug);
CREATE INDEX idx_media_file_url ON media(file_url);