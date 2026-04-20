-- ================= ENUM TYPES (PHASE 2) =================
CREATE TYPE post_status AS ENUM ('DRAFT','PENDING','PUBLISHED','SCHEDULED','ARCHIVED');
CREATE TYPE content_format_enum AS ENUM ('HTML','MARKDOWN');

-- ================= POSTS (PHASE 2) =================
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

-- ================= INDEXES (PHASE 2) =================
CREATE INDEX idx_posts_slug ON posts(slug);
CREATE INDEX idx_posts_status_published_at ON posts(status, published_at);
CREATE INDEX idx_posts_author_id ON posts(author_id);
CREATE INDEX idx_posts_created_at ON posts(created_at DESC);
