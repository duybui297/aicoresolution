-- ============================================================
-- V7__Seed_ai_articles.sql
-- Seed 50 AI Core Resolution articles
-- ============================================================

-- ============================================================
-- CATEGORIES
-- ============================================================
INSERT INTO categories (name, slug, description, thumbnail_url, sort_order, is_active, created_at, updated_at) VALUES
('Trí Tuệ Nhân Tạo', 'tri-tue-nhan-tao', 'Tổng hợp kiến thức về trí tuệ nhân tạo, AI tổng quát và các xu hướng phát triển', '/uploads/image.png', 1, true, NOW(), NOW()),
('Machine Learning', 'machine-learning', 'Học máy, thuật toán học tập và ứng dụng trong thực tế', '/uploads/image.png', 2, true, NOW(), NOW()),
('Deep Learning', 'deep-learning', 'Mạng nơ-ron sâu, các kiến trúc hiện đại và huấn luyện mô hình', '/uploads/image.png', 3, true, NOW(), NOW()),
('Xử Lý Ngôn Ngữ Tự Nhiên', 'xlngtu-nlp', 'NLP, Chatbot, dịch thuật và hiểu ngôn ngữ tự nhiên bằng AI', '/uploads/image.png', 4, true, NOW(), NOW()),
('Computer Vision', 'computer-vision', 'Thị giác máy tính, nhận diện hình ảnh và video bằng AI', '/uploads/image.png', 5, true, NOW(), NOW()),
('AI Ứng Dụng', 'ai-ung-dung', 'Ứng dụng AI trong y tế, tài chính, giáo dục và các ngành khác', '/uploads/image.png', 6, true, NOW(), NOW()),
('AI Ethics', 'ai-ethics', 'Đạo đức AI, trách nhiệm xã hội và các vấn đề pháp lý', '/uploads/image.png', 7, true, NOW(), NOW()),
('AI Tools', 'ai-tools', 'Công cụ, framework và nền tảng phát triển AI', '/uploads/image.png', 8, true, NOW(), NOW()),
('Generative AI', 'generative-ai', 'AI sinh tạo, GANs, Diffusion Models và nội dung sáng tạo', '/uploads/image.png', 9, true, NOW(), NOW()),
('Robotics', 'robotics', 'Robot tự hành, điều khiển và ứng dụng tự động hóa', '/uploads/image.png', 10, true, NOW(), NOW());

-- ============================================================
-- TAGS
-- ============================================================
INSERT INTO tags (name, slug, description, created_at) VALUES
('AI', 'ai', 'Trí tuệ nhân tạo tổng quát', NOW()),
('Machine Learning', 'machine-learning', 'Học máy', NOW()),
('Deep Learning', 'deep-learning', 'Học sâu', NOW()),
('Neural Network', 'neural-network', 'Mạng nơ-ron', NOW()),
('Transformer', 'transformer', 'Kiến trúc Transformer', NOW()),
('GPT', 'gpt', 'GPT models', NOW()),
('NLP', 'nlp', 'Xử lý ngôn ngữ tự nhiên', NOW()),
('Computer Vision', 'computer-vision', 'Thị giác máy tính', NOW()),
('GAN', 'gan', 'Generative Adversarial Networks', NOW()),
('Diffusion Model', 'diffusion-model', 'Diffusion Models', NOW()),
('Reinforcement Learning', 'reinforcement-learning', 'Học tăng cường', NOW()),
('Agent AI', 'agent-ai', 'AI tác tử', NOW()),
('AI Ethics', 'ai-ethics', 'Đạo đức AI', NOW()),
('OpenAI', 'openai', 'OpenAI', NOW()),
('Google AI', 'google-ai', 'Google AI', NOW()),
('Anthropic', 'anthropic', 'Anthropic Claude', NOW()),
('Llama', 'llama', 'Meta Llama', NOW()),
('RAG', 'rag', 'Retrieval-Augmented Generation', NOW()),
('Fine-tuning', 'fine-tuning', 'Tinh chỉnh mô hình', NOW()),
('AI Agent', 'ai-agent', 'AI Agent', NOW()),
('Multimodal', 'multimodal', 'Đa phương thức', NOW()),
('LLM', 'llm', 'Large Language Models', NOW()),
('AI Safety', 'ai-safety', 'An toàn AI', NOW()),
('Automation', 'automation', 'Tự động hóa', NOW()),
('Edge AI', 'edge-ai', 'AI cạnh', NOW());

-- ============================================================
-- POSTS (50 articles)
-- ============================================================
INSERT INTO posts (title, slug, excerpt, content, content_format, thumbnail_url, thumbnail_alt, status, published_at, meta_title, meta_description, meta_keywords, locale, reading_time, word_count, view_count, comment_count, featured, allow_comments, author_id, created_at, updated_at) VALUES

-- 1
('Giới Thiệu Trí Tuệ Nhân Tạo: Từ Khái Niệm Đến Tương Lai', 'gioi-thieu-tri-tue-nhan-tao',
'Trí tuệ nhân tạo (AI) đang thay đổi cách chúng ta sống và làm việc. Bài viết này sẽ đưa bạn đi từ những khái niệm cơ bản nhất đến tầm nhìn về tương lai của AI.',
'<h2>Trí Tuệ Nhân Tạo Là Gì?</h2><p>Trí tuệ nhân tạo (Artificial Intelligence - AI) là một nhánh của khoa học máy tính, tập trung vào việc xây dựng các hệ thống có khả năng thực hiện các tác vụ đòi hỏi trí thông minh của con người. Các tác vụ này bao gồm nhận dạng giọng nói, ra quyết định, phân tích dữ liệu và sáng tạo nội dung.</p><h2>Lịch Sử Phát Triển AI</h2><p>AI bắt đầu từ những năm 1950 với Alan Turing và câu hỏi nổi tiếng "Máy móc có thể suy nghĩ không?". Qua nhiều thập kỷ, AI đã trải qua các mùa đông AI (AI Winters) và sự bùng nổ với Deep Learning từ năm 2012.</p><h2>Phân Loại AI</h2><ul><li><strong>ANI (Artificial Narrow Intelligence)</strong>: AI hẹp, giỏi một việc cụ thể</li><li><strong>AGI (Artificial General Intelligence)</strong>: AI tổng quát, có khả năng như con người</li><li><strong>ASI (Artificial Super Intelligence)</strong>: Siêu trí tuệ, vượt trội hơn con người</li></ul><h2>Xu Hướng AI 2025-2026</h2><p>Các xu hướng nổi bật bao gồm: Agentic AI, Multimodal Models, AI Safety, Edge AI, và AI in Healthcare. Các công ty lớn như OpenAI, Google, Anthropic đang dẫn đầu cuộc đua phát triển AGI.</p>',
'HTML', '/uploads/image.png', 'Giới thiệu Trí Tuệ Nhân Tạo', 'PUBLISHED', NOW() - INTERVAL '30 days',
'Giới Thiệu Trí Tuệ Nhân Tạo: Khái Niệm, Lịch Sử và Tương Lai AI',
'Bài viết giới thiệu toàn diện về trí tuệ nhân tạo từ khái niệm cơ bản đến các xu hướng AI tương lai. Phù hợp cho người mới bắt đầu.',
'trí tuệ nhân tạo, AI là gì, giới thiệu AI, machine learning, deep learning', 'vi-VN', 8, 1800, 4523, 42, true, true, 1, NOW() - INTERVAL '30 days', NOW()),

-- 2
('Machine Learning Cơ Bản: Hướng Dẫn Toàn Diện Cho Người Mới', 'machine-learning-co-ban',
'Machine Learning (Học máy) là nền tảng của AI hiện đại. Bài viết này giải thích các loại ML, thuật toán cốt lõi và cách bắt đầu học ML.',
'<h2>Machine Learning Là Gì?</h2><p>Machine Learning (ML) là tập con của AI, cho phép máy tính học từ dữ liệu mà không cần lập trình tường minh. Thay vì viết code cứng để giải quyết vấn đề, ML cho phép hệ thống tự tìm ra pattern trong dữ liệu.</p><h2>Các Loại Machine Learning</h2><h3>1. Supervised Learning (Học có giám sát)</h3><p>Thuật toán học từ dữ liệu đã được gắn nhãn. Ví dụ: phân loại email spam, dự đoán giá nhà. Các thuật toán phổ biến: Linear Regression, Logistic Regression, SVM, Decision Trees.</p><h3>2. Unsupervised Learning (Học không giám sát)</h3><p>Thuật toán tìm pattern trong dữ liệu không có nhãn. Ví dụ: phân cụm khách hàng, giảm chiều dữ liệu. Thuật toán: K-Means, DBSCAN, PCA.</p><h3>3. Reinforcement Learning (Học tăng cường)</h3><p>Agent học cách đưa ra quyết định thông qua tương tác với môi trường, nhận phần thưởng hoặc phạt. Ứng dụng: Game AI, Robotics, Autonomous Driving.</p><h2>Các Bước Xây Dựng Mô Hình ML</h2><ol><li>Thu thập và làm sạch dữ liệu</li><li>Phân tích khám phá dữ liệu (EDA)</li><li>Tiền xử lý dữ liệu</li><li>Chọn đặc trưng (Feature Engineering)</li><li>Huấn luyện mô hình</li><li>Đánh giá và tinh chỉnh</li><li>Triển khai (Deployment)</li></ol>',
'HTML', '/uploads/image.png', 'Machine Learning Cơ Bản', 'PUBLISHED', NOW() - INTERVAL '28 days',
'Machine Learning Cơ Bản: Hướng Dẫn Toàn Diện Cho Người Mới Bắt Đầu',
'Giải thích chi tiết về Machine Learning, các loại ML, thuật toán cốt lõi và quy trình xây dựng mô hình ML từ đầu.',
'machine learning là gì, supervised learning, unsupervised learning, thuật toán ML', 'vi-VN', 10, 2200, 3891, 38, true, true, 1, NOW() - INTERVAL '28 days', NOW()),

-- 3
('Deep Learning: Mạng Nơ-ron Sâu và Cuộc Cách Mạng AI', 'deep-learning-mang-no-ron-sau',
'Deep Learning đã tạo ra cuộc cách mạng trong AI với khả năng học representations phức tạp từ dữ liệu. Tìm hiểu về neural networks và các kiến trúc hiện đại.',
'<h2>Deep Learning Là Gì?</h2><p>Deep Learning là tập con của Machine Learning, sử dụng các mạng nơ-ron nhân tạo với nhiều lớp (layers) để học các đặc trưng (features) từ dữ liệu ở nhiều mức trừu tượng khác nhau.</p><h2>Cấu Trúc Mạng Nơ-ron</h2><p>Một mạng nơ-ron cơ bản gồm: Input Layer → Hidden Layers → Output Layer. Mỗi layer chứa các neurons (nút) kết nối với các neurons ở layer tiếp theo thông qua weights (trọng số).</p><h2>Các Kiến Trúc Deep Learning Quan Trọng</h2><ul><li><strong>CNN (Convolutional Neural Network)</strong>: Xử lý hình ảnh, video</li><li><strong>RNN/LSTM/GRU</strong>: Xử lý dữ liệu tuần tự, time series</li><li><strong>Transformer</strong>: Xử lý ngôn ngữ tự nhiên, sequence modeling</li><li><strong>GAN (Generative Adversarial Network)</strong>: Sinh dữ liệu mới</li><li><strong>Autoencoder</strong>: Giảm chiều, khôi phục dữ liệu</li></ul><h2>Ứng Dụng Nổi Bật</h2><p>Deep Learning được sử dụng rộng rãi trong: nhận diện khuôn mặt (FaceID), xe tự lái (Tesla, Waymo), dịch thuật tự động (Google Translate), chẩn đoán hình ảnh y tế, và các mô hình ngôn ngữ lớn (GPT-4, Claude, Gemini).</p>',
'HTML', '/uploads/image.png', 'Deep Learning Neural Networks', 'PUBLISHED', NOW() - INTERVAL '25 days',
'Deep Learning: Mạng Nơ-ron Sâu và Các Kiến Trúc Hiện Đại',
'Khám phá Deep Learning, mạng nơ-ron sâu, các kiến trúc CNN, RNN, Transformer và ứng dụng thực tế của deep learning.',
'deep learning là gì, neural network, CNN, RNN, transformer, mạng nơ-ron', 'vi-VN', 12, 2600, 3156, 29, false, true, 1, NOW() - INTERVAL '25 days', NOW()),

-- 4
('Transformer Architecture: Nền Tảng Của ChatGPT và Các LLM Hiện Đại', 'transformer-architecture-gpt-llm',
'Kiến trúc Transformer đã cách mạng hóa NLP và là nền tảng của ChatGPT, BERT và hầu hết các LLM hiện đại. Tìm hiểu chi tiết về Self-Attention, Positional Encoding.',
'<h2>Giới Thiệu Transformer</h2><p>Transformer được giới thiệu trong paper "Attention Is All You Need" (2017) của Google. Đây là kiến trúc đầu tiên loại bỏ hoàn toàn recurrence (RNN) và chỉ sử dụng cơ chế Attention.</p><h2>Self-Attention Mechanism</h2><p>Self-Attention cho phép mỗi token trong sequence "chú ý" đến tất cả các tokens khác để hiểu mối quan hệ giữa chúng. Công thức: Attention(Q, K, V) = softmax(QK^T/√d_k)V</p><h2>Cấu Trúc Transformer</h2><ul><li><strong>Encoder</strong>: Mã hóa input sequence thành representation</li><li><strong>Decoder</strong>: Sinh output sequence từ representation</li><li><strong>Positional Encoding</strong>: Thêm thông tin vị trí vào tokens</li><li><strong>Multi-Head Attention</strong>: Nhiều attention heads hoạt động song song</li><li><strong>Feed-Forward Network</strong>: Xử lý mỗi position độc lập</li></ul><h2>Các Biến Thể Transformer</h2><p>BERT (Bidirectional Encoder), GPT (Generative Pre-trained Transformer), T5, ViT (Vision Transformer), SWIN Transformer, và nhiều kiến trúc khác đã được phát triển từ nền tảng Transformer.</p><h2>Đào Tạo LLM</h2><p>Quá trình đào tạo LLM gồm: Pre-training (học ngôn ngữ từ text corpora), Fine-tuning (tinh chỉnh cho task cụ thể), RLHF (Human Feedback). Các LLM phổ biến: GPT-4, Claude 3, Gemini Pro, Llama 3.</p>',
'HTML', '/uploads/image.png', 'Transformer Architecture', 'PUBLISHED', NOW() - INTERVAL '22 days',
'Transformer Architecture: Self-Attention, BERT, GPT và Nền Tảng Của LLM Hiện Đại',
'Giải thích chi tiết kiến trúc Transformer, cơ chế Self-Attention, Positional Encoding và các LLM hiện đại như GPT, BERT.',
'transformer architecture, self-attention, GPT, BERT, LLM, attention mechanism', 'vi-VN', 15, 3200, 4872, 51, true, true, 1, NOW() - INTERVAL '22 days', NOW()),

-- 5
('Natural Language Processing: Hướng Dẫn Toàn Diện Về NLP', 'natural-language-processing-nlp',
'NLP cho phép máy tính hiểu, diễn giải và sinh ra ngôn ngữ con người. Tìm hiểu các kỹ thuật NLP từ cơ bản đến hiện đại với Transformers.',
'<h2>NLP Là Gì?</h2><p>Natural Language Processing (NLP) là lĩnh vực AI tập trung vào tương tác giữa máy tính và ngôn ngữ con người. NLP kết hợp Computational Linguistics, Machine Learning và Deep Learning.</p><h2>Các Task Cơ Bản Trong NLP</h2><ul><li><strong>Text Classification</strong>: Phân loại văn bản (spam detection, sentiment analysis)</li><li><strong>Named Entity Recognition (NER)</strong>: Nhận diện thực thể trong văn bản</li><li><strong>Machine Translation</strong>: Dịch thuật tự động</li><li><strong>Question Answering</strong>: Trả lời câu hỏi</li><li><strong>Text Summarization</strong>: Tóm tắt văn bản</li><li><strong>Sentiment Analysis</strong>: Phân tích cảm xúc</li></ul><h2>Từ Traditional ML Đến Transformers</h2><p>Word2Vec, GloVe → ELMo → BERT, GPT → GPT-4, Claude, Gemini. Mỗi bước tiến đều cải thiện đáng kể khả năng hiểu ngôn ngữ của máy.</p><h2>Công Cụ và Thư Viện NLP</h2><p>Hugging Face Transformers, spaCy, NLTK, Stanford NLP, Hugging Face Tokenizers, LangChain đang được sử dụng rộng rãi trong cộng đồng NLP.</p>',
'HTML', '/uploads/image.png', 'Natural Language Processing', 'PUBLISHED', NOW() - INTERVAL '20 days',
'Natural Language Processing Toàn Diện: Từ NLP Cơ Bản Đến Transformers và LLM',
'Hướng dẫn chi tiết về NLP, các task, kỹ thuật từ Word2Vec đến Transformers và cách xây dựng ứng dụng NLP.',
'natural language processing, NLP là gì, sentiment analysis, NER, text classification, BERT, GPT', 'vi-VN', 14, 3000, 3784, 35, false, true, 1, NOW() - INTERVAL '20 days', NOW()),

-- 6
('Computer Vision: Thị Giác Máy Tính Trong Kỷ Nguyên AI', 'computer-vision-thi-giac-may-tinh',
'Computer Vision cho phép máy "nhìn" và hiểu hình ảnh/video như con người. Khám phá các kỹ thuật từ CNN đến Vision Transformers.',
'<h2>Computer Vision Là Gì?</h2><p>Computer Vision là lĩnh vực cho phép máy tính hiểu và phân tích thông tin từ hình ảnh và video. Từ nhận diện khuôn mặt đến phát hiện bệnh trong X-quang, CV đang thay đổi mọi ngành.</p><h2>Các Task Trong Computer Vision</h2><ul><li><strong>Image Classification</strong>: Phân loại toàn bộ hình ảnh</li><li><strong>Object Detection</strong>: Phát hiện và định vị objects</li><li><strong>Semantic Segmentation</strong>: Phân đoạn theo ngữ nghĩa</li><li><strong>Instance Segmentation</strong>: Phân đoạn từng instance riêng biệt</li><li><strong>Pose Estimation</strong>: Ước lượng tư thế con người</li><li><strong>Face Recognition</strong>: Nhận diện khuôn mặt</li></ul><h2>Từ AlexNet Đến Vision Transformer</h2><p>AlexNet (2012) khởi đầu Deep Learning trong CV → ResNet, VGG, Inception → YOLO, SSD → ViT, SWIN → CLIP, DINO. Mỗi bước đều mở ra khả năng mới.</p><h2>Ứng Dụng Thực Tế</h2><p>Autonomous vehicles (Tesla Autopilot, Waymo), Medical imaging, Surveillance systems, Augmented Reality, Quality control in manufacturing, Document scanning (Google Lens).</p>',
'HTML', '/uploads/image.png', 'Computer Vision AI', 'PUBLISHED', NOW() - INTERVAL '18 days',
'Computer Vision Toàn Diện: Thị Giác Máy Tính Từ CNN Đến Vision Transformer',
'Tìm hiểu Computer Vision, các task, kiến trúc CNN/ViT và ứng dụng thực tế trong y tế, tự động hóa và nhiều ngành khác.',
'computer vision là gì, thị giác máy tính, CNN, ViT, object detection, image classification', 'vi-VN', 13, 2800, 2956, 27, false, true, 1, NOW() - INTERVAL '18 days', NOW()),

-- 7
('GPT-4 và ChatGPT: Cách Mạng Hóa Giao Tiếp Người-Máy', 'gpt-4-chatgpt-revolution',
'ChatGPT đã thu hút 100 triệu người dùng trong 2 tháng. Tìm hiểu GPT-4, cách hoạt động và tác động của nó đến xã hội và công việc.',
'<h2>ChatGPT: Hiện Tượng Toàn Cầu</h2><p>ChatGPT của OpenAI ra mắt tháng 11/2022 và đạt 100 triệu người dùng trong thời gian kỷ lục. Đây là ứng dụng consumer có tốc độ tăng trưởng nhanh nhất trong lịch sử.</p><h2>GPT-4: Bước Tiến Vượt Bậc</h2><p>GPT-4 được phát hành tháng 3/2023 với khả năng vượt trội: xử lý hình ảnh, sáng tạo văn bản dài 25,000 từ, vượt qua nhiều kỳ thi chuyên ngành (Bar Exam, LSAT, SAT).</p><h2>Cách Hoạt Động</h2><p>GPT-4 sử dụng kiến trúc Transformer với hơn 1.76 nghìn tỷ tham số. Được pre-train trên internet scale data và fine-tune bằng RLHF để align với human preferences.</p><h2>Tác Động Đến Công Việc</h2><p>AI đang thay đổi cách làm việc trong: Software Development (GitHub Copilot), Content Creation, Customer Service, Legal Research, Medical Diagnosis, Education.</p><h2>Hạn Chế và Rủi Ro</h2><p>Hallucinations (tạo thông tin sai), knowledge cutoff, bias trong training data, potential for misuse là những thách thức cần giải quyết.</p>',
'HTML', '/uploads/image.png', 'ChatGPT GPT-4 AI', 'PUBLISHED', NOW() - INTERVAL '16 days',
'GPT-4 và ChatGPT: Hiện Tượng AI, Cách Hoạt Động và Tác Động Đến Xã Hội',
'Tìm hiểu sâu về GPT-4 và ChatGPT, cách mà chúng hoạt động và tạo ra cuộc cách mạng trong giao tiếp người-máy.',
'GPT-4, ChatGPT, OpenAI, LLM, chatbot AI, AI cách mạng', 'vi-VN', 11, 2400, 5234, 67, true, true, 1, NOW() - INTERVAL '16 days', NOW()),

-- 8
('AI Agents: Tự Động Hóa Thông Minh Với Tác Tử AI', 'ai-agents-tao-tu-dong-hoa',
'AI Agents là hệ thống AI có khả năng tự lập kế hoạch, sử dụng công cụ và hoàn thành mục tiêu phức tạp. Khám phá Agentic AI và tương lai của nó.',
'<h2>AI Agent Là Gì?</h2><p>AI Agent là một hệ thống AI có khả năng tự chủ hoàn thành mục tiêu. Khác với chatbot đơn thuần, Agent có thể: lập kế hoạch nhiều bước, sử dụng công cụ (APIs, code execution), tương tác với thế giới thực.</p><h2>Cấu Trúc AI Agent</h2><ul><li><strong>Perception</strong>: Cảm nhận môi trường và input</li><li><strong>Reasoning</strong>: Suy luận và lập kế hoạch</li><li><strong>Memory</strong>: Lưu trữ thông tin và kinh nghiệm</li><li><strong>Tools</strong>: Sử dụng external tools và APIs</li><li><strong>Action</strong>: Thực hiện hành động</li></ul><h2>Agentic AI Patterns</h2><p>Single-Agent Systems, Multi-Agent Collaboration, Hierarchical Agents, Reflexive Agents là các patterns phổ biến trong xây dựng AI Agents.</p><h2>Ví Dụ Nổi Bật</h2><p>AutoGPT, BabyAGI, Claude Agents, OpenAI Operators, Manus, Devin (AI Software Engineer) đang dẫn đầu xu hướng Agentic AI.</p><h2>Rủi Ro và An Toàn</h2><p>Autonomous agents đặt ra câu hỏi về control, alignment và potential for harm. Cần có guardrails và human oversight phù hợp.</p>',
'HTML', '/uploads/image.png', 'AI Agents Automation', 'PUBLISHED', NOW() - INTERVAL '14 days',
'AI Agents Toàn Diện: Tự Động Hóa Thông Minh Với Tác Tử AI Agentic',
'Khám phá AI Agents, cách chúng hoạt động, các patterns thiết kế và tương lai của Agentic AI trong tự động hóa.',
'ai agent là gì, agentic AI, AI tự động, autonomous AI, multi-agent, AI tools', 'vi-VN', 12, 2600, 3892, 44, true, true, 1, NOW() - INTERVAL '14 days', NOW()),

-- 9
('RAG: Retrieval-Augmented Generation Cho LLM Thông Minh Hơn', 'rag-retrieval-augmented-generation',
'RAG kết hợp LLM với external knowledge bases để tạo ra câu trả lời chính xác và cập nhật. Tìm hiểu cách triển khai RAG cho enterprise applications.',
'<h2>Tại Sao Cần RAG?</h2><p>LLMs có giới hạn về knowledge cutoff và có thể "hallucinate" (tạo thông tin sai). RAG giải quyết bằng cách kết hợp retrieval system với generation model.</p><h2>Cách RAG Hoạt Động</h2><ol><li><strong>Indexing</strong>: Chuyển documents thành embeddings, lưu trong vector database</li><li><strong>Retrieval</strong>: Khi có query, tìm relevant documents từ vector DB</li><li><strong>Generation</strong>: Feed retrieved context + query vào LLM để generate answer</li></ol><h2>Vector Databases</h2><p>Pinecone, Weaviate, ChromaDB, FAISS, Milvus, Qdrant là các vector DBs phổ biến để lưu trữ embeddings.</p><h2>Advanced RAG Patterns</h2><ul><li><strong>Query Expansion</strong>: Mở rộng query để retrieve tốt hơn</li><li><strong>Hybrid Search</strong>: Kết hợp dense + sparse retrieval</li><li><strong>Re-ranking</strong>: Sắp xếp lại kết quả retrieval</li><li><strong>Self-RAG</strong>: Tự đánh giá relevance và quality</li></ul><h2>Enterprise Use Cases</h2><p>RAG được dùng trong Customer Support AI, Legal Document Analysis, Medical Research, Internal Knowledge Bases, Product Documentation.</p>',
'HTML', '/uploads/image.png', 'RAG Architecture', 'PUBLISHED', NOW() - INTERVAL '12 days',
'RAG Toàn Diện: Retrieval-Augmented Generation Cho LLM Chính Xác Hơn',
'Hướng dẫn chi tiết về RAG, cách kết hợp retrieval với generation để tạo LLM thông minh và ít hallucination.',
'RAG là gì, retrieval augmented generation, vector database, embeddings, LLM, RAG implementation', 'vi-VN', 11, 2400, 3105, 33, false, true, 1, NOW() - INTERVAL '12 days', NOW()),

-- 10
('Generative AI: AI Sinh Tạo và Cuộc Cách Mạng Sáng Tạo', 'generative-ai-ai-sinh-tao',
'Generative AI có thể tạo ra văn bản, hình ảnh, âm nhạc, video hoàn toàn mới. Khám phá GANs, Diffusion Models và tương lai của AI sáng tạo.',
'<h2>Generative AI Là Gì?</h2><p>Generative AI là nhánh AI tập trung vào việc tạo ra nội dung mới - văn bản, hình ảnh, âm thanh, video, code - dựa trên những gì đã học được từ training data.</p><h2>Các Phương Pháp Sinh Tạo</h2><h3>1. GANs (Generative Adversarial Networks)</h3><p>Gồm Generator và Discriminator chơi min-max game. Generator tạo fake samples, Discriminator cố gắng phân biệt real/fake. Ứng dụng: image synthesis, FaceSwap, data augmentation.</p><h3>2. Diffusion Models</h3><p>Thuật toán học cách đảo ngược quá trình nhiễu. Từ noise, lần lượt denoise để tạo image. Stable Diffusion, DALL-E 3, Midjourney sử dụng kiến trúc này.</p><h3>3. VAEs (Variational Autoencoders)</h3><p>Học latent space representation và sample từ đó để generate.</p><h2>GenAI Products Nổi Bật</h2><p>ChatGPT, Claude, Gemini (text), DALL-E 3, Midjourney, Stable Diffusion (image), Sora, Runway (video), Suno, Udio (music), Copilot (code).</p><h2>Xu Hướng 2025-2026</h2><p>Multimodal Generation, Real-time Video Generation, Personalized Content, AI in Creative Industries, Copyright và Ownership issues.</p>',
'HTML', '/uploads/image.png', 'Generative AI Creative', 'PUBLISHED', NOW() - INTERVAL '10 days',
'Generative AI Toàn Diện: AI Sinh Tạo Từ GANs Đến Diffusion Models',
'Khám phá Generative AI, các phương pháp sinh tạo nội dung và ứng dụng trong sáng tạo, kinh doanh.',
'generative AI là gì, GAN, diffusion model, AI sinh tạo, DALL-E, Stable Diffusion, AI sáng tạo', 'vi-VN', 13, 2800, 4156, 48, true, true, 1, NOW() - INTERVAL '10 days', NOW()),

-- 11
('AI Ethics: Đạo Đức Trí Tuệ Nhân Tạo Trong Kỷ Nguyên Số', 'ai-ethics-dao-duc-ai',
'AI mang lại nhiều lợi ích nhưng cũng đặt ra các vấn đề đạo đức nghiêm trọng. Tìm hiểu về fairness, bias, privacy và trách nhiệm AI.',
'<h2>Tại Sao AI Ethics Quan Trọng?</h2><p>AI ngày càng ảnh hưởng đến cuộc sống con người: tuyển dụng, tín dụng, y tế, luật pháp. Các quyết định của AI có thể tác động lớn đến cá nhân và xã hội.</p><h2>Các Vấn Đề Đạo Đức Chính</h2><h3>1. Bias và Fairness</h3><p>Training data chứa bias xã hội dẫn đến AI decisions không công bằng. Ví dụ: Amazon''s recruiting tool bias against women, COMPAS recidivism bias.</p><h3>2. Privacy</h3><p>AI cần huge amounts of data, đặt ra câu hỏi về consent, surveillance và data ownership.</p><h3>3. Accountability</h3><p>Khi AI gây ra harm, ai chịu trách nhiệm? Developer, user hay AI system?</p><h3>4. Transparency</h3><p>Many AI models là "black boxes". Explainable AI (XAI) đang được phát triển để giải quyết.</p><h3>5. Job Displacement</h3><p>AI automation có thể displace millions of workers. Cần có strategies cho workforce transition.</p><h2>AI Safety và Alignment</h2><p>Đảm bảo AI systems hoạt động aligned với human values và intentions. RLHF, Constitutional AI, interpretability research đang tiến triển.</p><h2>Quy Định AI</h2><p>EU AI Act, US AI Executive Order, Vietnam AI Guidelines đang hình thành khung pháp lý cho AI.</p>',
'HTML', '/uploads/image.png', 'AI Ethics Fairness', 'PUBLISHED', NOW() - INTERVAL '8 days',
'AI Ethics Toàn Diện: Đạo Đức AI, Bias, Fairness và Trách Nhiệm Trong Kỷ Nguyên Số',
'Khám phá các vấn đề đạo đức AI từ bias, privacy đến accountability và các quy định AI quốc tế.',
'ai ethics là gì, đạo đức AI, bias in AI, fairness, AI regulation, EU AI Act, privacy AI', 'vi-VN', 12, 2600, 2897, 31, false, true, 1, NOW() - INTERVAL '8 days', NOW()),

-- 12
('Fine-tuning LLM: Tinh Chỉnh Mô Hình Ngôn Ngữ Cho Task Cụ Thể', 'fine-tuning-llm-tinh-chinh',
'Fine-tuning cho phép adapt LLM pre-trained cho specific domains hoặc tasks. Tìm hiểu các kỹ thuật fine-tuning từ LoRA đến full parameter training.',
'<h2>Tại Sao Cần Fine-tuning?</h2><p>LLMs pre-trained có knowledge chung nhưng cần fine-tune để hoạt động tốt trong specific domains: y tế, luật, tài chính, customer support. Fine-tuning cải thiện performance, reduce hallucinations và add capabilities.</p><h2>Các Phương Pháp Fine-tuning</h2><h3>1. Full Parameter Fine-tuning</h3><p>Update tất cả parameters của model. Expensive, requires large GPU memory nhưng đạt best performance.</p><h3>2. LoRA (Low-Rank Adaptation)</h3><p>Thêm low-rank matrices vào các layers của model. Memory efficient, fast training, popular choice.</p><h3>3. QLoRA</h3><p>Quantized base model + LoRA. Cho phép fine-tune large models trên consumer GPUs.</p><h3>4. Adapter Methods</h3><p>Thêm adapter modules thay vì modify original weights. PEFT (Parameter Efficient Fine-Tuning) library.</p><h2>Training Pipeline</h2><ol><li>Prepare dataset (format: instruction, input, output)</li><li>Choose base model (Llama, Mistral, Phi)</li><li>Select PEFT method (LoRA, QLoRA)</li><li>Configure training (learning rate, batch size, epochs)</li><li>Train với monitoring (loss, evaluation metrics)</li><li>Merge weights và evaluate</li><li>Deploy và test</li></ol><h2>Best Practices</h2><p>Data quality quan trọng hơn quantity. Start với small dataset có high quality. Use evaluation benchmarks. Implement RLHF sau fine-tuning để improve alignment.</p>',
'HTML', '/uploads/image.png', 'Fine-tuning LLM', 'PUBLISHED', NOW() - INTERVAL '6 days',
'Fine-tuning LLM Toàn Diện: Tinh Chỉnh Mô Hình Ngôn Ngữ Từ LoRA Đến Full Parameter',
'Hướng dẫn chi tiết về fine-tuning LLM, các phương pháp PEFT, LoRA, QLoRA và best practices cho training.',
'fine-tuning là gì, fine-tune LLM, LoRA, QLoRA, PEFT, parameter efficient, tinh chỉnh LLM', 'vi-VN', 14, 3000, 3456, 39, false, true, 1, NOW() - INTERVAL '6 days', NOW()),

-- 13
('Anthropic Claude: Mô Hình AI An Toàn và Hữu Ích', 'anthropic-claude-ai-an-toan',
'Anthropic Claude nổi tiếng với safety và helpfulness. Tìm hiểu về Constitutional AI, RLHF và cách Anthropic xây dựng AI có trách nhiệm.',
'<h2>Anthropic và Sứ Mệnh</h2><p>Anthropic được thành lập với mục tiêu xây dựng AI có trách nhiệm và beneficial. Tập trung vào AI Safety và alignment research.</p><h2>Claude Models</h2><p>Claude 3 Opus, Sonnet, Haiku - mỗi model có strengths khác nhau. Opus cho complex reasoning, Sonnet cho balanced performance, Haiku cho speed và cost efficiency.</p><h2>Constitutional AI (CAI)</h2><p>Phương pháp training giúp AI self-critique và improve based on a "constitution" of principles. CAI reduces harmful outputs mà không cần extensive human labeling.</p><h2>RLHF tại Anthropic</h2><p>Anthropic''s approach to RLHF tập trung vào helpful, harmless và honest. Sử dụng human feedback để align model với human values.</p><h2>Claude Features</h2><ul><li>Long context window (200K tokens)</li><li>Vision capabilities</li><li>Code execution</li><li>Tool use (Claude Agents)</li><li>Lower hallucination rates</li></ul><h2>Claude API và Use Cases</h2><p>Claude được sử dụng trong enterprise applications, research, writing assistance, coding, và nhiều use cases khác thông qua Anthropic API.</p>',
'HTML', '/uploads/image.png', 'Anthropic Claude AI', 'PUBLISHED', NOW() - INTERVAL '4 days',
'Anthropic Claude Toàn Diện: Constitutional AI, RLHF và Mô Hình AI An Toàn',
'Tìm hiểu Anthropic Claude, Constitutional AI, cách xây dựng AI an toàn và các đặc điểm nổi bật của Claude.',
'Anthropic Claude là gì, Constitutional AI, Claude AI, AI an toàn, Claude 3, RLHF', 'vi-VN', 10, 2200, 2876, 28, false, true, 1, NOW() - INTERVAL '4 days', NOW()),

-- 14
('LangChain: Xây Dựng Ứng Dụng LLM-Powered Dễ Dàng Hơn', 'langchain-ung-dung-llm',
'LangChain là framework phổ biến để xây dựng LLM-powered applications. Tìm hiểu về Chains, Agents, Memory và RAG implementations với LangChain.',
'<h2>LangChain Là Gì?</h2><p>LangChain là open-source framework giúp developers xây dựng applications powered by LLMs. Cung cấp abstractions cho prompts, chains, agents, memory và retrieval.</p><h2>Core Components</h2><h3>1. Models (LLMs)</h3><p>Unified interface cho 60+ LLMs: OpenAI, Anthropic, Azure OpenAI, Hugging Face, Cohere, và local models.</p><h3>2. Prompts</h3><p>Templates, parsers, example selectors để quản lý prompts hiệu quả.</p><h3>3. Chains</h3><p>Sequences of calls đến LLMs hoặc utilities. LLMChain, SequentialChain, RouterChain.</p><h3>4. Agents</h3><p>Systems that use LLM để decide which actions to take. Toolkit-based agents, conversational agents.</p><h3>5. Memory</h3><p>Persist conversation state giữa calls. Buffer, Summary, Vector store memory.</p><h3>6. Indexes</h3><p>Document loaders, text splitters, vector stores cho RAG.</p><h2>LangChain Use Cases</h3><ul><li>Chatbots với memory</li><li>Question Answering systems</li><li>Autonomous agents</li><li>Code generation và analysis</li><li>Data extraction và transformation</li></ul><h2>LangGraph</h2><p>Extenson của LangChain cho building stateful, actor-based applications. Tốt cho complex multi-agent systems.</p><h2>LangSmith</h2><p>Developer platform cho debugging, testing, monitoring LLM applications.</p>',
'HTML', '/uploads/image.png', 'LangChain Framework', 'PUBLISHED', NOW() - INTERVAL '2 days',
'LangChain Toàn Diện: Xây Dựng Ứng Dụng LLM-Powered Với Chains, Agents và Memory',
'Hướng dẫn chi tiết về LangChain, các components và cách xây dựng LLM applications production-ready.',
'LangChain là gì, LangChain tutorial, LLM framework, LangChain agents, chains, RAG LangChain', 'vi-VN', 13, 2800, 3245, 36, false, true, 1, NOW() - INTERVAL '2 days', NOW()),

-- 15
('AI trong Y Tế: Cách Mạng Chẩn Đoán và Điều Trị', 'ai-trong-y-te-chuan-doan',
'AI đang transform healthcare với khả năng chẩn đoán chính xác, drug discovery và personalized medicine. Tìm hiểu các ứng dụng AI trong y tế.',
'<h2>AI Trong Chẩn Đoán Hình Ảnh</h2><p>AI có thể phát hiện diseases trong X-rays, MRIs, CT scans với độ chính xác ngang hoặc vượt specialist humans. Google''s DeepMind phát hiện eye diseases, AI models detect breast cancer từ mammograms.</p><h2>Drug Discovery</h2><p>Traditional drug development mất 10-15 năm và billions dollars. AI có thể: predict protein structures (AlphaFold), simulate drug interactions, identify drug candidates nhanh hơn đáng kể.</p><h2>Personalized Medicine</h2><p>AI phân tích genetic data, lifestyle, medical history để recommend personalized treatment plans. Precision medicine đang trở thành reality.</p><h2>Virtual Health Assistants</h2><p>AI chatbots và virtual nurses giúp triage patients, answer health questions, remind medication schedules, monitor chronic conditions.</p><h2>Medical AI Products</h2><ul><li>IBM Watson Health</li><li>Google Health</li><li>Microsoft AI for Health</li><li>PathAI (pathology)</li><li>Tempus (oncology)</li></ul><h2>Challenges</h2><p>Data privacy (HIPAA), regulatory approval (FDA), bias in training data, interpretability của AI decisions là những thách thức chính.</p><h2>Tương Lai AI Y Tế</h2><p>AI-powered surgery robots, predictive analytics for disease outbreaks, digital twins cho treatment planning, fully automated screening programs.</p>',
'HTML', '/uploads/image.png', 'AI Healthcare Medical', 'PUBLISHED', NOW() - INTERVAL '1 day',
'AI Trong Y Tế: Chẩn Đoán Hình Ảnh, Drug Discovery và Personalized Medicine',
'Khám phá các ứng dụng AI trong y tế, từ chẩn đoán hình ảnh đến phát hiện thuốc và y học cá nhân hóa.',
'AI y tế, AI healthcare, medical AI, chẩn đoán AI, drug discovery, personalized medicine, AlphaFold', 'vi-VN', 14, 3000, 2987, 32, true, true, 1, NOW() - INTERVAL '1 day', NOW()),

-- 16
('Reinforcement Learning: Học Qua Tương Tác và Phần Thưởng', 'reinforcement-learning-hoc-qua-tuong-tac',
'Reinforcement Learning (RL) cho phép AI học thông qua trial-and-error. Tìm hiểu về MDP, Q-Learning, Policy Gradients và ứng dụng RL.',
'<h2>Reinforcement Learning Là Gì?</h2><p>RL là paradigm của ML where an agent learns by interacting với environment, receiving rewards or penalties. Agent goal là maximize cumulative reward over time.</p><h2>Markov Decision Process (MDP)</h2><p>MDP là mathematical framework cho RL: States (S), Actions (A), Transition (P), Reward (R), Discount factor (γ). Agent không cần remember full history, chỉ cần current state.</p><h2>Các Thuật Toán RL Chính</h2><h3>1. Q-Learning</h3><p>Learns action-value function Q(s,a). Sử dụng Bellman equation để update Q-values. Simple nhưng có limitations với large state spaces.</p><h3>2. Deep Q-Network (DQN)</h3><p>Kết hợp Q-Learning với Deep Neural Networks. Experience replay và target network để stabilize training.</p><h3>3. Policy Gradient Methods</h3><p>Directly optimize policy π(a|s). REINFORCE, Actor-Critic, PPO (Proximal Policy Optimization), A3C là các algorithms phổ biến.</p><h3>4. Model-Based RL</h3><p>Learn model của environment trước, sau đó plan. More sample efficient.</p><h2>Ứng Dụng RL</h2><ul><li>Game AI (AlphaGo, OpenAI Five)</li><li>Robotics control</li><li>Autonomous vehicles</li><li>Resource management</li><li>Recommendation systems</li><li>Trading và finance</li></ul><h2>Challenges</h2><p>Sample efficiency, exploration vs exploitation, reward hacking, sim-to-real transfer là những thách thức trong RL research.</p>',
'HTML', '/uploads/image.png', 'Reinforcement Learning AI', 'PUBLISHED', NOW(),
'Reinforcement Learning Toàn Diện: Q-Learning, Policy Gradients và Ứng Dụng RL',
'Tìm hiểu Reinforcement Learning từ cơ bản đến nâng cao, các thuật toán Q-Learning, DQN, PPO và ứng dụng thực tế.',
'reinforcement learning là gì, RL, Q-learning, DQN, policy gradient, PPO, AI học tăng cường', 'vi-VN', 15, 3200, 2654, 26, false, true, 1, NOW(), NOW()),

-- 17
('Prompt Engineering: Nghệ Thuật Giao Tiếp Với LLM', 'prompt-engineering-nghe-thuat-giao-tiep',
'Prompt engineering là skill quan trọng để khai thác tối đa LLM capabilities. Tìm hiểu các techniques từ basic đến advanced.',
'<h2>Prompt Engineering Là Gì?</h2><p>Prompt engineering là art và science của crafting inputs để get desired outputs từ LLMs. Một well-crafted prompt có thể dramatically improve model performance mà không cần thay đổi model.</p><h2>Các Nguyên Tắc Cơ Bản</h2><h3>1. Clear và Specific</h3><p>Specify exact format, length, tone mong muốn. Avoid ambiguous instructions.</p><h3>2. Provide Context</h3><p>Background information giúp model understand context và provide better response.</p><h3>3. Use Examples</h3><p>Few-shot examples demonstrate expected output format và behavior.</p><h3>4. Break Down Complex Tasks</h3><p>Chain-of-thought prompting: yêu cầu model explain reasoning step-by-step.</p><h2>Advanced Techniques</h2><h3>Chain-of-Thought (CoT)</h3><p>Encourage model to show reasoning process. "Let''s think step by step" triggers better answers for complex reasoning tasks.</p><h3>Zero-Shot CoT</h3><p>Add "Let''s think step by step" without examples. Works surprisingly well.</p><h3>Tree of Thoughts</h3><p>Explore multiple reasoning paths, evaluate và choose best.</p><h3>Self-Consistency</h3><p>Generate multiple responses, pick most consistent answer.</p><h3>ReAct (Reason + Act)</h3><p>Interleave reasoning với actions. Good for complex tasks requiring external information.</p><h2>Prompt Templates</h2><p>System prompt, User prompt, Few-shot examples, Output format specification, Constraints và guardrails.</p><h2>Best Practices</h2><p>Iterate và test prompts. Use versioning. Implement error handling. Monitor outputs for quality và safety.</p>',
'HTML', '/uploads/image.png', 'Prompt Engineering LLM', 'PUBLISHED', NOW() - INTERVAL '1 day',
'Prompt Engineering Toàn Diện: Kỹ Thuật Giao Tiếp Với LLM Từ Cơ Bản Đến Nâng Cao',
'Hướng dẫn chi tiết về prompt engineering, các techniques CoT, ReAct, few-shot learning và best practices.',
'prompt engineering là gì, LLM prompting, chain of thought, few-shot, prompt techniques, giao tiếp AI', 'vi-VN', 11, 2400, 4102, 52, true, true, 1, NOW() - INTERVAL '1 day', NOW()),

-- 18
('Edge AI: Trí Tuệ Nhân Tạo Ngay Trên Thiết Bị Của Bạn', 'edge-ai-tri-tue-nhan-tao-thiet-bi',
'Edge AI mang AI capabilities đến edge devices: smartphones, IoT devices, cameras. Tìm hiểu về on-device AI, model compression và latency benefits.',
'<h2>Edge AI Là Gì?</h2><p>Edge AI refers to AI algorithms processed locally on edge devices thay vì cloud. Data không cần sent to remote servers, enabling real-time processing với lower latency và better privacy.</p><h2>Tại Sao Edge AI?</h2><ul><li><strong>Low Latency</strong>: Real-time inference (autonomous driving, AR)</li><li><strong>Privacy</strong>: Data stays on device</li><li><strong>Reliability</strong>: Works without internet connection</li><li><strong>Bandwidth</strong>: Reduces data transmission costs</li><li><strong>Scalability</strong>: Millions of devices without server bottlenecks</li></ul><h2>Model Compression Techniques</h2><h3>1. Quantization</h3><p>Reduce weight precision: FP32 → INT8 → INT4. Trade-off accuracy for speed và memory.</p><h3>2. Pruning</h3><p>Remove redundant connections/neurons. Can achieve 50-90% sparsity với minimal accuracy loss.</p><h3>3. Knowledge Distillation</h3><p>Train small "student" model từ large "teacher" model.</p><h3>4. Architecture Design</h3><p>Design efficient architectures từ đầu: MobileNet, EfficientNet, TinyBERT.</p><h2>Edge AI Hardware</h2><ul><li>Apple Neural Engine (ANE)</li><li>Google Tensor Processing Unit (TPU)</li><li>NVIDIA Jetson</li><li>Qualcomm AI Engine</li><li>Intel Movidius</li></ul><h2>Use Cases</h2><p>Smartphones (camera, voice assistants), Smart cameras, IoT sensors, Wearables, Industrial IoT, Autonomous vehicles.</p>',
'HTML', '/uploads/image.png', 'Edge AI Devices', 'PUBLISHED', NOW() - INTERVAL '3 days',
'Edge AI Toàn Diện: On-Device AI, Model Compression và Ứng Dụng Edge Computing',
'Khám phá Edge AI, các kỹ thuật model compression và cách triển khai AI trên edge devices.',
'edge AI là gì, on-device AI, model compression, quantization, pruning, edge computing, IoT AI', 'vi-VN', 12, 2600, 2345, 22, false, true, 1, NOW() - INTERVAL '3 days', NOW()),

-- 19
('Multimodal AI: Khi AI Hiểu Cả Văn Bản, Hình Ảnh và Âm Thanh', 'multimodal-ai-hieu-nhieu-thu',
'Multimodal AI models như GPT-4V, Gemini, Claude có thể process và reason across multiple data types. Tìm hiểu về multimodal learning và tương lai của nó.',
'<h2>Multimodal AI Là Gì?</h2><p>Multimodal AI refers to systems that can understand và process information from multiple modalities: text, images, audio, video. Mục tiêu là replicate human-like understanding của world.</p><h2>Modalities trong Multimodal AI</h2><ul><li><strong>Text</strong>: Written language, code</li><li><strong>Vision</strong>: Images, videos, charts</li><li><strong>Audio</strong>: Speech, music, sound effects</li><li><strong>Sensors</strong>: LiDAR, depth, thermal</li><li><strong>Structured</strong>: Tables, graphs, JSON</li></ul><h2>Architecture Approaches</h2><h3>1. Fusion-based</h3><p>Combine modality-specific encoders into unified representation. CLIP, GPT-4V use this approach.</p><h3>2. Cross-modal Attention</h3><p>Attention mechanisms allow different modalities to attend to each other.</p><h3>3. Language-guided Perception</h3><p>Use language as universal interface for all modalities.</p><h2>Multimodal Models</h2><ul><li><strong>GPT-4V</strong>: Vision + Text</li><li><strong>Gemini</strong>: Text, Images, Audio, Video, Code</li><li><strong>Claude 3</strong>: Vision + Text</li><li><strong>LLaVA</strong>: Open-source vision-language</li><li><strong>Kosmos-1</strong>: Generalist multimodal model</li></ul><h2>Use Cases</h2><ul><li>Visual question answering</li><li>Document understanding (receipts, forms)</li><li>Video summarization</li><li>Medical image analysis</li><li>Autonomous driving</li><li>Accessibility tools</li></ul><h2>Tương Lai</h2><p>Full multimodal agents, seamless cross-modal reasoning, embodied AI với robotics integration.</p>',
'HTML', '/uploads/image.png', 'Multimodal AI Vision', 'PUBLISHED', NOW() - INTERVAL '5 days',
'Multimodal AI: Khi AI Hiểu Văn Bản, Hình Ảnh, Âm Thanh và Video Cùng Lúc',
'Tìm hiểu về Multimodal AI, các kiến trúc, models như GPT-4V, Gemini và tương lai của multimodal learning.',
'multimodal AI là gì, GPT-4V, Gemini, vision language, multimodal learning, AI đa phương thức', 'vi-VN', 11, 2400, 2765, 29, false, true, 1, NOW() - INTERVAL '5 days', NOW()),

-- 20
('AI trong Giáo Dục: Cá Nhân Hóa Việc Học Tập', 'ai-trong-giao-duc-ca-nhan-hoa',
'AI đang transform education với personalized learning, intelligent tutoring và automated grading. Khám phá cách AI thay đổi cách chúng ta học.',
'<h2>AI trong Personalized Learning</h2><p>AI phân tích learning patterns, strengths, weaknesses của từng student để recommend personalized content, pace và teaching methods. Adaptive learning platforms như Carnegie Learning sử dụng AI để customize math education.</p><h2>Intelligent Tutoring Systems</h2><p>AI tutors cung cấp 1-on-1 guidance, nhưng available 24/7. Khan Academy''s Khanmigo, Socratic by Google, Duolingo là examples.</p><h2>Automated Assessment</h2><p>AI grading cho essays, short answers, even code.Gradescope sử dụng AI để speed up grading process. Writing feedback systems giúp students improve writing skills.</p><h2>Content Generation</h2><p>AI tạo quiz questions, flashcards, summaries, practice problems. Teachers save time on administrative tasks, focus on high-value interactions.</p><h2>Language Learning</h2><p>Duolingo, Rosetta Stone, Elsa Speak sử dụng AI cho speech recognition, personalized lessons, conversation practice.</p><h2>Accessibility</h2><p>AI-powered transcription, translation, text-to-speech, dyslexic-friendly interfaces make education more accessible.</p><h2>Challenges</h2><p>Digital divide, over-reliance on AI, data privacy của children, maintaining human connection in education.</p><h2>Tương Lai</h2><p>AI study companions, virtual reality classrooms, AI-generated curriculum, competency-based credentialing.</p>',
'HTML', '/uploads/image.png', 'AI Education Learning', 'PUBLISHED', NOW() - INTERVAL '7 days',
'AI Trong Giáo Dục: Personalized Learning, Intelligent Tutoring và Tương Lai Giáo Dục',
'Khám phá ứng dụng AI trong giáo dục, từ personalized learning đến automated grading và accessible education.',
'AI giáo dục, AI in education, personalized learning, intelligent tutoring, AI tutor, edtech', 'vi-VN', 11, 2400, 2234, 24, true, true, 1, NOW() - INTERVAL '7 days', NOW()),

-- 21
('AI trong Tài Chính: Từ Fraud Detection Đến Algorithmic Trading', 'ai-trong-tai-chinh-fraud-detection',
'AI đang revolutionizing financial services với fraud detection, algorithmic trading, credit scoring và risk management. Tìm hiểu các ứng dụng AI trong fintech.',
'<h2>AI trong Fraud Detection</h2><p>AI systems analyze millions of transactions real-time để detect suspicious patterns. Machine learning models learn from historical fraud cases, adapt to new attack vectors. Visa, Mastercard, banks sử dụng AI để prevent billions in fraud annually.</p><h2>Credit Scoring</h2><p>AI models evaluate creditworthiness beyond traditional scores. Analyze alternative data: spending patterns, payment history, social signals. Companies như Upstart, ZestFinance leverage AI for fairer lending decisions.</p><h2>Algorithmic Trading</h2><p>Quantitative funds sử dụng AI để identify patterns, predict price movements, execute trades at microsecond speed. High-frequency trading (HFT) firms như Renaissance Technologies, Two Sigma leverage advanced ML.</p><h2>Risk Management</h2><p>AI models predict market risks, credit risks, operational risks. Stress testing với AI simulation. Real-time risk monitoring và alerts.</p><h2>Customer Service</h2><p>AI chatbots và virtual assistants handle customer inquiries 24/7. Personalized financial advice. robo-advisors như Betterment, Wealthfront provide automated investing.</p><h2>Regulatory Compliance</h2><p>AI helps với KYC (Know Your Customer), AML (Anti-Money Laundering), compliance reporting. Reduces manual effort và improves accuracy.</p><h2>Challenges</h2><p>Model risk, adversarial attacks, data privacy, regulatory compliance, explainability requirements.</p>',
'HTML', '/uploads/image.png', 'AI Finance Fintech', 'PUBLISHED', NOW() - INTERVAL '9 days',
'AI Trong Tài Chính: Fraud Detection, Credit Scoring, Algorithmic Trading và Fintech',
'Khám phá ứng dụng AI trong ngành tài chính, từ phát hiện gian lận đến giao dịch thuật toán và quản lý rủi ro.',
'AI tài chính, AI finance, fintech, fraud detection, algorithmic trading, credit scoring, risk management', 'vi-VN', 12, 2600, 2543, 27, false, true, 1, NOW() - INTERVAL '9 days', NOW()),

-- 22
('AI và Môi Trường: Giải Quyết Khủng Hoảng Khí Hậu', 'ai-va-moi-truong-khi-hau',
'AI có thể đóng góp significant role trong climate action: optimizing energy, predicting natural disasters, monitoring deforestation. Tìm hiểu về Climate AI.',
'<h2>AI Cho Năng Lượng</h2><p>Smart grids với AI optimize energy distribution, reduce waste. Google DeepMind''s AI reduced Google''s data center cooling energy by 40%. AI optimizes renewable energy output, battery storage.</p><h2>Precision Agriculture</h2><p>AI-powered precision farming reduce fertilizer và pesticide use by analyzing soil, weather, crop data. John Deere''s AI tractors optimize planting và harvesting. Can reduce agriculture emissions significantly.</p><h2>Carbon Capture Monitoring</h2><p>AI analyze satellite imagery để monitor carbon capture projects, verify carbon offsets. Detect deforestation với satellite monitoring.</p><h2>Climate Modeling</h2><p>AI models improve climate predictions, simulate scenarios faster than traditional models. Help policymakers understand impact của different climate strategies.</p><h2>Disaster Prediction</h2><p>AI predict floods, wildfires, hurricanes earlier và more accurately. Early warning systems save lives. IBM''s PAIRS, Google''s flood forecasting.</p><h2>Sustainability Optimization</h2><p>AI optimize supply chains, reduce waste, improve logistics efficiency. Carbon-aware computing, green software engineering.</p><h2>Challenges</h2><p>AI itself có carbon footprint (training large models uses significant energy). Need to balance AI benefits against environmental costs.</p>',
'HTML', '/uploads/image.png', 'AI Climate Environment', 'PUBLISHED', NOW() - INTERVAL '11 days',
'AI và Môi Trường: Climate AI, Năng Lượng Xanh và Giải Quyết Khủng Hoảng Khí Hậu',
'Tìm hiểu về ứng dụng AI trong bảo vệ môi trường, từ tối ưu năng lượng đến dự báo thiên tai.',
'AI môi trường, climate AI, AI xanh, renewable energy, precision agriculture, disaster prediction', 'vi-VN', 11, 2400, 1987, 19, false, true, 1, NOW() - INTERVAL '11 days', NOW()),

-- 23
('AI Safety: Làm Sao Để AI Hoạt Động An Toàn và Có Trách Nhiệm', 'ai-safety-an-toan-ai',
'AI Safety là lĩnh vực research tập trung vào making AI systems safe, beneficial và aligned với human values. Tìm hiểu về alignment research, interpretability và governance.',
'<h2>Tại Sao AI Safety Quan Trọng?</h2><p>As AI systems become more capable, ensuring they remain safe và beneficial becomes critical. Misaligned AI có thể cause harm even unintentionally. AGI development makes this even more urgent.</p><h2>Alignment Problem</h2><p>Làm sao để đảm bảo AI pursue goals aligned với human values? Challenge: specified objectives có thể diverge from intended outcomes. Paperclip maximizer thought experiment illustrates this.</p><h2>Interpretability</h2><p>Hiểu cách AI đưa ra decisions là crucial cho safety. "Black box" models khó trust và debug. Mechanistic interpretability research aims to understand neural networks at mechanistic level.</p><h2>Các Hướng Nghiên Cứu Safety</h2><ul><li><strong>RLHF</strong>: Human feedback để align model behavior</li><li><strong>Constitutional AI</strong>: Self-critique based on principles</li><li><strong>Debate</strong>: AI debate instead of human labeling</li><li><strong>Recursive Reward Modeling</strong>: AI helping improve its own training</li><li><strong>AI Control</strong>: Techniques to maintain human control</li></ul><h2>AI Governance</h2><p>Cần có international cooperation, regulations, standards cho AI safety. EU AI Act, US AI executive order, UNESCO AI ethics recommendations.</p><h2>Anthropic''s Approach</h2><p>Anthropic focuses on interpretability, Constitutional AI, responsible scaling policies. Publish safety research openly.</p><h2>Open Problems</h2><p>Specification, robustness, oversight, avoidance of catastrophic outcomes.</p>',
'HTML', '/uploads/image.png', 'AI Safety Alignment', 'PUBLISHED', NOW() - INTERVAL '13 days',
'AI Safety Toàn Diện: Alignment, Interpretability và Governance Cho AI An Toàn',
'Khám phá lĩnh vực AI Safety, các nghiên cứu alignment, interpretability và cách đảm bảo AI hoạt động an toàn.',
'ai safety là gì, AI alignment, AI governance, interpretability, RLHF, Constitutional AI, AI có trách nhiệm', 'vi-VN', 13, 2800, 2123, 21, false, true, 1, NOW() - INTERVAL '13 days', NOW()),

-- 24
('Open Source AI: Meta Llama và Cuộc Chiến AI Mã Nguồn Mở', 'open-source-ai-meta-llama',
'Meta Llama đã democratize AI với open-source LLM. Tìm hiểu về Llama models, open-source AI ecosystem và cách community đang push AI forward.',
'<h2>Meta''s Open Source AI Strategy</h2><p>Meta released Llama 2 (2023) và Llama 3 (2024) as open source, dramatically changing AI landscape. Free for research và commercial use (with restrictions).</p><h2>Llama Models Evolution</h2><ul><li><strong>Llama 1</strong>: First open-source foundation model</li><li><strong>Llama 2</strong>: Improved, 7B-70B parameters, chat fine-tune</li><li><strong>Llama 3</strong>: 8B-70B, significantly improved performance</li><li><strong>Llama 3.1</strong>: 405B, first open-source frontier model</li></ul><h2>Llama Ecosystem</h2><p>Thousands of fine-tuned models trên Hugging Face: Mistral-based, Code Llama, Llama Guard, medical variants, coding assistants.</p><h2>Benefits của Open Source AI</h2><ul><li>Democratization: Anyone can build</li><li>Transparency: Inspect và audit model behavior</li><li>Customization: Fine-tune for specific needs</li><li>Cost: No API costs for self-hosting</li><li>Innovation: Community-driven improvements</li></ul><h2>Other Open Source Models</h2><ul><li>Mistral AI (Mistral, Mixtral)</li><li>Falcon (TII UAE)</li><li>Stable Diffusion (Stability AI)</li><li>Phi (Microsoft)</li><li>Qwen (Alibaba)</li></ul><h2>Concerns</h2><p>Misuse potential, lack of safety filtering, compute requirements, evaluation challenges.</p>',
'HTML', '/uploads/image.png', 'Open Source AI Llama', 'PUBLISHED', NOW() - INTERVAL '15 days',
'Open Source AI Toàn Diện: Meta Llama, Open-Source LLM Ecosystem và Democracy của AI',
'Tìm hiểu về open source AI, Meta Llama, các mô hình mã nguồn mở và cách community đang thay đổi AI landscape.',
'open source AI là gì, Meta Llama, open source LLM, llama models, AI mã nguồn mở, Mistral, community AI', 'vi-VN', 10, 2200, 2876, 31, false, true, 1, NOW() - INTERVAL '15 days', NOW()),

-- 25
('AI trong Sáng Tạo Nội Dung: Viết, Vẽ, Sáng Tác Với AI', 'ai-sang-tao-noi-dung',
'AI đang revolutionizing creative industries: writing, design, music, video. Khám phá cách creators sử dụng AI tools và debates về AI creativity.',
'<h2>AI Trong Viết lách</h2><p>AI writing assistants như Jasper, Copy.ai, ChatGPT giúp generate content, brainstorm ideas, overcome writer''s block. Journalism (Bloomberg AI), marketing copy, blog posts đều đang được AI-assisted.</p><h2>AI Trong Thiết Kế</h2><p>AI design tools: Midjourney, DALL-E 3, Stable Diffusion for images. Adobe Firefly integrates AI vào Creative Suite. Figma AI, Canva AI democratize design.</p><h2>AI Trong Âm Nhạc</h2><p>AI music generation: Suno, Udio, AIVA. Composing, arrangement, production được AI hỗ trợ. Ethical questions về AI-generated music và copyright.</p><h2>AI Trong Video</h2><p>Sora, Runway Gen-3, Pika Labs tạo video từ text prompts. AI video editing: automated cuts, effects, translations.</p><h2>AI Trong Code</h2><p>GitHub Copilot, Cursor, Claude Code, Replit Ghostwriter. AI pair programmers đang trở nên essential cho developers.</p><h2>Debates và Ethics</h2><ul><li>Copyright của AI-generated content</li><li>Impact on creative jobs</li><li>Attribution và transparency</li><li>Quality control</li><li>Human creativity value</li></ul><h2>Tương Lai Sáng Tạo</h2><p>Human-AI collaboration, AI as creative partner, new art forms enabled by AI, democratization of creative skills.</p>',
'HTML', '/uploads/image.png', 'AI Creative Content', 'PUBLISHED', NOW() - INTERVAL '17 days',
'AI Trong Sáng Tạo Nội Dung: Writing, Design, Music và Video Với AI',
'Khám phá ứng dụng AI trong creative industries, từ viết lách, thiết kế đến âm nhạc và video production.',
'AI sáng tạo, AI content creation, AI writing, AI art, AI music, AI video, creative AI tools', 'vi-VN', 11, 2400, 3087, 38, true, true, 1, NOW() - INTERVAL '17 days', NOW()),

-- 26
('Neural Network Fundamentals: Từ Perceptron Đến Deep Learning', 'neural-network-fundamentals-perceptron',
'Hiểu cơ bản về neural networks: từ perceptron đơn giản đến deep networks phức tạp. Giải thích forward propagation, backpropagation và training.',
'<h2>Từ Neuron Đến Perceptron</h2><p>Neural network được lấy cảm hứng từ biological neural networks. Perceptron (1957) là đơn vị cơ bản: nhận inputs, apply weights, sum, apply activation, produce output.</p><h2>Neural Network Architecture</h2><ul><li><strong>Input Layer</strong>: Features của data</li><li><strong>Hidden Layers</strong>: Learn representations</li><li><strong>Output Layer</strong>: Predictions</li><li><strong>Weights</strong>: Parameters được learned</li><li><strong>Bias</strong>: Offset term</li><li><strong>Activation Functions</strong>: ReLU, Sigmoid, Tanh, Softmax</li></ul><h2>Forward Propagation</h2><p>Data flows forward từ input through layers. Mỗi neuron computes weighted sum của inputs + bias, passes through activation function. Output layer produces final prediction.</p><h2>Loss Function</h2><p>Measures difference between prediction và actual. Cross-entropy cho classification, MSE cho regression. Goal: minimize loss.</p><h2>Backpropagation</h2><p>Algorithm để compute gradients của loss w.r.t. weights. Chain rule được sử dụng để propagate error backwards. Gradients được dùng để update weights (gradient descent).</p><h2>Training Loop</h2><ol><li>Forward pass: compute prediction</li><li>Compute loss</li><li>Backward pass: compute gradients</li><li>Update weights (optimizer)</li><li>Repeat</li></ol><h2>Optimizers</h2><p>SGD, Adam, AdamW, RMSprop. Learning rate scheduling, momentum, adaptive learning rates.</p><h2>Regularization</h2><p>Dropout, L2 regularization, batch normalization, early stopping prevent overfitting.</p>',
'HTML', '/uploads/image.png', 'Neural Network Deep Learning', 'PUBLISHED', NOW() - INTERVAL '19 days',
'Neural Network Fundamentals: Từ Perceptron Đến Deep Learning Chi Tiết',
'Giải thích toàn diện về neural networks: cấu trúc, forward propagation, backpropagation, activation functions và training.',
'neural network là gì, perceptron, deep learning, forward propagation, backpropagation, activation function', 'vi-VN', 14, 3000, 2654, 26, false, true, 1, NOW() - INTERVAL '19 days', NOW()),

-- 27
('AutoML: Tự Động Hóa Machine Learning Pipeline', 'automl-tu-dong-hoa-ml',
'AutoML tự động hóa việc chọn model, hyperparameter tuning, feature engineering. Tìm hiểu về AutoML frameworks và cách democratize ML.',
'<h2>AutoML Là Gì?</h2><p>Automated Machine Learning (AutoML) refers to automating end-to-end process của applying ML: data preprocessing, feature engineering, model selection, hyperparameter tuning, evaluation.</p><h2>Why AutoML?</h2><ul><li>Democratize ML: Non-experts can build models</li><li>Reduce time-to-deployment</li><li>Find better models than manual search</li><li>Reduce human bias và errors</li><li>Free up data scientists cho higher-value tasks</li></ul><h2>AutoML Pipeline Stages</h2><ol><li><strong>Data Collection & Cleaning</strong></li><li><strong>Feature Engineering</strong>: Automated feature generation</li><li><strong>Model Selection</strong>: Search across algorithms</li><li><strong>Hyperparameter Optimization</strong>: Bayesian, random search, grid search</li><li><strong>Ensemble</strong>: Combine multiple models</li><li><strong>Evaluation & Deployment</strong></li></ol><h2>AutoML Frameworks</h2><ul><li><strong>AutoGluon</strong>: Amazon''s AutoML, handles images, text, tabular</li><li><strong>Auto-sklearn</strong>: scikit-learn based</li><li><strong>H2O AutoML</strong>: Enterprise-friendly</li><li><strong>Google Cloud AutoML</strong>: Vertex AI</li><li><strong>MLbox</strong>: Lightweight AutoML</li><li><strong>TPOT</strong>: Genetic programming approach</li></ul><h2>Neural Architecture Search (NAS)</h2><p>AutoML for neural networks. Find optimal architecture automatically. Methods: RL-based, evolutionary, gradient-based.</p><h2>Limitations</h2><p>Computational cost, may miss novel approaches, limited flexibility for domain-specific knowledge.</p>',
'HTML', '/uploads/image.png', 'AutoML Machine Learning', 'PUBLISHED', NOW() - INTERVAL '21 days',
'AutoML Toàn Diện: Tự Động Hóa Machine Learning Từ Feature Engineering Đến Deployment',
'Tìm hiểu về AutoML, các frameworks như AutoGluon, H2O AutoML và cách tự động hóa ML pipeline.',
'AutoML là gì, automated ML, hyperparameter tuning, model selection, feature engineering tự động, AutoGluon', 'vi-VN', 12, 2600, 1876, 17, false, true, 1, NOW() - INTERVAL '21 days', NOW()),

-- 28
('AI Regulation: EU AI Act và Khung Pháp Lý AI Toàn Cầu', 'ai-regulation-eu-ai-act',
'EU AI Act là bộ luật AI toàn diện đầu tiên trên thế giới. Tìm hiểu về AI regulations, compliance requirements và tương lai của AI governance.',
'<h2>EU AI Act Overview</h2><p>The EU Artificial Intelligence Act (2024) là bộ luật AI toàn diện đầu tiên trên thế giới. Dựa trên risk-based approach: prohibited AI, high-risk AI, limited-risk AI, minimal-risk AI.</p><h2>Risk Classification</h2><h3>Unacceptable Risk (Prohibited)</h3><p>Social scoring by governments, real-time biometric surveillance (with exceptions), subliminal manipulation, exploitation of vulnerabilities.</p><h3>High Risk</h3><p>AI trong hiring, credit scoring, education, law enforcement, border control, critical infrastructure. Cần: conformity assessments, documentation, human oversight.</p><h3>Limited Risk</h3><p>Chatbots, deepfakes cần transparency disclosures.</p><h3>Minimal Risk</h3><p>Most AI applications. No specific requirements.</p><h2>General-Purpose AI (GPAI)</h2><p>LLMs với specific obligations: technical documentation, copyright compliance, energy consumption disclosure.</p><h2>Global AI Regulations</h2><ul><li><strong>US</strong>: Executive Order on AI (2023), state-level regulations</li><li><strong>China</strong>: Generative AI regulations, algorithm recommendations</li><li><strong>UK</strong>: Pro-innovation approach, AI Safety Institute</li><li><strong>UNESCO</strong>: AI Ethics Recommendation</li></ul><h2>Compliance Requirements</h2><p>Documentation, transparency, human oversight, data governance, accuracy, robustness, cybersecurity.</p><h2>Penalties</h2><p>Up to 35M EUR hoặc 7% global revenue for violations.</p>',
'HTML', '/uploads/image.png', 'AI Regulation EU', 'PUBLISHED', NOW() - INTERVAL '23 days',
'AI Regulation Toàn Diện: EU AI Act, Compliance và Khung Pháp Lý AI Toàn Cầu',
'Khám phá EU AI Act, risk classification, compliance requirements và các quy định AI trên thế giới.',
'EU AI Act là gì, AI regulation, AI compliance, AI law, regulation AI, EU AI governance', 'vi-VN', 13, 2800, 2034, 22, false, true, 1, NOW() - INTERVAL '23 days', NOW()),

-- 29
('AI Agents Trong Thực Tế: Case Studies và Best Practices', 'ai-agents-case-studies',
'AI Agents đang được triển khai trong enterprise: customer service, sales, research. Tìm hiểu case studies, challenges và best practices cho Agent deployment.',
'<h2>Enterprise AI Agents Landscape</h2><p>AI Agents đang được adopt rộng rãi trong enterprise: automation, decision support, customer interaction. Khác với simple chatbots, agents có thể execute complex multi-step tasks autonomously.</p><h2>Case Studies</h2><h3>1. Customer Service Agents</h3><p>AI agents handle customer inquiries, process refunds, escalate when needed. Companies: Zendesk, Intercom, Salesforce Einstein Bots. Reduce response time, 24/7 availability.</p><h3>2. Sales Development Representatives (SDRs)</h3><p>AI agents research leads, send personalized outreach, schedule meetings. Tools: Apollo AI, Clay, Instantly. Augment human sales teams.</p><h3>3. Research Agents</h3><p>Agents search web, read documents, synthesize information. Used in legal research, market analysis, scientific literature review.</p><h3>4. Code Generation Agents</h3><p>Devin (Cognition), Claude Code, Cursor Agent help developers write, review, debug code. Autonomous task completion.</p><h2>Architecture Patterns</h2><ul><li><strong>Tool Use</strong>: Web search, code execution, API calls</li><li><strong>Memory Management</strong>: Short-term, long-term, episodic</li><li><strong>Planning</strong>: Task decomposition, execution ordering</li><li><strong>Reflection</strong>: Error detection và correction</li></ul><h2>Best Practices</h2><ul><li>Start với narrow scope</li><li>Implement robust error handling</li><li>Maintain human oversight</li><li>Monitor và log agent actions</li><li>Plan for graceful degradation</li></ul><h2>Challenges</h2><p>Reliability, cost control, hallucination, security, governance.</p>',
'HTML', '/uploads/image.png', 'AI Agents Enterprise', 'PUBLISHED', NOW() - INTERVAL '26 days',
'AI Agents Trong Thực Tế: Case Studies Enterprise, Best Practices và Challenges',
'Khám phá AI agents deployment trong enterprise, các case studies và best practices cho production Agent systems.',
'ai agent enterprise, AI agent case studies, agent deployment, enterprise AI automation, agent best practices', 'vi-VN', 12, 2600, 1765, 16, false, true, 1, NOW() - INTERVAL '26 days', NOW()),

-- 30
('CNNs for Image Recognition: Từ LeNet Đến ResNet', 'cnn-image-recognition-lenet-resnet',
'Convolutional Neural Networks là backbone của modern computer vision. Tìm hiểu evolution của CNN architectures từ LeNet đến ResNet và beyond.',
'<h2>Convolutional Neural Networks</h2><p>CNN là specialized neural network type cho processing grids of data (images). Key components: convolutional layers, pooling layers, fully connected layers.</p><h2>Key CNN Concepts</h2><h3>Convolutional Layer</h3><p>Sliding filter (kernel) over image to detect features: edges, textures, patterns. Multiple filters learn different features.</p><h3>Pooling Layer</h3><p>Reduce spatial dimensions: Max pooling, Average pooling. Provides translation invariance.</p><h3>Feature Maps</h3><p>Output của each convolutional layer. Early layers detect edges, textures. Later layers detect complex shapes, objects.</p><h2>CNN Evolution</h2><h3>LeNet (1998)</h3><p>Yann LeCun''s pioneering work. 5 layers, handwritten digit recognition (MNIST).</p><h3>AlexNet (2012)</h3><p>ImageNet competition winner. 8 layers, GPU training. Sparked deep learning revolution.</p><h3>VGGNet (2014)</h3><p>Simpler architecture, deeper (16-19 layers). 3x3 convolutions throughout.</p><h3>Inception (2014)</h3><p>GoogLeNet, parallel inception modules, efficient parameters.</p><h3>ResNet (2015)</h3><p>Microsoft. Skip connections (residual connections). Enable training 100+ layers. Solved degradation problem.</p><h3>EfficientNet (2019)</h3><p>Compound scaling of depth, width, resolution. State-of-the-art efficiency.</p><h2>Modern CNNs</h2><p>Vision Transformers (ViT) emerged as alternative. Hybrid approaches combine CNNs + Transformers. ConvNeXt, Swin Transformer.</p>',
'HTML', '/uploads/image.png', 'CNN Image Recognition', 'PUBLISHED', NOW() - INTERVAL '29 days',
'CNN Cho Image Recognition: Từ LeNet Đến ResNet, Evolution Của Computer Vision',
'Giải thích CNN architectures từ LeNet đến ResNet, các components và cách CNN revolutionizing image recognition.',
'CNN là gì, convolutional neural network, image recognition, LeNet, AlexNet, ResNet, computer vision architecture', 'vi-VN', 13, 2800, 1987, 18, false, true, 1, NOW() - INTERVAL '29 days', NOW()),

-- 31
('Transfer Learning: Tận Dụng Knowledge Từ Pre-trained Models', 'transfer-learning-pre-trained-models',
'Transfer learning cho phép reuse knowledge từ pre-trained models cho new tasks. Tìm hiểu cách fine-tune pre-trained models và best practices.',
'<h2>Transfer Learning Là Gì?</h2><p>Transfer learning là kỹ thuật where knowledge gained từ solving one problem được applied to a different but related problem. Thay vì train from scratch, start from pre-trained model.</p><h2>Tại Sao Transfer Learning?</h2><ul><li><strong>Data Efficiency</strong>: Cần ít data hơn đáng kể</li><li><strong>Compute Savings</strong>: Giảm training time và resources</li><li><strong>Better Performance</strong>: Pre-trained models đã học useful representations</li><li><strong>Democratization</strong>: Ai cũng có thể build ML models</li></ul><h2>Pre-trained Models Repository</h2><ul><li><strong>Hugging Face</strong>: 500K+ models (NLP, Vision, Audio)</li><li><strong>TensorFlow Hub</strong>: TF-based models</li><li><strong>PyTorch Hub</strong>: Research models</li><li><strong>Model Zoo</strong>: Pre-trained weights</li></ul><h2>How to Apply Transfer Learning</h2><h3>1. Feature Extraction</h3><p>Use pre-trained model as feature extractor, train only new classifier. Freeze backbone weights. Fast, good when data limited.</p><h3>2. Fine-tuning</h3><p>Unfreeze some/all layers và train整个 model. Slower nhưng better performance. Common strategy: unfreeze gradually (discriminative learning rates).</p><h3>3. Domain Adaptation</h3><p>Adapt pre-trained model sang different domain. May need domain-specific preprocessing.</p><h2>Best Practices</h2><ul><li>Choose model pretrained on similar data</li><li>Match input preprocessing</li><li>Start với frozen backbone</li><li>Use appropriate learning rate (lower for fine-tuning)</li><li>Data augmentation helps</li><li>Monitor for overfitting</li></ul>',
'HTML', '/uploads/image.png', 'Transfer Learning ML', 'PUBLISHED', NOW() - INTERVAL '32 days',
'Transfer Learning: Tận Dụng Pre-trained Models Cho ML Hiệu Quả',
'Hướng dẫn chi tiết về transfer learning, cách fine-tune pre-trained models và best practices cho transfer learning.',
'transfer learning là gì, pre-trained models, feature extraction, fine-tuning, Hugging Face, pretrained model', 'vi-VN', 11, 2400, 1654, 14, false, true, 1, NOW() - INTERVAL '32 days', NOW()),

-- 32
('Large Language Models Architecture: Inside GPT, Claude, Gemini', 'llm-architecture-gpt-claude-gemini',
'Hiểu cách LLMs được xây dựng: architecture, training process, scaling laws và các components technology đằng sau GPT, Claude, Gemini.',
'<h2>LLM Architecture Overview</h2><p>LLMs are large neural networks (billions-trillions of parameters) trained on massive text data. Core architecture: Transformer decoder (mostly) với scaling và enhancements.</p><h2>Transformer Architecture for LLMs</h2><ul><li><strong>Tokenization</strong>: Subword tokenizers (BPE, WordPiece, SentencePiece)</li><li><strong>Embeddings</strong>: Convert tokens to vectors</li><li><strong>Positional Encoding</strong>: Add position information</li><li><strong>Attention</strong>: Multi-head self-attention</li><li><strong>FFN</strong>: Feed-forward networks</li><li><strong>Layer Norm</strong>: Stabilize training</li></ul><h2>Training Process</h2><h3>Pre-training</h3><p>Next token prediction trên internet-scale text. Next-token prediction là simple objective but enables learning complex representations. Compute-intensive (millions of GPU hours).</p><h3>Post-training</h3><ul><li><strong>Instruction Tuning</strong>: Fine-tune on instruction-response pairs</li><li><strong>RLHF</strong>: Human preference feedback</li><li><strong>Constitutional AI</strong>: Self-critique based on principles</li></ul><h2>Scaling Laws</h2><p>Performance improves predictably với: more parameters, more data, more compute. Chinchilla scaling: optimal ratio of parameters to training tokens.</p><h2>Model Innovations</h2><ul><li><strong>RoPE (Rotary Position Embedding)</strong>: Better position encoding</li><li><strong>Grouped Query Attention</strong>: Efficient attention</li><li><strong>Mixture of Experts</strong>: Sparse activation (Mixtral, MoE)</li><li><strong>Flash Attention</strong>: Memory-efficient attention</li></ul><h2>Major LLMs</h2><p>GPT-4, Claude 3, Gemini, Llama 3, Mistral, Command R, Grok, Phi-3.</p>',
'HTML', '/uploads/image.png', 'LLM Architecture Deep Learning', 'PUBLISHED', NOW() - INTERVAL '34 days',
'LLM Architecture Toàn Diện: Inside GPT, Claude, Gemini và Cách LLMs Hoạt Động',
'Giải thích chi tiết LLM architecture, training process, scaling laws và công nghệ đằng sau các mô hình ngôn ngữ lớn.',
'LLM architecture, GPT architecture, LLM training, scaling laws, pre-training, RLHF, transformer LLM', 'vi-VN', 15, 3200, 3456, 41, true, true, 1, NOW() - INTERVAL '34 days', NOW()),

-- 33
('AI trong Manufacturing: Smart Factory và Tự Động Hóa Thông Minh', 'ai-manufacturing-smart-factory',
'AI đang transform manufacturing: predictive maintenance, quality control, supply chain optimization. Tìm hiểu Industry 4.0 và AI applications trong sản xuất.',
'<h2>Industry 4.0 và AI</h2><p>Industry 4.0 represents the fourth industrial revolution: convergence of physical và digital. AI là core của smart manufacturing, enabling autonomous decision-making và optimization.</p><h2>Predictive Maintenance</h2><p>AI analyze sensor data để predict equipment failure trước khi nó xảy ra. Reduce downtime, extend equipment life. GE, Siemens, PTC leading in this space.</p><h2>Quality Control</h2><p>Computer vision AI detect defects in products: scratches, dents, misalignments. Higher accuracy than human inspectors, consistent quality, 24/7 operation.</p><h2>Process Optimization</h2><p>AI optimize manufacturing parameters: temperature, pressure, speed, materials. Digital twins simulate processes, find optimal settings. Reduce waste, improve efficiency.</p><h2>Supply Chain AI</h2><p>Demand forecasting, inventory optimization, logistics routing. AI predicts disruptions, suggests alternatives. COVID showed importance của AI-powered supply chains.</p><h2>Robotics in Manufacturing</h2><p>Cobots (collaborative robots) work alongside humans. AI enables robots adapt to new tasks, handle variation. Elon Musk''s Tesla, BMW use AI-powered robotics extensively.</p><h2>Digital Twins</h2><p>Virtual replicas của physical factories. AI-powered simulation enables testing changes without disrupting production.</p><h2>Benefits</h2><p>30-50% reduction in downtime, 20-25% improvement in quality, 10-20% increase in productivity.</p>',
'HTML', '/uploads/image.png', 'AI Manufacturing Smart Factory', 'PUBLISHED', NOW() - INTERVAL '36 days',
'AI Trong Manufacturing: Smart Factory, Predictive Maintenance và Industry 4.0',
'Khám phá ứng dụng AI trong sản xuất, từ predictive maintenance đến quality control và smart factory.',
'AI manufacturing, smart factory, Industry 4.0, predictive maintenance, quality control AI, cobots, digital twins', 'vi-VN', 12, 2600, 1543, 13, false, true, 1, NOW() - INTERVAL '36 days', NOW()),

-- 34
('Time Series Forecasting Với AI: Dự Báo Chuỗi Thời Gian', 'time-series-forecasting-ai',
'AI models cho time series forecasting: demand forecasting, stock prediction, anomaly detection. Tìm hiểu các methods từ ARIMA đến Transformers.',
'<h2>Time Series Forecasting</h2><p>Dự đoán future values based on historical data. Critical for: demand planning, financial forecasting, resource allocation, anomaly detection.</p><h2>Traditional Methods</h2><h3>ARIMA</h3><p>AutoRegressive Integrated Moving Average. Combines autoregression, differencing, moving average. Good for univariate, stationary series.</p><h3>Exponential Smoothing</h3><p>Holt-Winters methods handle trend và seasonality. Simple, interpretable, still widely used.</p><h3>Prophet</h3><p>Facebook''s forecasting tool. Handles holidays, seasonality, changepoints. User-friendly.</p><h2>Deep Learning Methods</h2><h3>LSTM/GRU</h3><p>Recurrent networks capture temporal dependencies. Good for long sequences.</p><h3>Temporal Fusion Transformer (TFT)</h3><p>Combines static, known inputs, historic, future unknown inputs. Interpretable attention.</p><h3>N-BEATS</h3><p>Deep neural network for interpretable time series. Pure deep learning, no domain-specific components.</p><h3>Neural Prophet</h3><p>Combines Prophet + PyTorch. Neural network-based, better accuracy.</p><h2>Foundation Models for Time Series</h2><p>TimesFM (Google), Chronos (Amazon), Lag-Llama (AWS). Pre-trained models for zero-shot forecasting.</p><h2>Best Practices</h2><ul><li>Handle missing values carefully</li><li>Decompose: trend, seasonality, residuals</li><li>Feature engineering: lags, rolling statistics</li><li>Cross-validation for time series</li><li>Ensemble multiple models</li></ul>',
'HTML', '/uploads/image.png', 'Time Series Forecasting AI', 'PUBLISHED', NOW() - INTERVAL '38 days',
'Time Series Forecasting Với AI: Từ ARIMA Đến Transformer Models',
'Hướng dẫn chi tiết về time series forecasting với AI, các phương pháp traditional và deep learning.',
'time series forecasting, AI dự báo, LSTM, ARIMA, Prophet, TFT, demand forecasting, anomaly detection', 'vi-VN', 13, 2800, 1432, 11, false, true, 1, NOW() - INTERVAL '38 days', NOW()),

-- 35
('AI và Privacy: Bảo Vệ Dữ Liệu Trong Kỷ Nguyên AI', 'ai-privacy-data-protection',
'AI models require huge amounts of data, đặt ra câu hỏi về privacy. Tìm hiểu về federated learning, differential privacy, data anonymization và AI privacy.',
'<h2>AI vs Privacy Tension</h2><p>AI thrives on data, nhưng data collection và usage raises serious privacy concerns. GDPR, CCPA, và other regulations require careful handling của personal information.</p><h2>Privacy-Preserving ML Techniques</h2><h3>Federated Learning</h3><p>Train models across decentralized data sources. Data stays on devices, only model updates shared. Used by Google for keyboard prediction, Apple for Siri improvement.</p><h3>Differential Privacy</h3><p>Add calibrated noise to data or computations. Guarantees individual records cannot be inferred from outputs. Apple, Google use this for analytics.</p><h3>Data Anonymization</h3><p>Remove identifying information: names, IDs, addresses. K-anonymity, L-diversity, T-closeness techniques.</p><h3>Secure Multi-Party Computation</h3><p>Multiple parties compute on combined data without revealing individual data. Cryptographic approach.</p><h3>Homomorphic Encryption</h3><p>Compute on encrypted data. Results encrypted, only authorized party can decrypt. Emerging technology.</p><h2>Privacy in Practice</h2><ul><li>Data minimization: collect only necessary</li><li>Purpose limitation: use only for stated purposes</li><li>Consent management</li><li>Right to deletion (right to be forgotten)</li><li>Privacy by design</li></ul><h2>AI-Specific Privacy Risks</h2><ul><li>Model inversion attacks</li><li>Membership inference attacks</li><li>Data leakage from models</li><li>Re-identification of anonymized data</li></ul><h2>Best Practices</h2><p>Privacy impact assessments, data governance frameworks, encryption, access controls, regular audits.</p>',
'HTML', '/uploads/image.png', 'AI Privacy Data Protection', 'PUBLISHED', NOW() - INTERVAL '40 days',
'AI và Privacy: Federated Learning, Differential Privacy và Bảo Vệ Dữ Liệu Trong AI',
'Khám phá các kỹ thuật privacy-preserving ML, federated learning, differential privacy và cách bảo vệ data trong AI.',
'AI privacy là gì, federated learning, differential privacy, data protection, privacy-preserving ML, GDPR AI', 'vi-VN', 12, 2600, 1321, 12, false, true, 1, NOW() - INTERVAL '40 days', NOW()),

-- 36
('Chatbot Development Với AI: Từ Rule-Based Đến LLM-Powered', 'chatbot-development-ai-llm',
'Xây dựng chatbots: từ simple rule-based đến sophisticated LLM-powered assistants. Tìm hiểu architectures, frameworks và best practices.',
'<h2>Chatbot Evolution</h2><p>Chatbots đã evolved từ simple menu-based systems đến sophisticated AI assistants. Mỗi generation có strengths và limitations riêng.</p><h2>Chatbot Types</h2><h3>1. Rule-Based</h3><p>Decision trees, keyword matching. Predictable, controllable, limited flexibility. Good for FAQ, simple transactions.</p><h3>2. Retrieval-Based</h3><p>Match user input to response database. Use NLP for intent matching. Better flexibility, still template-based.</p><h3>3. Generative</h3><p>LLM generates responses dynamically. Most flexible, can handle novel inputs. Hallucination risks, needs guardrails.</p><h3>4. Hybrid</h3><p>Combine retrieval và generative. Best of both worlds: grounded responses + flexible generation.</p><h2>Key Components</h2><ul><li><strong>NLU</strong>: Intent recognition, entity extraction</li><li><strong>Dialogue Management</strong>: State tracking, flow control</li><li><strong>Response Generation</strong>: Templates, generation models</li><li><strong>Integration</strong>: APIs, backend systems</li></ul><h2>Frameworks</h2><ul><li><strong>Dialogflow</strong>: Google''s conversational AI</li><li><strong>Lex</strong>: AWS chatbot service</li><li><strong>Botpress</strong>: Open-source platform</li><li><strong>LangChain</strong>: LLM-powered agents</li><li><strong>Rasa</strong>: Open-source NLU</li></ul><h2>Best Practices</h2><ul><li>Start với clear use cases</li><li>Design natural conversation flows</li><li>Implement error handling</li><li>Monitor và continuously improve</li><li>Consider multi-channel deployment</li></ul>',
'HTML', '/uploads/image.png', 'Chatbot AI Development', 'PUBLISHED', NOW() - INTERVAL '42 days',
'Chatbot Development: Từ Rule-Based Đến LLM-Powered Assistants Chi Tiết',
'Hướng dẫn xây dựng chatbot, các loại chatbot, architectures và best practices cho chatbot development.',
'chatbot development là gì, xây dựng chatbot, chatbot AI, LLM chatbot, conversational AI, chatbot framework', 'vi-VN', 11, 2400, 1210, 10, false, true, 1, NOW() - INTERVAL '42 days', NOW()),

-- 37
('AI Benchmarking: Đo Lường Hiệu Suất Mô Hình AI', 'ai-benchmarking-performance',
'Benchmarking là cách đánh giá và so sánh AI models. Tìm hiểu về common benchmarks: MMLU, HumanEval, ImageNet, GLUE và cách interpret results.',
'<h2>Tại Sao Benchmarking Quan Trọng?</h2><p>Benchmarks provide standardized way để measure và compare AI models. Enable fair comparison, track progress, identify strengths và weaknesses.</p><h2>NLP Benchmarks</h2><h3>GLUE / SuperGLUE</h3><p>General Language Understanding Evaluation. Suite of tasks: sentiment, similarity, inference. Historical benchmark đã được "saturated".</p><h3>MMLU (Massive Multitask Language Understanding)</h3><p>57 subjects: science, math, history, law, ethics. Measures broad knowledge và reasoning. Used by many frontier models.</p><h3>HumanEval</h3><p>Programming challenges (164 problems). Measures code generation ability. Used for GPT-4, Claude, etc.</p><h3>GSM8K</h3><p>Grade school math problems (8K). Tests multi-step reasoning.</p><h3>BBH (BIG-Bench Hard)</h3><p>Subset of BIG-Bench tasks that remain challenging for models.</p><h3>MT-Bench</h3><p>Multi-turn questions for chatbots. Tests instruction following, reasoning.</p><h2>Vision Benchmarks</h2><ul><li><strong>ImageNet</strong>: 1000 classes, image classification</li><li><strong>COCO</strong>: Object detection, segmentation</li><li><strong>ADE20K</strong>: Scene parsing</li><li><strong>KITTI</strong>: Autonomous driving</li></ul><h2>Agent Benchmarks</h2><ul><li><strong>GAIA</strong>: General AI assistants</li><li><strong>AgentBench</strong>: LLM agents in environments</li><li><strong>WebArena</strong>: Web-based tasks</li></ul><h2>Limitations</h2><p>Benchmark saturation, overfitting to benchmarks, missing real-world performance. Always complement with domain-specific evaluation.</p>',
'HTML', '/uploads/image.png', 'AI Benchmarking Performance', 'PUBLISHED', NOW() - INTERVAL '44 days',
'AI Benchmarking: Đo Lường và So Sánh Mô Hình AI Với Common Benchmarks',
'Tìm hiểu về AI benchmarking, các benchmarks phổ biến MMLU, HumanEval, ImageNet và cách đánh giá AI models.',
'ai benchmarking là gì, benchmark AI, MMLU, HumanEval, GLUE, ImageNet, AI performance measurement', 'vi-VN', 10, 2200, 1109, 9, false, true, 1, NOW() - INTERVAL '44 days', NOW()),

-- 38
('Computer Vision in Autonomous Vehicles: AI Cho Xe Tự Lái', 'computer-vision-autonomous-vehicles',
'Computer vision là critical component của autonomous vehicles. Tìm hiểu về perception systems, object detection, lane tracking và challenges.',
'<h2>Autonomous Vehicle Overview</h2><p>Self-driving cars use combination of sensors: cameras, LiDAR, radar, ultrasonic. AI perception systems process this data để understand environment.</p><h2>Perception Tasks</h2><ul><li><strong>Object Detection</strong>: Cars, pedestrians, cyclists, obstacles</li><li><strong>Semantic Segmentation</strong>: Road, lane markings, traffic signs</li><li><strong>Depth Estimation</strong>: 3D understanding from 2D images</li><li><strong>Lane Detection</strong>: Lane boundaries, drivable area</li><li><strong>Traffic Sign Recognition</strong>: Speed limits, stop signs, signals</li><li><strong>Motion Forecasting</strong>: Predict trajectories of other road users</li></ul><h2>Sensor Fusion</h2><p>Combine data from multiple sensors: camera (visual), LiDAR (3D points), radar (speed, distance). Each has strengths: camera for classification, LiDAR for depth, radar for adverse weather.</p><h2>Key CV Models</h2><ul><li><strong>YOLO</strong>: Real-time object detection</li><li><strong>PointPillars</strong>: LiDAR-based detection</li><li><strong>BEV Perception</strong>: Bird''s Eye View representation</li><li><strong>Occupancy Networks</strong>: 3D scene understanding</li></ul><h2>Companies và Progress</h2><ul><li><strong>Waymo</strong>: Level 4 autonomous (no driver)</li><li><strong>Tesla</strong>: Vision-only approach (FSD)</li><li><strong>Mobileye</strong>: ADAS + AV technology</li><li><strong>Cruise</strong>: GM''s autonomous service</li></ul><h2>Challenges</h2><ul><li>Adverse weather (rain, snow, fog)</li><li>Edge cases, corner cases</li><li>Real-time processing requirements</li><li>Safety validation</li><li>Regulatory approval</li></ul>',
'HTML', '/uploads/image.png', 'Autonomous Vehicle AI Vision', 'PUBLISHED', NOW() - INTERVAL '46 days',
'Computer Vision Cho Autonomous Vehicles: Xe Tự Lái, Perception Systems và AI Vision',
'Khám phá computer vision trong autonomous vehicles, từ object detection đến sensor fusion và các thách thức của xe tự lái.',
'autonomous vehicle, xe tự lái, self-driving car, computer vision autonomous, Tesla FSD, Waymo, LiDAR', 'vi-VN', 13, 2800, 1432, 13, false, true, 1, NOW() - INTERVAL '46 days', NOW()),

-- 39
('AI Model Deployment: Từ Jupyter Notebook Đến Production', 'ai-model-deployment-production',
'Deploying ML models là bước quan trọng để deliver value. Tìm hiểu về serving architectures, MLOps, monitoring và common deployment patterns.',
'<h2>Why Deployment Matters</h2><p>Models only create value when deployed. Many ML projects fail at deployment stage. Production systems have different requirements than notebooks.</p><h2>Deployment Patterns</h2><h3>1. Batch Prediction</h3><p>Run predictions on schedule on data batches. Simple, cost-effective for non-time-sensitive use cases. Use case: daily recommendations, report generation.</p><h3>2. Real-time Inference</h3><p>API-based serving for on-demand predictions. Low latency required. Use case: fraud detection, chatbots, search ranking.</p><h3>3. Edge Deployment</h3><p>Deploy on edge devices: mobile, IoT. Low latency, offline capability, privacy. Use case: on-device translation, camera filters.</p><h3>4. Stream Processing</h3><p>Process data streams in real-time. High throughput, low latency. Use case: real-time recommendations, anomaly detection.</p><h2>Serving Frameworks</h2><ul><li><strong>TensorFlow Serving</strong>: TF models, production-tested</li><li><strong>TorchServe</strong>: PyTorch models</li><li><strong>Triton</strong>: Multi-framework, GPU optimization</li><li><strong>FastAPI</strong>: Lightweight, Python-native</li><li><strong>vLLM</strong>: Optimized LLM serving</li><li><strong>Ray Serve</strong>: Scalable, flexible</li></ul><h2>MLOps</h2><p>Practices for deploying và maintaining ML systems: CI/CD for ML, model versioning, feature stores, model monitoring, automated retraining.</p><h2>Monitoring</h2><ul><li>Model performance (accuracy, latency)</li><li>Data drift</li><li>Concept drift</li><li>System health</li><li>Business metrics</li></ul>',
'HTML', '/uploads/image.png', 'ML Model Deployment Production', 'PUBLISHED', NOW() - INTERVAL '48 days',
'AI Model Deployment: Từ Jupyter Notebook Đến Production Chi Tiết',
'Hướng dẫn deployment AI models, serving architectures, MLOps và monitoring trong production.',
'AI model deployment, production ML, MLOps, model serving, TensorFlow Serving, vLLM, model monitoring', 'vi-VN', 12, 2600, 1210, 10, false, true, 1, NOW() - INTERVAL '48 days', NOW()),

-- 40
('AI Research Papers: Cách Đọc và Theo Dõi Research', 'ai-research-papers-reading',
'Keeping up với AI research là challenging. Tìm hiểu cách đọc papers hiệu quả, theo dõi new research và filter signal from noise.',
'<h2>Tại Sao Đọc Papers?</h2><p>AI evolves rapidly. Papers là primary source của new discoveries, techniques, và state-of-the-art. Staying current là essential cho researchers và practitioners.</p><h2>How to Read AI Papers</h2><h3>1. Skim First</h3><p>Title, abstract, figures, conclusion. Understand main contribution before diving deep.</p><h3>2. Read for Understanding</h3><p>Introduction, related work, methodology. Understand approach và rationale.</p><h3>3. Evaluate</h3><p>Benchmarks used, experimental setup, ablation studies, limitations discussed.</p><h3>4. Reproduce (Optional)</h3><p>Try to implement key ideas. Deepens understanding.</p><h2>Key Venues</h2><ul><li><strong>NeurIPS</strong>: Large ML conference</li><li><strong>ICML</strong>: Machine learning</li><li><strong>ICLR</strong>: Deep learning focused</li><li><strong>CVPR/ECCV/ICCV</strong>: Computer vision</li><li><strong>ACL/EMNLP/NAACL</strong>: NLP</li><li><strong>JMLR, TMLR</strong>: ML journals</li></ul><h2>Resources</h2><ul><li><strong>arXiv</strong>: Preprint repository (cs.AI, cs.LG, cs.CL)</li><li><strong> Papers With Code</strong>: Papers + implementations</li><li><strong>Connected Papers</strong>: Related papers graph</li><li><strong>arXiv Sanity</strong>: Paper search và filtering</li><li><strong>TLDR AI</strong>: Daily paper summaries</li></ul><h2>Staying Current</h2><ul><li>Twitter/X (researchers share preprints)</li><li>Hugging Face daily papers</li><li>Google Scholar alerts</li><li>Weekly AI newsletters</li></ul><h2>Effective Strategies</h2><p>Read selectively, focus on breakthrough papers, maintain notes, implement key ideas, discuss with peers.</p>',
'HTML', '/uploads/image.png', 'AI Research Papers Reading', 'PUBLISHED', NOW() - INTERVAL '50 days',
'AI Research Papers: Cách Đọc và Theo Dõi AI Research Hiệu Quả',
'Hướng dẫn đọc AI research papers, theo dõi papers mới và staying current với AI research.',
'đọc AI papers, AI research, research papers, NeurIPS, ICML, arXiv, paper reading strategy, staying current AI', 'vi-VN', 9, 2000, 987, 8, false, true, 1, NOW() - INTERVAL '50 days', NOW()),

-- 41
('AI Career Guide: Trở Thành AI Engineer/Data Scientist', 'ai-career-guide-engineer-data-scientist',
'AI careers đang hot nhất trong tech. Tìm hiểu về career paths, required skills, resources để become AI engineer hoặc data scientist.',
'<h2>AI Career Landscape</h2><p>High demand, competitive salaries, meaningful work. Multiple paths: ML Engineer, Data Scientist, AI Researcher, AI Product Manager, MLOps Engineer.</p><h2>Essential Skills</h2><h3>Technical</h3><ul><li>Python (most important)</li><li>Mathematics (linear algebra, calculus, statistics)</li><li>ML/DL fundamentals</li><li>SQL và data manipulation</li><li>Cloud platforms (AWS, GCP, Azure)</li></ul><h3>Practical</h3><ul><li>Frameworks: PyTorch, TensorFlow, Hugging Face</li><li>Experiment tracking: MLflow, W&B</li><li>Model serving</li><li>Software engineering practices</li></ul><h3>Soft Skills</h3><ul><li>Communication</li><li>Problem-solving</li><li>Business understanding</li><li>Continuous learning</li></ul><h2>Learning Path</h2><ol><li>Python + Math fundamentals</li><li>ML basics (scikit-learn, Kaggle)</li><li>Deep Learning (fast.ai, Coursera)</li><li>Specialization (NLP, Vision, etc.)</li><li>Projects + Portfolio</li><li>Interview prep</li></ol><h2>Resources</h2><ul><li><strong>Courses</strong>: fast.ai, Andrew Ng (Coursera), CS224N, CS231N</li><li><strong>Practice</strong>: Kaggle competitions</li><li><strong>Books</strong>: Hands-On ML, Deep Learning (Goodfellow)</li><li><strong>Projects</strong>: Open source, personal projects</li></ul><h2>Job Search</h2><p>Resume optimization, portfolio projects, LeetCode (for coding), system design, ML system design interviews.</p><h2>Compensation</h2><p>AI roles command premium salaries. Entry level: $100K-150K+, Senior: $200K-500K+ in US. Vietnam: competitive local market rates.</p>',
'HTML', '/uploads/image.png', 'AI Career Data Scientist', 'PUBLISHED', NOW() - INTERVAL '52 days',
'AI Career Guide: Trở Thành AI Engineer Hoặc Data Scientist Chi Tiết',
'Hướng dẫn career path trong AI, required skills, learning resources và tips cho AI jobs.',
'AI career, data scientist, ML engineer, AI engineer, học AI, career path AI, AI jobs', 'vi-VN', 11, 2400, 1654, 19, true, true, 1, NOW() - INTERVAL '52 days', NOW()),

-- 42
('LLM Evaluation: Đánh Giá Chất Lượng Large Language Models', 'llm-evaluation-quality',
'Đánh giá LLMs là challenging: many metrics, many use cases. Tìm hiểu về LLM evaluation frameworks, human evaluation, automated metrics.',
'<h2>Tại Sao LLM Evaluation Khó?</h2><p>LLMs có diverse capabilities: reasoning, coding, creativity, factuality, safety. No single metric captures everything. Subjective quality judgments.</p><h2>Evaluation Categories</h2><h3>Knowledge và Factuality</h3><p>TriviaQA, Natural Questions, PopQA test factual knowledge. FActScore measures factual consistency of generated text.</p><h3>Reasoning</h3><p>GSM8K (math), BIG-Bench Hard, ARC (reasoning), MMLU (broad knowledge). Chain-of-thought helps.</p><h3>Coding</h3><p>HumanEval, MBPP, CodexEval. Not just correctness but code quality, efficiency.</p><h3>Safety</h3><p>TruthfulQA (misinformation), BBQ (bias), RealToxicityPrompts. Red-teaming for vulnerabilities.</p><h3>Helpfulness</h3><p>MT-Bench, Chatbot Arena, LMSYS. Human preference rankings.</p><h2>Evaluation Methods</h2><h3>Automated Metrics</h3><ul><li>BLEU, ROUGE (n-gram overlap)</li><li>BERTScore, MoverScore (semantic similarity)</li><li>G-Eval (LLM-based evaluation)</li></ul><h3>Human Evaluation</h3><p>Gold standard but expensive, slow, subjective. Crowdsourcing platforms: Scale AI, Amazon MTurk.</p><h3>LLM-as-Judge</h3><p>Use powerful LLMs to evaluate other LLMs. Scalable, correlates well with human judgment. Bias issues.</p><h2>Frameworks</h2><ul><li><strong>EleutherAI LM Evaluation Harness</strong></li><li><strong>LLM-Eval</strong></li><li><strong>OpenCompass</strong></li><li><strong>LangChain Evaluation</strong></li></ul><h2>Best Practices</h2><p>Multiple metrics, task-specific evaluation, human evaluation for critical cases, continuous monitoring.</p>',
'HTML', '/uploads/image.png', 'LLM Evaluation Metrics', 'PUBLISHED', NOW() - INTERVAL '54 days',
'LLM Evaluation: Đánh Giá Chất Lượng Large Language Models Chi Tiết',
'Hướng dẫn đánh giá LLMs, các evaluation frameworks, metrics và best practices cho LLM evaluation.',
'LLM evaluation là gì, đánh giá LLM, LLM metrics, evaluation frameworks, human evaluation, automated evaluation', 'vi-VN', 12, 2600, 1123, 10, false, true, 1, NOW() - INTERVAL '54 days', NOW()),

-- 43
('Diffusion Models: Tạo Hình Ảnh Từ Noise Với AI', 'diffusion-models-image-generation',
'Diffusion models như DALL-E, Stable Diffusion đã cách mạng hóa image generation. Tìm hiểu cách diffusion hoạt động từ forward process đến reverse process.',
'<h2>How Diffusion Works</h2><p>Diffusion models learn to generate images by learning to reverse a gradual noising process. Two processes: forward (add noise) và reverse (remove noise).</p><h2>Forward Process</h2><p>Add Gaussian noise to image over T steps until image is pure noise. This is fixed, no learning required. x_0 → x_1 → ... → x_T ≈ N(0,I)</p><h2>Reverse Process</h2><p>Neural network learns to denoise: predict noise added, subtract to get cleaner image. p_θ(x_{t-1}|x_t). Repeating gives clean image from pure noise.</p><h2>Training Objective</h2><p>Predict the noise ε_θ(x_t, t) that was added. Simple MSE loss between predicted và actual noise. With timestep conditioning, same model handles all noise levels.</p><h2>Key Components</h2><ul><li><strong>U-Net</strong>: Architecture for denoising (with attention)</li><li><strong>Noise Schedule</strong>: How noise level changes per step</li><li><strong>Conditioning</strong>: How to guide generation (text, image)</li><li><strong>Classifier-Free Guidance</strong>: Better text-image alignment</li></ul><h2>Prominent Models</h2><ul><li><strong>DALL-E 3</strong>: OpenAI''s latest</li><li><strong>Stable Diffusion 3</strong>: Open-source, improved</li><li><strong>Midjourney</strong>: Artistic generation</li><li><strong>Imagen</strong>: Google''s model</li><li><strong>Flux</strong>: New open-source competitor</li></ul><h2>Beyond Images</h2><p>Video diffusion (Sora, Runway), Audio generation, 3D generation, Molecule design.</p><h2>Conditioning Methods</h2><ul><li><strong>Classifier Guidance</strong>: External classifier guides</li><li><strong>Classifier-Free Guidance</strong>: Joint training for better guidance</li><li><strong>Cross-Attention</strong>: Text conditioning via attention</li></ul>',
'HTML', '/uploads/image.png', 'Diffusion Models AI Art', 'PUBLISHED', NOW() - INTERVAL '56 days',
'Diffusion Models: Cách Tạo Hình Ảnh Từ Noise Với Stable Diffusion, DALL-E',
'Giải thích chi tiết cách diffusion models hoạt động, forward process, reverse process và cách text conditioning hoạt động.',
'diffusion models là gì, Stable Diffusion, DALL-E, image generation AI, generative AI, denoising diffusion', 'vi-VN', 13, 2800, 1654, 18, false, true, 1, NOW() - INTERVAL '56 days', NOW()),

-- 44
('AI in Cybersecurity: Phát Hiện Mối Đe Dọa Với Machine Learning', 'ai-cybersecurity-threat-detection',
'AI đang becoming essential trong cybersecurity: threat detection, anomaly detection, vulnerability assessment. Tìm hiểu về AI-powered security.',
'<h2>AI trong Cybersecurity</h2><p>Traditional security systems rely on known signatures. AI can detect unknown threats, identify patterns, adapt to new attack vectors. Essential as attack volume và sophistication grow.</p><h2>Threat Detection</h2><h3>Network Intrusion Detection</h3><p>AI analyze network traffic patterns để detect anomalies: unusual ports, traffic volumes, protocol violations. Supervised learning for known attacks, unsupervised for zero-days.</p><h3>Malware Detection</h3><p>Classify files as malicious/benign based on static features, behavior. Deep learning outperforms traditional AV signatures.</p><h3>Phishing Detection</h3><p>ML models analyze email content, sender reputation, URLs để identify phishing attempts. Natural language features detect social engineering.</p><h2>Anomaly Detection</h2><p>Establish baseline of normal behavior, detect deviations. User behavior analytics (UEBA), network behavior analysis. Canary tokens, honeypots provide labeled anomalies.</p><h2>Vulnerability Assessment</h2><p>AI-powered code analysis finds vulnerabilities before deployment. Fix suggestions, prioritization by exploitability.</p><h2>Security Operations</h2><ul><li>SIEM (Security Information và Event Management) với AI</li><li>Automated incident response</li><li>Threat intelligence synthesis</li><li>Risk assessment automation</li></ul><h2>AI-Powered Security Tools</h2><ul><li>Darktrace (enterprise AI security)</li><li>CrowdStrike (endpoint protection)</li><li>Palo Alto Networks</li><li>Microsoft Sentinel</li></ul><h2>Attacker AI</h2><p>Adversaries also use AI: AI-generated phishing, polymorphic malware, automated vulnerability scanning. Defensive AI must stay ahead.</p>',
'HTML', '/uploads/image.png', 'AI Cybersecurity Threat Detection', 'PUBLISHED', NOW() - INTERVAL '58 days',
'AI Trong Cybersecurity: Phát Hiện Mối Đe Dọa, Malware Detection và AI-Powered Security',
'Khám phá ứng dụng AI trong cybersecurity, từ threat detection đến anomaly detection và vulnerability assessment.',
'AI cybersecurity, threat detection AI, malware detection, anomaly detection security, AI phát hiện mối đe dọa', 'vi-VN', 12, 2600, 1210, 11, false, true, 1, NOW() - INTERVAL '58 days', NOW()),

-- 45
('Multimodal RAG: Kết Hợp Văn Bản, Hình Ảnh và Video Trong RAG', 'multimodal-rag-text-image-video',
'Mở rộng RAG beyond text: documents với images, tables, charts. Tìm hiểu về multimodal embeddings, retrieval và generation.',
'<h2>Multimodal RAG Overview</h2><p>Traditional RAG handles text. Real-world documents contain images, tables, charts, diagrams. Multimodal RAG retrieves và generates across all modalities.</p><h2>Multimodal Embeddings</h2><h3>Approaches</h3><ul><li><strong>Image captions</strong>: Generate captions, embed text</li><li><strong>Joint embeddings</strong>: Single model for text + image ( CLIP, BLIP)</li><li><strong>Hierarchical</strong>: Different models for different modalities</li></ul><h3>Models</h3><ul><li><strong>CLIP</strong>: Image-text joint embeddings</li><li><strong>BLIP</strong>: Image captioning + embedding</li><li><strong>Llava</strong>: Visual instruction following</li><li><strong>GPT-4V</strong>: Vision + language</li></ul><h2>Retrieval Strategies</h2><ul><li><strong>Text-first</strong>: Retrieve relevant text chunks, fetch associated images</li><li><strong>Image-first</strong>: Retrieve relevant images + surrounding context</li><li><strong>Hybrid</strong>: Combine both approaches</li></ul><h2>Multimodal Indexing</h2><p>Index both text chunks và images. Link images to their source documents. Maintain spatial context (where in document).</p><h2>Generation</h2><p>Multimodal LLM generates response that references retrieved images. Include images in context. Describe charts, explain diagrams.</p><h2>Use Cases</h2><ul><li>Scientific papers (figures, tables)</li><li>Financial reports (charts, tables)</li><li>Product manuals (diagrams, images)</li><li>Legal documents (signatures, stamps)</li><li>E-commerce (product descriptions + images)</li></ul><h2>Implementation</h2><p>LLaVA, GPT-4V, Gemini for multimodal understanding. ChromaDB, Weaviate support multimodal vectors.</p>',
'HTML', '/uploads/image.png', 'Multimodal RAG AI', 'PUBLISHED', NOW() - INTERVAL '60 days',
'Multimodal RAG: Kết Hợp Văn Bản, Hình Ảnh và Video Trong RAG Systems',
'Hướng dẫn về Multimodal RAG, các approaches, multimodal embeddings và cách implement RAG cho documents với images.',
'multimodal RAG là gì, RAG images, multimodal embeddings, CLIP, BLIP, LLaVA, GPT-4V RAG', 'vi-VN', 12, 2600, 987, 8, false, true, 1, NOW() - INTERVAL '60 days', NOW()),

-- 46
('AI trong Agriculture: Precision Farming và Smart Agriculture', 'ai-agriculture-precision-farming',
'AI đang transform agriculture: precision farming, crop monitoring, yield prediction. Tìm hiểu về applications của AI trong nông nghiệp hiện đại.',
'<h2>AI in Agriculture</h2><p>Feeding growing global population requires more efficient, sustainable agriculture. AI enables precision farming: right input, right place, right time.</p><h2>Crop Monitoring</h2><h3>Satellite + Drone Imagery</h3><p>Multispectral imaging detect crop stress before visible symptoms. NDVI (Normalized Difference Vegetation Index) for plant health. AI analyzes imagery at scale.</p><h3>Disease Detection</h3><p>Computer vision identify plant diseases from leaf images. Apps like Plantix help farmers diagnose issues. Early detection prevents spread.</p><h2>Precision Farming</h2><ul><li><strong>Variable Rate Application</strong>: Adjust fertilizer, pesticide by zone</li><li><strong>Yield Prediction</strong>: ML models predict harvest based on weather, soil, historical data</li><li><strong>Optimal Planting</strong>: AI suggests best planting density, depth, timing</li></ul><h2>Soil Analysis</h2><p>AI analyze soil samples, satellite data để recommend nutrients, irrigation. Precision irrigation: exactly right amount of water.</p><h2>Autonomous Farming</h2><ul><li>John Deere autonomous tractors</li><li>Robotic weeders (carbon robotics)</li><li>Automated harvesters</li><li>Drone-based planting, spraying</li></ul><h2>Supply Chain AI</h2><ul><li>Demand forecasting</li><li>Quality grading (computer vision)</li><li>Traceability (blockchain + AI)</li><li>Price prediction</li></ul><h2>Benefits</h2><ul><li>20-30% yield increase</li><li>30-50% reduction in water use</li><li>20-40% reduction in fertilizer</li><li>Reduced environmental impact</li></ul><h2>Challenges</h2><p>Digital divide, smallholder farmers, connectivity in rural areas, data availability.</p>',
'HTML', '/uploads/image.png', 'AI Agriculture Precision Farming', 'PUBLISHED', NOW() - INTERVAL '62 days',
'AI Trong Nông Nghiệp: Precision Farming, Crop Monitoring và Smart Agriculture',
'Khám phá ứng dụng AI trong nông nghiệp, từ precision farming đến autonomous tractors và crop disease detection.',
'AI agriculture, precision farming, smart agriculture, crop monitoring AI, autonomous tractors, AI nông nghiệp', 'vi-VN', 12, 2600, 1098, 9, false, true, 1, NOW() - INTERVAL '62 days', NOW()),

-- 47
('XAI: Explainable AI - Hiểu Cách AI Đưa Ra Quyết Định', 'explainable-ai-xai',
'Explainable AI (XAI) helps humans understand how AI makes decisions. Tìm hiểu về interpretability methods: SHAP, LIME, attention maps và tại sao XAI matters.',
'<h2>Tại Sao Explainability Quan Trọng?</h2><p>AI decisions affect lives: loan approvals, medical diagnoses, hiring. "Black box" models prevent trust, debugging, accountability. Regulations require explanations (GDPR, EU AI Act).</p><h2>XAI Methods</h2><h3>1. SHAP (SHapley Additive exPlanations)</h3><p>Game-theoretic approach. Computes contribution of each feature to prediction. Model-agnostic, provides global và local explanations.</p><h3>2. LIME (Local Interpretable Model-agnostic Explanations)</h3><p>Approximates model locally with interpretable model. Perturbs input, sees effect on output. Good for local explanations.</p><h3>3. Attention Visualization</h3><p>For attention-based models. Visualize which parts of input model focuses on. NLP: which words matter. Vision: which image regions.</p><h3>4. Counterfactuals</h3><p>Show what changes would flip prediction. "If you had 5% higher income, your loan would be approved."</p><h3>5. Feature Importance</h3><p>Which features matter most: permutation importance, gain-based importance. Global view of model behavior.</p><h2>Interpretability vs Accuracy</h2><p>Trade-off: simpler models (linear, trees) are interpretable but less accurate. Complex models (NN, ensembles) more accurate but less interpretable. Recent work aims to have both.</p><h2>Tools</h2><ul><li>SHAP library (Python)</li><li>ELI5</li><li>Captum (PyTorch)</li><li>InterpretML</li></ul><h2>Applications</h2><p>Healthcare (why diagnosis?), Finance (why rejected?), Criminal Justice (risk scores), Autonomous Vehicles (why brake?).</p>',
'HTML', '/uploads/image.png', 'Explainable AI XAI', 'PUBLISHED', NOW() - INTERVAL '64 days',
'Explainable AI (XAI): Hiểu Cách AI Đưa Ra Quyết Định Với SHAP, LIME',
'Hướng dẫn về Explainable AI, các phương pháp SHAP, LIME, attention visualization và tại sao XAI quan trọng.',
'explainable AI là gì, XAI, SHAP, LIME, interpretability AI, AI transparency, feature importance', 'vi-VN', 11, 2400, 1098, 10, false, true, 1, NOW() - INTERVAL '64 days', NOW()),

-- 48
('AI Legal Landscape: Intellectual Property và AI-Generated Content', 'ai-legal-intellectual-property',
'AI-generated content đặt ra câu hỏi về copyright, ownership, liability. Tìm hiểu về legal landscape của AI: IP rights, regulations, liability.',
'<h2>AI Copyright Questions</h2><h3>Can AI-generated work be copyrighted?</h3><p>Current US law: copyright requires human authorship. Pure AI generation not copyrightable. Human-AI collaboration may be copyrightable (human creative contribution).</p><h3>Training data copyright</h3><p>Controversial issue. Lawsuits: Getty vs Stability AI, authors vs OpenAI. Is training "fair use"? Courts still deciding.</p><h2>Ownership Issues</h2><p>Who owns AI-generated content? User who prompted? AI developer? Neither? Jurisdictions differ. Business need clear policies.</p><h2>Liability</h2><p>When AI causes harm (medical misdiagnosis, autonomous vehicle accident), who is liable? Developer? User? Both? Emerging frameworks for AI liability.</p><h2>Regulations</h2><ul><li><strong>EU AI Act</strong>: Risk-based regulation, requirements for high-risk AI</li><li><strong>US Copyright Office</strong>: Human authorship requirement guidance</li><li><strong>China</strong>: Generative AI regulations (2023)</li></ul><h2>AI Patents</h2><p>Can AI be an inventor? Currently no (as of 2024). DABUS AI case rejected by courts in US, UK, Australia. Inventorship requires human legal personhood.</p><h2>Practical Guidance</h2><ul><li>Document human creative contribution</li><li>Clear terms of service for AI tools</li><li>Consider watermarking AI content</li><li>Stay updated on evolving regulations</li><li>Consult legal counsel for specific cases</li></ul><h2>Emerging Issues</h2><p>Deepfakes, synthetic media, biometric data, AI in hiring, algorithmic discrimination - all have legal dimensions.</p>',
'HTML', '/uploads/image.png', 'AI Legal Copyright', 'PUBLISHED', NOW() - INTERVAL '66 days',
'AI Legal Landscape: Copyright, Ownership và Quy Định AI-Generated Content',
'Khám phá các vấn đề pháp lý của AI: copyright AI-generated content, training data rights, liability và regulations.',
'AI legal, AI copyright, intellectual property AI, AI ownership, AI liability, EU AI Act, AI regulations', 'vi-VN', 11, 2400, 987, 8, false, true, 1, NOW() - INTERVAL '66 days', NOW()),

-- 49
('Meta Llama 3: Open Source LLM Mạnh Nhất Từ Meta', 'meta-llama-3-open-source-llm',
'Llama 3 đạt performance ngang ngửa GPT-4 trên nhiều benchmarks. Tìm hiểu về Llama 3 architecture, capabilities và open source AI ecosystem.',
'<h2>Llama 3 Overview</h2><p>Meta released Llama 3 in April 2024, marking major step forward in open-source AI. Available in 8B và 70B parameter versions. Llama 3.1 405B outperforms many frontier models.</p><h2>Technical Improvements</h2><ul><li><strong>Extended Context</strong>: 8K tokens (128K for 3.1)</li><li><strong>Improved Training Data</strong>: 15T tokens (vs 1.8T for Llama 2)</li><li><strong>Better Pre-training</strong>: Improved data quality filtering</li><li><strong>Enhanced Reasoning</strong>: Significant improvement on reasoning tasks</li><li><strong>Code Generation</strong>: Competitive with closed models</li></ul><h2>Llama 3 Architecture</h2><p>Standard transformer decoder architecture với improvements: Grouped Query Attention (GQA), larger context window, improved tokenization (128K vocab).</p><h2>Fine-tuned Variants</h2><p>Community has created numerous fine-tuned versions: coding assistants, chat models, domain-specific models, quantized versions for consumer GPUs.</p><h2>Deployment</h2><ul><li><strong>llama.cpp</strong>: CPU inference, quantization</li><li><strong>vLLM</strong>: Fast GPU serving</li><li><strong>Ollama</strong>: Easy local deployment</li><li><strong>Fireworks.ai</strong>: Managed inference API</li></ul><h2>Open Source Benefits</h2><ul><li>Cost: No per-token API costs</li><li>Privacy: Run locally, data never leaves</li><li>Customization: Fine-tune for your use case</li><li>Transparency: Audit, understand model behavior</li><li>Innovation: Community drives rapid improvement</li></ul><h2>Competition</h2><p>Llama 3 vs GPT-4, Claude 3, Gemini. Open models closing gap with frontier models. Competition drives innovation.</p>',
'HTML', '/uploads/image.png', 'Meta Llama 3 Open Source', 'PUBLISHED', NOW() - INTERVAL '68 days',
'Meta Llama 3: Open Source LLM Mạnh Nhất, Capabilities và Deployment',
'Khám phá Meta Llama 3, technical improvements, fine-tuning và cách deploy Llama 3 cho production.',
'Llama 3 là gì, Meta Llama 3, open source LLM, llama 3 deployment, llama fine-tuning, llama.cpp', 'vi-VN', 11, 2400, 1567, 16, true, true, 1, NOW() - INTERVAL '68 days', NOW()),

-- 50
('AI Future 2025-2030: Xu Hướng và Dự Đoán Trí Tuệ Nhân Tạo', 'ai-future-2025-2030-trends',
'AI đang trên đà transform mọi aspect của society. Tìm hiểu về future trends: AGI timeline, AI + robotics, AI in science và những gì chờ đợi phía trước.',
'<h2>Current State of AI</h2><p>AI has achieved human-level performance on many narrow tasks. LLMs, diffusion models, robotics improving rapidly. Investment booming, capabilities doubling.</p><h2>Near-term Trends (2025-2026)</h2><ul><li><strong>Agentic AI</strong>: AI agents doing complex tasks autonomously</li><li><strong>Multimodal Everything</strong>: All major models will be multimodal</li><li><strong>AI in Science</strong>: Drug discovery, materials science, climate modeling</li><li><strong>Edge AI</strong>: On-device AI everywhere</li><li><strong>AI Regulation</strong>: Enforcement of EU AI Act, more regulations globally</li></ul><h2>Medium-term (2027-2028)</h2><ul><li><strong>More Capable Agents</strong>: AI that can do complex research, coding projects</li><li><strong>Robotics Breakthrough</strong>: General-purpose robots in homes, factories</li><li><strong>AI Companions</strong>: Personal AI assistants that know you deeply</li><li><strong>Education Transformation</strong>: AI tutors for everyone</li></ul><h2>Long-term (2029-2030+)</h2><ul><li><strong>AGI Progress</strong>: Towards artificial general intelligence</li><li><strong>AI + Science</strong>: AI making scientific discoveries autonomously</li><li><strong>Brain-Computer Interfaces</strong>: Neuralink và competitors</li><li><strong>Climate AI</strong>: AI solving climate change</li></ul><h2>Challenges</h2><ul><li>AI Safety</li><li>Job displacement</li><li>Misinformation</li><li>Concentration of power</li><li>Ethical development</li></ul><h2>How to Prepare</h2><p>Learn AI fundamentals, develop human-AI collaboration skills, focus on uniquely human capabilities, stay informed, engage in policy discussions.</p><h2>Final Thoughts</h2><p>AI is the most transformative technology in human history. How we develop and deploy it will shape our future. Responsible AI development is not optional - it is essential.</p>',
'HTML', '/uploads/image.png', 'AI Future Trends 2025', 'PUBLISHED', NOW() - INTERVAL '70 days',
'AI Future 2025-2030: Xu Hướng AGI, AI + Robotics và Tương Lai Trí Tuệ Nhân Tạo',
'Khám phá tương lai AI 2025-2030: xu hướng AGI, agentic AI, AI robotics và cách prepare cho AI future.',
'AI future 2025, AI trends 2030, AGI timeline, AI future predictions, AI 2026, tương lai AI', 'vi-VN', 12, 2600, 2876, 35, true, true, 1, NOW() - INTERVAL '70 days', NOW());

-- ============================================================
-- POST-CATEGORY MAPPING
-- ============================================================
INSERT INTO post_categories (post_id, category_id, is_primary, created_at)
SELECT p.id, c.id, true, NOW()
FROM posts p
CROSS JOIN categories c
WHERE 
  (p.slug LIKE '%tri-tue-nhan-tao%' AND c.slug = 'tri-tue-nhan-tao')
  OR (p.slug LIKE '%machine-learning%' AND c.slug = 'machine-learning')
  OR (p.slug LIKE '%deep-learning%' AND c.slug = 'deep-learning')
  OR (p.slug LIKE '%nlp%' AND c.slug = 'xlngtu-nlp')
  OR (p.slug LIKE '%computer-vision%' AND c.slug = 'computer-vision')
  OR (p.slug LIKE '%gpt%' AND c.slug = 'generative-ai')
  OR (p.slug LIKE '%generative-ai%' AND c.slug = 'generative-ai')
  OR (p.slug LIKE '%diffusion%' AND c.slug = 'generative-ai')
  OR (p.slug LIKE '%gan%' AND c.slug = 'generative-ai')
  OR (p.slug LIKE '%agent%' AND c.slug = 'ai-tools')
  OR (p.slug LIKE '%ethics%' AND c.slug = 'ai-ethics')
  OR (p.slug LIKE '%rag%' AND c.slug = 'ai-tools')
  OR (p.slug LIKE '%langchain%' AND c.slug = 'ai-tools')
  OR (p.slug LIKE '%fine-tuning%' AND c.slug = 'ai-tools')
  OR (p.slug LIKE '%open-source%' AND c.slug = 'ai-tools')
  OR (p.slug LIKE '%llama%' AND c.slug = 'ai-tools')
  OR (p.slug LIKE '%y-te%' AND c.slug = 'ai-ung-dung')
  OR (p.slug LIKE '%giao-duc%' AND c.slug = 'ai-ung-dung')
  OR (p.slug LIKE '%tai-chinh%' AND c.slug = 'ai-ung-dung')
  OR (p.slug LIKE '%manufacturing%' AND c.slug = 'ai-ung-dung')
  OR (p.slug LIKE '%agriculture%' AND c.slug = 'ai-ung-dung')
  OR (p.slug LIKE '%safety%' AND c.slug = 'ai-ethics')
  OR (p.slug LIKE '%regulation%' AND c.slug = 'ai-ethics')
  OR (p.slug LIKE '%legal%' AND c.slug = 'ai-ethics')
  OR (p.slug LIKE '%autonomous%' AND c.slug = 'robotics')
  OR (p.slug LIKE '%robotics%' AND c.slug = 'robotics')
  OR (p.slug LIKE '%cybersecurity%' AND c.slug = 'ai-ung-dung')
  OR (p.slug LIKE '%climate%' AND c.slug = 'ai-ung-dung')
  OR (p.slug LIKE '%llm-architecture%' AND c.slug = 'deep-learning')
  OR (p.slug LIKE '%prompt-engineering%' AND c.slug = 'ai-tools')
  OR (p.slug LIKE '%sang-tao%' AND c.slug = 'generative-ai')
  OR (p.slug LIKE '%chatbot%' AND c.slug = 'ai-tools')
  OR (p.slug LIKE '%multimodal-rag%' AND c.slug = 'ai-tools')
  OR (p.slug LIKE '%future%' AND c.slug = 'tri-tue-nhan-tao');

-- ============================================================
-- POST-TAG MAPPING
-- ============================================================
INSERT INTO post_tags (post_id, tag_id, created_at)
SELECT p.id, t.id, NOW()
FROM posts p
CROSS JOIN tags t
WHERE 
  (p.slug LIKE '%tri-tue-nhan-tao%' AND t.slug = 'ai')
  OR (p.slug LIKE '%machine-learning%' AND t.slug = 'machine-learning')
  OR (p.slug LIKE '%deep-learning%' AND t.slug = 'deep-learning')
  OR (p.slug LIKE '%neural-network%' AND t.slug = 'neural-network')
  OR (p.slug LIKE '%transformer%' AND t.slug = 'transformer')
  OR (p.slug LIKE '%gpt%' AND t.slug = 'gpt')
  OR (p.slug LIKE '%llm-architecture%' AND t.slug = 'llm')
  OR (p.slug LIKE '%nlp%' AND t.slug = 'nlp')
  OR (p.slug LIKE '%computer-vision%' AND t.slug = 'computer-vision')
  OR (p.slug LIKE '%diffusion%' AND t.slug = 'diffusion-model')
  OR (p.slug LIKE '%reinforcement%' AND t.slug = 'reinforcement-learning')
  OR (p.slug LIKE '%agent%' AND t.slug = 'ai-agent')
  OR (p.slug LIKE '%agent-case%' AND t.slug = 'agent-ai')
  OR (p.slug LIKE '%ethics%' AND t.slug = 'ai-ethics')
  OR (p.slug LIKE '%openai%' AND t.slug = 'openai')
  OR (p.slug LIKE '%anthropic%' AND t.slug = 'anthropic')
  OR (p.slug LIKE '%llama%' AND t.slug = 'llama')
  OR (p.slug LIKE '%rag%' AND t.slug = 'rag')
  OR (p.slug LIKE '%fine-tuning%' AND t.slug = 'fine-tuning')
  OR (p.slug LIKE '%multimodal%' AND t.slug = 'multimodal')
  OR (p.slug LIKE '%safety%' AND t.slug = 'ai-safety')
  OR (p.slug LIKE '%edge%' AND t.slug = 'edge-ai')
  OR (p.slug LIKE '%autonomous%' AND t.slug = 'automation')
  OR (p.slug LIKE '%robots%' AND t.slug = 'automation')
  OR (p.slug LIKE '%generative%' AND t.slug = 'gan')
  OR (p.slug LIKE '%automation%' AND t.slug = 'automation');

-- ============================================================
-- POST_AUTHORS MAPPING
-- ============================================================
INSERT INTO post_authors (post_id, user_id, role, sort_order)
SELECT id, 1, 'AUTHOR', 1 FROM posts;
