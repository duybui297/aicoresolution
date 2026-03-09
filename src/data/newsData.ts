import openClawImage from '../assets/openclaw_article.png';
import openClawDetail1 from '../assets/openclaw_detail_1.png';
import openClawDetail2 from '../assets/openclaw_detail_2.png';
import openClawDetail3 from '../assets/openclaw_detail_3.png';
import bai2Image from '../assets/bai2.png';
import bai21Image from '../assets/bai21.png';
import bai23Image from '../assets/bai23.png';
import bai3Image from '../assets/bai3.png';
import bai31Image from '../assets/bai31.png';
import bai32Image from '../assets/bai32.png';
import bai4Image from '../assets/bai4.png';
import bai4Image2 from '../assets/bai4-2.png';
import bai4Image3 from '../assets/bai4-3.png';
import antigravity_1 from '../assets/antigravity_1.png';
import antigravity_2 from '../assets/antigravity_2.png';

export interface BlogPost {
    id: number;
    slugs: {
        en: string;
        vi: string;
    };
    title: string;
    excerpt: string;
    content: string;
    contentImages?: string[];
    category: string;
    date: string;
    author: string;
    image: string;
}

export const BLOG_POSTS: BlogPost[] = [
    {
        id: 5,
        slugs: {
            en: 'antigravity-ai-guide-for-developers',
            vi: 'huong-dan-su-dung-ai-antigravity'
        },
        title: 'news.posts.post5.title',
        excerpt: 'news.posts.post5.excerpt',
        content: 'news.posts.post5.content',
        contentImages: [antigravity_1, antigravity_2],
        category: 'news.categories.trends',
        date: '09 Mar 2026',
        author: 'Duy Bui',
        image: openClawImage
    },
    {
        id: 4,
        slugs: {
            en: 'tokens-in-ai-understanding-the-currency-of-artificial-intelligence',
            vi: 'token-trong-ai-hieu-ve-tien-te-cua-tri-tue-nhan-tao'
        },
        title: 'news.posts.post4.title',
        excerpt: 'news.posts.post4.excerpt',
        content: 'news.posts.post4.content',
        contentImages: [bai4Image2, bai4Image3],
        category: 'news.categories.trends',
        date: '05 Mar 2026',
        author: '',
        image: bai4Image
    },
    {
        id: 1,
        slugs: {
            en: 'openclaw-and-the-moment-ai-crosses-the-control-line',
            vi: 'openclaw-va-khoanh-khac-ai-vuot-qua-ranh-gioi-kiem-soat'
        },
        title: 'news.posts.post1.title',
        excerpt: 'news.posts.post1.excerpt',
        content: 'news.posts.post1.content',
        contentImages: [openClawDetail1, openClawDetail2, openClawDetail3],
        category: 'news.categories.trends',
        date: '12 Oct 2025',
        author: '',
        image: openClawImage
    },
    {
        id: 2,
        slugs: {
            en: 'ai-in-the-it-era-is-learning-to-code-still-necessary',
            vi: 'ai-trong-thoi-dai-it-lieu-co-con-can-hoc-lap-trinh'
        },
        title: 'news.posts.post2.title',
        excerpt: 'news.posts.post2.excerpt',
        content: 'news.posts.post2.content',
        contentImages: [bai21Image, bai23Image],
        category: 'news.categories.tips',
        date: '05 Oct 2025',
        author: '',
        image: bai2Image
    },
    {
        id: 3,
        slugs: {
            en: 'ai-is-making-building-cheaper-and-thats-the-real-issue',
            vi: 'ai-khien-viec-build-tro-nen-re-va-do-moi-la-van-de'
        },
        title: 'news.posts.post3.title',
        excerpt: 'news.posts.post3.excerpt',
        content: 'news.posts.post3.content',
        contentImages: [bai3Image, bai32Image],
        category: 'news.categories.company',
        date: '28 Sep 2025',
        author: '',
        image: bai31Image
    }
];
