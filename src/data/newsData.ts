export interface BlogPost {
    id: number;
    title: string;
    excerpt: string;
    category: string;
    date: string;
    author: string;
    image: string;
}

export const BLOG_POSTS: BlogPost[] = [
    {
        id: 1,
        title: 'news.posts.post1.title',
        excerpt: 'news.posts.post1.excerpt',
        category: 'news.categories.trends',
        date: '12 Oct 2025',
        author: 'Nguyen Van A',
        image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=800'
    },
    {
        id: 2,
        title: 'news.posts.post2.title',
        excerpt: 'news.posts.post2.excerpt',
        category: 'news.categories.tips',
        date: '05 Oct 2025',
        author: 'Tran Thi B',
        image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=800'
    },
    {
        id: 3,
        title: 'news.posts.post3.title',
        excerpt: 'news.posts.post3.excerpt',
        category: 'news.categories.company',
        date: '28 Sep 2025',
        author: 'HR Team',
        image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80&w=800'
    }
];
