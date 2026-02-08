import openClawImage from '../assets/openclaw_article.png';
import openClawDetail1 from '../assets/openclaw_detail_1.png';
import openClawDetail2 from '../assets/openclaw_detail_2.png';
import openClawDetail3 from '../assets/openclaw_detail_3.png';

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
            en: 'chatbot-integration-guide-for-smes',
            vi: 'huong-dan-tich-hop-chatbot-cho-doanh-nghiep-sme'
        },
        title: 'news.posts.post2.title',
        excerpt: 'news.posts.post2.excerpt',
        content: 'news.posts.post2.content',
        category: 'news.categories.tips',
        date: '05 Oct 2025',
        author: '',
        image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=800'
    },
    {
        id: 3,
        slugs: {
            en: 'ai-core-solutions-expands-team',
            vi: 'ai-core-solutions-mo-rong-doi-ngu'
        },
        title: 'news.posts.post3.title',
        excerpt: 'news.posts.post3.excerpt',
        content: 'news.posts.post3.content',
        category: 'news.categories.company',
        date: '28 Sep 2025',
        author: '',
        image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80&w=800'
    }
];
