import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import postService, { mapPostToNewsItem } from '../../services/postService';
import { PostResponse } from '../../types/api';
import { useDocumentMeta } from '../../hooks/useDocumentMeta';
import { ArrowLeft } from 'lucide-react';
import { getRoutePath } from '../../utils/routeConstants';
import { getFullImageUrl } from '../../utils/imageUtils';

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

function getLocalizedContent(post: NewsPost, lang: string) {
  const isEnglish = lang === 'en';
  return {
    title:     isEnglish && post.titleEn      ? post.titleEn      : post.title,
    excerpt:   isEnglish && post.excerptEn    ? post.excerptEn    : post.excerpt,
    content:   isEnglish && post.contentEn   ? post.contentEn   : post.content,
    thumbnailAlt: isEnglish && post.thumbnailAltEn ? post.thumbnailAltEn : post.thumbnailAlt,
  };
}

export default function NewsDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [post, setPost] = useState<NewsPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchPost = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await postService.getPublicPostBySlug(id);
        const mapped = mapPostToNewsItem(data);
        setPost(mapped as NewsPost);
      } catch (err) {
        console.error('Failed to fetch post:', err);
        setError(t('news.notFound'));
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id, t]);

  // Automatically update URL when language changes
  useEffect(() => {
    if (post && id) {
      const routePattern = getRoutePath('newsDetail', i18n.language);
      if (routePattern && id !== post.slug) {
        navigate(routePattern.replace(':id', post.slug), { replace: true });
      }
    }
  }, [i18n.language, post, id, navigate]);

  useDocumentMeta(post?.title, post?.excerpt);

  const localized = post ? getLocalizedContent(post, i18n.language) : null;

  if (loading) {
    return (
      <section className="py-20 bg-white min-h-screen">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="animate-pulse space-y-4">
            <div className="h-8 w-32 bg-slate-200 rounded" />
            <div className="h-12 w-3/4 bg-slate-200 rounded" />
            <div className="h-64 w-full bg-slate-200 rounded-2xl" />
            <div className="space-y-2">
              <div className="h-4 bg-slate-200 rounded w-full" />
              <div className="h-4 bg-slate-200 rounded w-5/6" />
              <div className="h-4 bg-slate-200 rounded w-4/6" />
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error || !post || !localized) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold mb-4">{t('news.notFound')}</h2>
        <button
          onClick={() => navigate(getRoutePath('news', i18n.language))}
          className="text-blue-600 hover:underline"
        >
          {t('news.backToNews')}
        </button>
      </div>
    );
  }

  // Render content: replace {{IMAGE_N}} placeholders with actual <img> tags
  const renderContent = () => {
    if (!localized.content) return null;
    const contentImages = post.contentImages || [];

    let processedContent = localized.content;

    processedContent = processedContent.replace(/<p>\s*\{\{IMAGE_(\d+)\}\}\s*<\/p>/g, (match, index) => {
      const imageIndex = parseInt(index, 10);
      const imageSrc = contentImages[imageIndex];
      if (imageSrc) {
        return `<div class="my-8 rounded-xl overflow-hidden shadow-md"><img src="${imageSrc}" alt="Illustration ${imageIndex + 1}" class="w-full h-auto object-cover" /></div>`;
      }
      return '';
    });

    return (
      <div
        className="prose prose-lg max-w-none text-slate-700 [&_p]:mb-4 [&_h2]:mt-8 [&_h2]:mb-4 [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-slate-900 [&_h3]:mt-6 [&_h3]:mb-3 [&_h3]:text-xl [&_h3]:font-semibold [&_ul]:my-4 [&_li]:my-1 [&_code]:bg-slate-100 [&_code]:px-1 [&_code]:py-0.5 [&_code]:rounded [&_strong]:font-semibold"
        dangerouslySetInnerHTML={{ __html: processedContent }}
      />
    );
  };

  return (
    <section className="py-20 bg-white min-h-screen">
      <div className="container mx-auto px-4 max-w-4xl">
        <button
          onClick={() => navigate(getRoutePath('news', i18n.language))}
          className="flex items-center text-slate-500 hover:text-blue-600 mb-8 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          {t('news.backToNews')}
        </button>

        <article>
          <div className="mb-8">
            <span className="text-sm font-bold text-blue-600 uppercase tracking-wider mb-2 block">
              {t(post.categoryKey || 'news.categories.trends')}
            </span>
            <h1 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6 leading-tight">
              {localized.title}
            </h1>
            <div className="flex items-center text-slate-500 text-sm mb-8 border-b border-slate-100 pb-8">
              <span className="mr-4">{formatDate(post.publishedAt)}</span>
              {post.authorName && <span>• {post.authorName}</span>}
            </div>
          </div>

          {post.thumbnailUrl && (
            <div className="mb-10 rounded-2xl overflow-hidden shadow-lg">
              <img
                src={getFullImageUrl(post.thumbnailUrl) || ''}
                alt={localized.thumbnailAlt || localized.title}
                className="w-full h-auto object-cover max-h-[500px]"
              />
            </div>
          )}

          <div className="prose prose-lg max-w-none text-slate-700">
            {renderContent()}
          </div>
        </article>
      </div>
    </section>
  );
}
