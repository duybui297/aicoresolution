import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';
import { BLOG_POSTS } from '../data/newsData';
import { useDocumentMeta } from '../hooks/useDocumentMeta';
import { ArrowLeft } from 'lucide-react';
import { getRoutePath } from '../utils/routeConstants';

export default function NewsDetailPage() {
    const { id } = useParams();
    const { t, i18n } = useTranslation();
    const navigate = useNavigate();

    const post = BLOG_POSTS.find(p => {
        // Check both slugs in case user switches language on the detail page or uses a link
        return p.slugs.en === id || p.slugs.vi === id;
    });

    // Automatically update URL when language changes
    useEffect(() => {
        if (post) {
            const currentLang = i18n.language as 'en' | 'vi';
            const targetSlug = post.slugs[currentLang];
            const routePattern = getRoutePath('newsDetail', currentLang);

            // If the current ID doesn't match the target language slug, redirect
            // This also handles switching from /news/:id to /tin-tuc/:id via the route pattern
            if (id !== targetSlug && routePattern) {
                const newPath = routePattern.replace(':id', targetSlug);
                // Only navigate if we are not already on the correct path (to avoid loops or executed redundancy)
                // However, since 'id' check covers the slug, we just need to be careful.
                // But wait, if slugs are same for both languages (unlikely but possible), 
                // we should also check if the path base matches.
                // But simplify: just replace if slug differs OR to ensure path correctness.
                // Actually, if I am on /news/slug-en and switch to VN, id is slug-en. targetSlug is slug-vi. They differ.
                // If I am on /news/slug-common and switch to VN (expect /tin-tuc/slug-common), id is slug-common. targetSlug is slug-common.
                // In that case, we need to check the pathname?
                // Let's rely on id difference for now as slugs are distinct in this dataset.
                // If they are not distinct, we might rely on the parent component keying or check location.pathname.
                navigate(newPath, { replace: true });
            }
        }
    }, [i18n.language, post, id, navigate]);

    // Update meta even if post not found (though useDocumentMeta handles general meta)
    useDocumentMeta();

    if (!post) {
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
                        <span className="text-sm font-bold text-blue-600 uppercase tracking-wider mb-2 block">{t(post.category)}</span>
                        <h1 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6 leading-tight">
                            {t(post.title)}
                        </h1>
                        <div className="flex items-center text-slate-500 text-sm mb-8 border-b border-slate-100 pb-8">
                            <span className="mr-4">{post.date}</span>
                            {post.author && <span>• {post.author}</span>}
                        </div>
                    </div>

                    <div className="mb-10 rounded-2xl overflow-hidden shadow-lg">
                        <img
                            src={post.image}
                            alt={t(post.title)}
                            className="w-full h-auto object-cover max-h-[500px]"
                        />
                    </div>

                    <div className="prose prose-lg max-w-none text-slate-700">
                        {/* Split content by newlines and render paragraphs or images */}
                        {t(post.content).split('\n\n').map((paragraph, idx) => {
                            // Check for image placeholder {{IMAGE_index}}
                            const imageMatch = paragraph.trim().match(/^{{IMAGE_(\d+)}}$/);

                            if (imageMatch && post.contentImages) {
                                const imageIndex = parseInt(imageMatch[1]);
                                const imageSrc = post.contentImages[imageIndex];

                                if (imageSrc) {
                                    return (
                                        <div key={idx} className="my-8 rounded-xl overflow-hidden shadow-md">
                                            <img
                                                src={imageSrc}
                                                alt={`Illustration ${imageIndex + 1}`}
                                                className="w-full h-auto object-cover"
                                            />
                                        </div>
                                    );
                                }
                            }

                            return (
                                <p key={idx} className="mb-6 whitespace-pre-line leading-relaxed">
                                    {paragraph}
                                </p>
                            );
                        })}
                    </div>
                </article>
            </div>
        </section>
    );
}
