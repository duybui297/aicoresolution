-- =====================================================
-- V10__Add_post_english_fields.sql
-- Add English (_en) columns to posts table for
-- =====================================================

ALTER TABLE posts ADD COLUMN IF NOT EXISTS title_en VARCHAR(255);
ALTER TABLE posts ADD COLUMN IF NOT EXISTS excerpt_en VARCHAR(500);
ALTER TABLE posts ADD COLUMN IF NOT EXISTS content_en TEXT;
ALTER TABLE posts ADD COLUMN IF NOT EXISTS thumbnail_alt_en VARCHAR(300);

-- =====================================================
-- MIGRATION RESULT:
-- + title_en         : English version of the headline
-- + excerpt_en       : English version of the excerpt
-- + content_en      : English version of the article body
-- + thumbnail_alt_en : English version of image caption
--
-- All columns are nullable. If only one language is
-- filled in, that language will be displayed.
-- =====================================================
