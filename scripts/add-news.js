import fs from 'fs';
import path from 'path';
import readline from 'readline';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const question = (query) => new Promise((resolve) => rl.question(query, resolve));

// Paths
const viJsonPath = path.resolve(__dirname, '../src/i18n/locales/vi.json');
const enJsonPath = path.resolve(__dirname, '../src/i18n/locales/en.json');
const newsDataPath = path.resolve(__dirname, '../src/data/newsData.ts');

async function run() {
    console.log('');
    console.log('--- TẠO BÀI VIẾT MỚI TỰ ĐỘNG ---');

    const slugEn = await question('1. Đường dẫn URL tiếng Anh (vd: my-new-post): ');
    const slugVi = await question('2. Đường dẫn URL tiếng Việt (vd: bai-viet-moi): ');

    const titleEn = await question('3. Tiêu đề (Tiếng Anh): ');
    const titleVi = await question('4. Tiêu đề (Tiếng Việt): ');

    const excerptEn = await question('5. Mô tả ngắn (Tiếng Anh): ');
    const excerptVi = await question('6. Mô tả ngắn (Tiếng Việt): ');

    const category = await question('7. Danh mục (trends, tips, company) [mặc định: trends]: ') || 'trends';
    const author = await question('8. Tác giả [mặc định: Trống]: ') || '';

    rl.close();

    // 1. Read JSON files
    const viData = JSON.parse(fs.readFileSync(viJsonPath, 'utf8'));
    const enData = JSON.parse(fs.readFileSync(enJsonPath, 'utf8'));

    // Find next post ID by counting the keys that start with "post"
    const existingPosts = Object.keys(viData.news.posts).filter(k => k.startsWith('post'));
    const postNumbers = existingPosts.map(k => parseInt(k.replace('post', ''), 10)).filter(n => !isNaN(n));
    const nextPostId = (postNumbers.length > 0 ? Math.max(...postNumbers) : 0) + 1;
    const postKey = `post${nextPostId}`;

    // Update JSON objects
    viData.news.posts[postKey] = {
        title: titleVi,
        excerpt: excerptVi,
        content: "Nhập nội dung chi tiết bài viết tại đây. Khuyến khích sử dụng HTML tags như \\n\\n cho đoạn văn mới..."
    };

    enData.news.posts[postKey] = {
        title: titleEn,
        excerpt: excerptEn,
        content: "Enter the detailed content of the article here..."
    };

    // Write back JSON
    fs.writeFileSync(viJsonPath, JSON.stringify(viData, null, 4) + '\n');
    fs.writeFileSync(enJsonPath, JSON.stringify(enData, null, 4) + '\n');

    console.log(`\n✅ Đã thêm data vào file vi.json và en.json tại vùng nhớ: news.posts.${postKey}`);

    // 2. Read and update newsData.ts
    let newsDataContent = fs.readFileSync(newsDataPath, 'utf8');

    // Format current date e.g "15 Mar 2026"
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const today = new Date();
    const dateStr = `${today.getDate().toString().padStart(2, '0')} ${months[today.getMonth()]} ${today.getFullYear()}`;

    const defaultImage = "openClawImage"; // A default image fallback using an existing import

    const newPostObjectStr = `    {
        id: ${nextPostId},
        slugs: {
            en: '${slugEn}',
            vi: '${slugVi}'
        },
        title: 'news.posts.${postKey}.title',
        excerpt: 'news.posts.${postKey}.excerpt',
        content: 'news.posts.${postKey}.content',
        contentImages: [],
        category: 'news.categories.${category}',
        date: '${dateStr}',
        author: '${author}',
        image: ${defaultImage}
    },`;

    // Inject at the beginning of the BLOG_POSTS array
    const arrayStartRegex = /export const BLOG_POSTS: BlogPost\[\] = \[\n/;
    if (arrayStartRegex.test(newsDataContent)) {
        newsDataContent = newsDataContent.replace(arrayStartRegex, `export const BLOG_POSTS: BlogPost[] = [\n${newPostObjectStr}\n`);
        fs.writeFileSync(newsDataPath, newsDataContent);
        console.log(`✅ Đã thêm cấu hình hệ thống vào file src/data/newsData.ts`);
    } else {
        console.error(`❌ Lỗi: Không tìm thấy mảng "export const BLOG_POSTS = [" trong newsData.ts`);
    }

    console.log(`
🎉 HOÀN TẤT!
- Bài viết số: ${nextPostId} đã được khởi tạo!
- Bước 1: Hãy mở mục \`news.posts.${postKey}\` trong file \`vi.json\` và \`en.json\` để copy dán nội dung "content" chi tiết.
- Bước 2: Mở file \`src/data/newsData.ts\` lên (đầu file) để thay đổi đường dẫn hình ảnh đại diện (phần image) nếu cần.
`);
}

run().catch(console.error);
