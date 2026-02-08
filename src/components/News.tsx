import { useTranslation } from 'react-i18next';
import { BLOG_POSTS } from '../data/newsData';

export default function News() {
    const { t } = useTranslation();

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
                    {BLOG_POSTS.map(post => (
                        <div key={post.id} className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all group flex flex-col h-full">
                            <div className="overflow-hidden h-48 flex-shrink-0">
                                <img
                                    src={post.image}
                                    alt={t(post.title)}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                />
                            </div>
                            <div className="p-6 flex flex-col flex-grow">
                                <div className="flex justify-between items-center mb-3">
                                    <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">{t(post.category)}</span>
                                    <span className="text-xs text-slate-400">{post.date}</span>
                                </div>
                                <h3 className="text-xl font-bold mb-3 text-slate-900 hover:text-blue-600 cursor-pointer transition-colors line-clamp-2 min-h-[3.5rem]">
                                    {t(post.title)}
                                </h3>
                                <p className="text-slate-600 text-sm mb-4 line-clamp-2 min-h-[2.5rem]">
                                    {t(post.excerpt)}
                                </p>
                                <div className="flex items-center justify-between border-t border-slate-100 pt-4 mt-auto">
                                    <span className="text-xs font-medium text-slate-500">{post.author}</span>
                                    <button className="text-blue-600 text-sm font-medium hover:underline flex items-center gap-1">
                                        {t('news.readMore')}
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
