-- ============================================================
-- V7__Seed_categories.sql
-- Seed initial categories for news articles
-- ============================================================

INSERT INTO categories (id, name, slug, description, sort_order, is_active, created_at, updated_at) VALUES
-- Primary categories for news articles
(1, 'Tin Tức', 'tin-tuc', 'Tin tức và cập nhật mới nhất về AI', 1, true, NOW(), NOW()),
(2, 'AI Trends', 'ai-trends', 'Xu hướng và phát triển mới trong lĩnh vực AI', 2, true, NOW(), NOW()),
(3, 'Tech Tips', 'tech-tips', 'Mẹo và hướng dẫn công nghệ', 3, true, NOW(), NOW()),
(4, 'Company News', 'company-news', 'Tin tức về công ty', 4, true, NOW(), NOW()),
(5, 'Tutorials', 'tutorials', 'Hướng dẫn chi tiết về AI và công nghệ', 5, true, NOW(), NOW()),
(6, 'AI Ứng Dụng', 'ai-ung-dung', 'Ứng dụng thực tế của AI trong cuộc sống', 6, true, NOW(), NOW()),
(7, 'Machine Learning', 'machine-learning', 'Học máy và các thuật toán', 7, true, NOW(), NOW()),
(8, 'AI Tools', 'ai-tools', 'Công cụ và phần mềm AI', 8, true, NOW(), NOW()),
(9, 'Generative AI', 'generative-ai', 'AI tạo sinh và các mô hình ngôn ngữ lớn', 9, true, NOW(), NOW()),
(10, 'AI Research', 'ai-research', 'Nghiên cứu và phát triển AI', 10, true, NOW(), NOW());

-- Reset sequence to continue from 11
SELECT setval('categories_id_seq', 10, true);
