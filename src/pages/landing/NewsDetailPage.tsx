import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import { useDocumentMeta } from '../../hooks/useDocumentMeta';
import { ArrowLeft } from 'lucide-react';
import { getRoutePath } from '../../utils/routeConstants';
import publicPostService from '../../services/publicPostService';
import { PostResponse } from '../../types/api';
import { getFullImageUrl, transformHtmlContent } from '../../utils/imageUtils';

export default function NewsDetailPage() {
    const { id } = useParams();
    const { t, i18n } = useTranslation();
    const navigate = useNavigate();
    const [post, setPost] = useState<PostResponse | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPost = async () => {
            if (!id) return;
            setLoading(true);
            try {
                const locale = i18n.language === 'vi' ? 'vi-VN' : 'en-US';
                const data = await publicPostService.getPostBySlug(id, locale);
                setPost(data);
            } catch (error) {
                console.error("Error fetching post details:", error);
                setPost(null);
            } finally {
                setLoading(false);
            }
        };

        fetchPost();
    }, [id, i18n.language]);

    // Update meta even if post not found (though useDocumentMeta handles general meta)
    useDocumentMeta();

    const formatDate = (dateString: string) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toLocaleDateString(i18n.language === 'vi' ? 'vi-VN' : 'en-US', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        });
    };

    if (loading) {
        return (
            <div className="container mx-auto px-4 py-20 flex justify-center items-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    if (!post) {
        return (
            <div className="container mx-auto px-4 py-20 text-center min-h-screen">
                <h2 className="text-2xl font-bold mb-4">{t('news.notFound', 'Không tìm thấy bài viết')}</h2>
                <button
                    onClick={() => navigate(getRoutePath('news', i18n.language))}
                    className="text-blue-600 hover:underline"
                >
                    {t('news.backToNews', 'Quay lại Tin tức')}
                </button>
            </div>
        );
    }

    return (
        <section className="py-20 bg-white min-h-screen">
            <div className="container mx-auto px-4 max-w-4xl">
                <button
                    onClick={() => navigate(getRoutePath('news', i18n.language))}
                    className="flex items-center text-slate-500 hover:text-blue-600 mb-8 transition-colors"
                >
                    <ArrowLeft className="w-5 h-5 mr-2" />
                    {t('news.backToNews', 'Quay lại Tin tức')}
                </button>

                <article>
                    <div className="mb-8">
                        <span className="text-sm font-bold text-blue-600 uppercase tracking-wider mb-2 block">
                            TIN TỨC
                        </span>
                        <h1 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6 leading-tight">
                            {post.title}
                        </h1>
                        <div className="flex items-center text-slate-500 text-sm mb-8 border-b border-slate-100 pb-8">
                            <span className="mr-4">{formatDate(post.publishedAt)}</span>
                            {post.authorName && <span>• {post.authorName}</span>}
                        </div>
                    </div>

                    <div className="mb-10 rounded-2xl overflow-hidden shadow-lg bg-slate-100">
                            <img
                                src={getFullImageUrl(post.thumbnailUrl) || '/images/default-thumbnail.png'}
                                alt={post.thumbnailAlt || post.title}
                                className="w-full h-auto object-cover max-h-[500px]"
                                onError={(e) => {
                                    const target = e.target as HTMLImageElement;
                                    if (!target.src.includes('via.placeholder.com')) {
                                        target.src = 'https://via.placeholder.com/1200x600?text=AI+Core';
                                    }
                                }}
                            />
                    </div>

                    <div className="prose prose-lg max-w-none text-slate-700">
                        {post.contentFormat === 'HTML' ? (
                            <div dangerouslySetInnerHTML={{ __html: transformHtmlContent(post.content) }} />
                        ) : (
                            <div className="whitespace-pre-line leading-relaxed">
                                {post.content}
                            </div>
                        )}
                    </div>
                </article>
            </div>
        </section>
    );
}
