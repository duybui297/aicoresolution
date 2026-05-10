-- V12__Fix_image_paths_no_images_subfolder.sql
-- Fix image paths by changing /uploads/images/ to /uploads/ for the 5 seeded landing articles

-- 1. Update main posts table (thumbnails and content)
UPDATE posts 
SET 
    thumbnail_url = REPLACE(thumbnail_url, '/uploads/images/', '/uploads/'),
    content = REPLACE(content, '/uploads/images/', '/uploads/')
WHERE slug IN (
    'openclaw-va-khoanh-khac-ai-vuot-qua-ranh-gioi-kiem-soat',
    'ai-trong-thoi-dai-it-lieu-co-con-can-hoc-lap-trinh',
    'ai-khien-viec-build-tro-nen-re-va-do-moi-la-van-de',
    'token-trong-ai-hieu-ve-tien-te-cua-tri-tue-nhan-tao',
    'huong-dan-su-dung-ai-antigravity'
);

-- 2. Update post_translations table (content)
UPDATE post_translations
SET 
    content = REPLACE(content, '/uploads/images/', '/uploads/')
WHERE post_id IN (
    SELECT id FROM posts WHERE slug IN (
        'openclaw-va-khoanh-khac-ai-vuot-qua-ranh-gioi-kiem-soat',
        'ai-trong-thoi-dai-it-lieu-co-con-can-hoc-lap-trinh',
        'ai-khien-viec-build-tro-nen-re-va-do-moi-la-van-de',
        'token-trong-ai-hieu-ve-tien-te-cua-tri-tue-nhan-tao',
        'huong-dan-su-dung-ai-antigravity'
    )
);
