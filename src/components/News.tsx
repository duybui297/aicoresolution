import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import postService, { mapPostToNewsItem } from '../services/postService';
import { PostResponse } from '../types/api';
import { getRoutePath } from '../utils/routeConstants';
import { getFullImageUrl } from '../utils/imageUtils';

interface NewsPost extends PostResponse {
  categoryKey?: string;
  contentImages?: string[];
}

const formatDate = (dateStr: string | undefined | null): string => {
  if (!dateStr) return '';
  try {
    const date = new Date(dateStr);
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${String(date.getDate()).padStart(2, '0')} ${months[date.getMonth()]} ${date.getFullYear()}`;
  } catch {
    return dateStr;
  }
};

export default function News() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [posts, setPosts] = useState<NewsPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await postService.getPublicPosts(0, 100);
        const mapped = (response.content || []).map(mapPostToNewsItem);
        setPosts(mapped);
      } catch (err) {
        console.error('Failed to fetch news posts:', err);
        setError(t('news.notFound'));
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, [t]);

  const handlePostClick = (post: NewsPost) => {
    const route = getRoutePath('newsDetail', i18n.language);
    if (route) {
      navigate(route.replace(':id', post.slug));
    }
  };

  // ── Resolve localized title/excerpt based on current language ──────
  const getLocalized = (post: NewsPost) => {
    const isEnglish = i18n.language === 'en';
    return {
      title:     isEnglish && post.titleEn     ? post.titleEn     : post.title,
      excerpt:   isEnglish && post.excerptEn  ? post.excerptEn  : post.excerpt,
      thumbnailAlt: isEnglish && post.thumbnailAltEn ? post.thumbnailAltEn : post.thumbnailAlt,
    };
  };

  if (loading) {
    return (
      <section className="py-20 bg-slate-50 min-h-screen">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-4xl font-bold mb-2 text-slate-900">{t('news.title')}</h2>
              <p className="text-slate-600 text-lg">{t('news.subtitle')}</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map(i => (
              <div key={i} className="bg-white rounded-xl overflow-hidden shadow-sm h-80 animate-pulse" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-20 bg-slate-50 min-h-screen">
        <div className="container mx-auto px-4 max-w-7xl text-center">
          <p className="text-slate-500">{error}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-slate-50 min-h-screen">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-4xl font-bold mb-2 text-slate-900">{t('news.title')}</h2>
            <p className="text-slate-600 text-lg">{t('news.subtitle')}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {posts.map(post => {
            const { title, excerpt, thumbnailAlt } = getLocalized(post);
            return (
            <div
              key={post.id}
              className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all group flex flex-col h-full cursor-pointer"
              onClick={() => handlePostClick(post)}
            >
              <div className="overflow-hidden h-48 flex-shrink-0">
                <img
                  src={getFullImageUrl(post.thumbnailUrl) || ''}
                  alt={thumbnailAlt || title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                />
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">
                    {t(post.categoryKey || 'news.categories.trends')}
                  </span>
                  <span className="text-xs text-slate-400">{formatDate(post.publishedAt)}</span>
                </div>
                <h3 className="text-xl font-bold mb-3 text-slate-900 hover:text-blue-600 transition-colors line-clamp-2 min-h-[3.5rem]">
                  {title}
                </h3>
                <p className="text-slate-600 text-sm mb-4 line-clamp-2 min-h-[2.5rem]">
                  {excerpt}
                </p>
                <div className="flex items-center justify-between border-t border-slate-100 pt-4 mt-auto">
                  {post.authorName && <span className="text-xs font-medium text-slate-500">{post.authorName}</span>}
                  <button className="text-blue-600 text-sm font-medium hover:underline flex items-center gap-1 ml-auto">
                    {t('news.readMore')} <ArrowRight className="w-4 h-4 ml-1" />
                  </button>
                </div>
              </div>
            </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
