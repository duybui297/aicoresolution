-- ============================================================
-- V8__Update_image_links.sql
-- Update placeholder image links with actual files from uploads
-- ============================================================

-- Update Categories (10 categories, using first 10 images)
UPDATE categories SET thumbnail_url = '/uploads/00d1f241-af87-4187-9ff5-2e667c06d1ff.jpg' WHERE slug = 'tri-tue-nhan-tao';
UPDATE categories SET thumbnail_url = '/uploads/021afe3e-9ca5-437c-8004-8ab8476ec474.jpeg' WHERE slug = 'machine-learning';
UPDATE categories SET thumbnail_url = '/uploads/0337c8b0-6aba-4f1b-a439-724082a638fa.jpeg' WHERE slug = 'deep-learning';
UPDATE categories SET thumbnail_url = '/uploads/05cb856a-3cbe-4f55-9865-e688cbb3054f.jpg' WHERE slug = 'xlngtu-nlp';
UPDATE categories SET thumbnail_url = '/uploads/609d116f-98a0-41d1-be12-85246ccfdfd7.jpg' WHERE slug = 'computer-vision';
UPDATE categories SET thumbnail_url = '/uploads/6850e426-8775-4919-9323-d0283e495afa.jpg' WHERE slug = 'ai-ung-dung';
UPDATE categories SET thumbnail_url = '/uploads/6a30f988-cf87-4d26-b4bb-ac2ac4f3e883.jpg' WHERE slug = 'ai-ethics';
UPDATE categories SET thumbnail_url = '/uploads/7cfe7281-40d4-41e0-ba91-cecb921c6fba.jpg' WHERE slug = 'ai-tools';
UPDATE categories SET thumbnail_url = '/uploads/89feaf8c-296d-4a6f-811d-b0581014a778.jpeg' WHERE slug = 'generative-ai';
UPDATE categories SET thumbnail_url = '/uploads/8de00bf0-8061-476a-97c3-7194db0fe560.jpg' WHERE slug = 'robotics';

-- Update Posts (Articles) using a MOD distribution to "randomize" images from the 20 available files
UPDATE posts
SET thumbnail_url = CASE (id % 20)
    WHEN 0 THEN '/uploads/00d1f241-af87-4187-9ff5-2e667c06d1ff.jpg'
    WHEN 1 THEN '/uploads/021afe3e-9ca5-437c-8004-8ab8476ec474.jpeg'
    WHEN 2 THEN '/uploads/0337c8b0-6aba-4f1b-a439-724082a638fa.jpeg'
    WHEN 3 THEN '/uploads/05cb856a-3cbe-4f55-9865-e688cbb3054f.jpg'
    WHEN 4 THEN '/uploads/609d116f-98a0-41d1-be12-85246ccfdfd7.jpg'
    WHEN 5 THEN '/uploads/6850e426-8775-4919-9323-d0283e495afa.jpg'
    WHEN 6 THEN '/uploads/6a30f988-cf87-4d26-b4bb-ac2ac4f3e883.jpg'
    WHEN 7 THEN '/uploads/7cfe7281-40d4-41e0-ba91-cecb921c6fba.jpg'
    WHEN 8 THEN '/uploads/89feaf8c-296d-4a6f-811d-b0581014a778.jpeg'
    WHEN 9 THEN '/uploads/8de00bf0-8061-476a-97c3-7194db0fe560.jpg'
    WHEN 10 THEN '/uploads/9571ec2a-4363-46ea-a5e0-1d1d9fd3e7d4.jpg'
    WHEN 11 THEN '/uploads/96d0dc26-e6c1-4197-ba7d-a5bbc76517e8.jpg'
    WHEN 12 THEN '/uploads/a0bfdb26-be0c-49b6-8fff-9f2e3a57981c.jpg'
    WHEN 13 THEN '/uploads/ada7aabe-ae2d-457b-bac6-b0c401e9c43e.png'
    WHEN 14 THEN '/uploads/ae26454c-5d67-49dd-829b-d5bac3ada90d.jpg'
    WHEN 15 THEN '/uploads/b8afe209-dc4f-4898-a2ca-7df668d76167.jpg'
    WHEN 16 THEN '/uploads/d4468a6d-3876-426e-be15-b10c1427f244.jpg'
    WHEN 17 THEN '/uploads/d62806de-b3a6-4bea-bed6-559c1f301841.jpg'
    WHEN 18 THEN '/uploads/e8d57be3-9d20-4d8a-ba09-b71466136567.jpg'
    WHEN 19 THEN '/uploads/fa0e007c-0dae-42b0-a93b-698c0661c422.jpeg'
END
WHERE thumbnail_url = '/uploads/image.png';
