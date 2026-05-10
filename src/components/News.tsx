import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowRight } from 'lucide-react';
import { getRoutePath } from '../utils/routeConstants';
import publicPostService from '../services/publicPostService';
import { PostResponse } from '../types/api';
import { getFullImageUrl } from '../utils/imageUtils';

export default function News() {
    const { t, i18n } = useTranslation();
    const navigate = useNavigate();
    const [posts, setPosts] = useState<PostResponse[]>([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const pageSize = 6; // Show 6 posts per page for better grid layout

    useEffect(() => {
        const fetchPosts = async () => {
            setLoading(true);
            try {
                const locale = i18n.language === 'vi' ? 'vi-VN' : 'en-US';
                const response = await publicPostService.getPosts(currentPage, pageSize, undefined, locale);
                setPosts(response.content);
                setTotalPages(response.totalPages);
            } catch (error) {
                console.error("Error fetching posts:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, [i18n.language, currentPage]);

    const handlePageChange = (newPage: number) => {
        setCurrentPage(newPage);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handlePostClick = (post: PostResponse) => {
        const route = getRoutePath('newsDetail', i18n.language);
        if (route) {
            navigate(route.replace(':id', post.slug));
        }
    };

    const formatDate = (dateString: string) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toLocaleDateString(i18n.language === 'vi' ? 'vi-VN' : 'en-US', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        });
    };

    return (
        <section className="py-20 bg-slate-50 min-h-screen">
            <div className="container mx-auto px-4 max-w-7xl">
                <div className="flex justify-between items-end mb-12">
                    <div>
                        <h2 className="text-4xl font-bold mb-2 text-slate-900">{t('news.title')}</h2>
                        <p className="text-slate-600 text-lg">{t('news.subtitle')}</p>
                    </div>
                </div>

                {loading ? (
                    <div className="flex justify-center items-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                    </div>
                ) : posts.length === 0 ? (
                    <div className="text-center py-20 text-slate-500">
                        {t('news.notFound', 'Không tìm thấy bài viết')}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {posts.map(post => (
                            <div key={post.id}
                                className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all group flex flex-col h-full cursor-pointer"
                                onClick={() => handlePostClick(post)}>
                                <div className="overflow-hidden h-48 flex-shrink-0 bg-slate-100">
                                    <img
                                        src={getFullImageUrl(post.thumbnailUrl) || '/images/default-thumbnail.png'}
                                        alt={post.thumbnailAlt || post.title}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                        onError={(e) => {
                                            const target = e.target as HTMLImageElement;
                                            if (!target.src.includes('via.placeholder.com')) {
                                                target.src = 'https://via.placeholder.com/600x400?text=AI+Core';
                                            }
                                        }}
                                    />
                                </div>
                                <div className="p-6 flex flex-col flex-grow">
                                    <div className="flex justify-between items-center mb-3">
                                        <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">TIN TỨC</span>
                                        <span className="text-xs text-slate-400">{formatDate(post.publishedAt)}</span>
                                    </div>
                                    <h3 className="text-xl font-bold mb-3 text-slate-900 hover:text-blue-600 transition-colors line-clamp-2 min-h-[3.5rem]">
                                        {post.title}
                                    </h3>
                                    <p className="text-slate-600 text-sm mb-4 line-clamp-2 min-h-[2.5rem]">
                                        {post.excerpt}
                                    </p>
                                    <div className="flex items-center justify-between border-t border-slate-100 pt-4 mt-auto">
                                        {post.authorName && <span className="text-xs font-medium text-slate-500">{post.authorName}</span>}
                                        <button className="text-blue-600 text-sm font-medium hover:underline flex items-center gap-1 ml-auto">
                                            {t('news.readMore', 'Đọc tiếp')} <ArrowRight className="w-4 h-4 ml-1" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Pagination UI */}
                {!loading && totalPages > 1 && (
                    <div className="flex justify-center items-center mt-12 gap-2">
                        <button
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 0}
                            className="px-4 py-2 rounded-lg border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            {t('common.previous', 'Trình trước')}
                        </button>
                        
                        {[...Array(totalPages)].map((_, index) => (
                            <button
                                key={index}
                                onClick={() => handlePageChange(index)}
                                className={`w-10 h-10 rounded-lg border transition-all ${
                                    currentPage === index
                                        ? 'bg-blue-600 border-blue-600 text-white shadow-md'
                                        : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                                }`}
                            >
                                {index + 1}
                            </button>
                        ))}

                        <button
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages - 1}
                            className="px-4 py-2 rounded-lg border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            {t('common.next', 'Tiếp theo')}
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
}
