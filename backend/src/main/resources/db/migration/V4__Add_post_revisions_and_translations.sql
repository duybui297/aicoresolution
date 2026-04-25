-- ================= POST REVISIONS =================
CREATE TABLE post_revisions (
    id BIGSERIAL PRIMARY KEY,
    post_id BIGINT NOT NULL,
    title VARCHAR(255) NOT NULL,
    excerpt VARCHAR(500),
    content TEXT NOT NULL,
    meta_title VARCHAR(160),
    meta_description VARCHAR(300),
    change_note VARCHAR(500),
    edited_by BIGINT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_post_revisions_post FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE,
    CONSTRAINT fk_post_revisions_user FOREIGN KEY (edited_by) REFERENCES users(id) ON DELETE SET NULL
);

-- ================= POST TRANSLATIONS =================
CREATE TABLE post_translations (
    id BIGSERIAL PRIMARY KEY,
    post_id BIGINT NOT NULL,
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
    CONSTRAINT fk_post_translations_post FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE,
    UNIQUE (slug),
    UNIQUE (post_id, locale)
);

-- ================= INDEXES =================
CREATE INDEX idx_post_revisions_post_id ON post_revisions(post_id);
CREATE INDEX idx_post_translations_post_id ON post_translations(post_id);
CREATE INDEX idx_post_translations_slug ON post_translations(slug);
