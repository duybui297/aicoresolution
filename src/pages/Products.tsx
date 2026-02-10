import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
    ArrowRight,
    CheckCircle,
    Zap,
    ExternalLink,
    ArrowLeft,
    Layers,
    Code,
    ChevronLeft,
    ChevronRight,
    Loader2,
    Hourglass
} from 'lucide-react';
import { sendNotificationEmail } from '../services/emailService';
import chatbotProductImg from '../assets/ChatGPTproduct.png';
import translatorProductImg from '../assets/ChatGPTPM.png';

interface ProductFeature {
    title: string;
    description: string;
}

interface Product {
    id: string;
    title: string;
    description: string;
    category: 'AI' | 'SaaS' | 'Enterprise' | 'Data';
    image: string;
    gallery?: string[];
    features: ProductFeature[];
    demoUrl?: string;
    isNew?: boolean;
    longDescription?: string;
    benefits?: string[];
    techStack?: string[];
}

const PRODUCTS: Product[] = [];

const UPCOMING_PRODUCT_ICONS: React.ReactNode[] = [
    <img src={chatbotProductImg} alt="" className="w-14 h-14 object-contain" />,
    <img src={translatorProductImg} alt="" className="w-14 h-14 object-contain" />,
];

const WaitingListSection = () => {
    const { t } = useTranslation();
    const [email, setEmail] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const upcomingKeys = ['product1', 'product2'] as const;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const existing = JSON.parse(localStorage.getItem('product_waitinglist') || '[]');
            localStorage.setItem('product_waitinglist', JSON.stringify([
                ...existing,
                { email, id: `wl-${Date.now()}`, registeredAt: new Date().toISOString() }
            ]));

            await sendNotificationEmail({ type: 'product_waitlist', email });

            setIsSuccess(true);
        } catch {
            alert(t('products.waitingList.errorMessage'));
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="bg-gradient-to-b from-slate-50 to-white rounded-3xl border border-slate-200 p-10 md:p-14 max-w-4xl mx-auto">
            <div className="text-center mb-8">
                <div className="w-16 h-16 bg-indigo-50 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Hourglass className="w-7 h-7 text-indigo-400" />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3">
                    {t('products.waitingList.title')}
                </h2>
                <p className="text-slate-500 text-base md:text-lg max-w-xl mx-auto">
                    {t('products.waitingList.description')}
                </p>
            </div>

            {isSuccess ? (
                <div className="flex items-center justify-center gap-2 py-3 px-5 bg-green-50 border border-green-200 rounded-full max-w-md mx-auto mb-10">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <span className="text-green-700 font-medium text-sm">{t('products.waitingList.successMessage')} <strong>{email}</strong></span>
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="mb-10">
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-lg mx-auto">
                        <input
                            required
                            type="email"
                            className="w-full sm:flex-1 px-5 py-3.5 rounded-full border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all text-slate-800 placeholder-slate-400"
                            placeholder={t('products.waitingList.placeholder')}
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-7 py-3.5 rounded-full shadow-lg shadow-indigo-600/20 transition-all transform active:scale-95 flex items-center justify-center whitespace-nowrap"
                        >
                            {isSubmitting ? (
                                <Loader2 className="w-5 h-5 animate-spin" />
                            ) : (
                                t('products.waitingList.button')
                            )}
                        </button>
                    </div>
                    <p className="text-xs text-center text-slate-400 mt-3">
                        {t('products.waitingList.disclaimer')}
                    </p>
                </form>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {upcomingKeys.map((key, idx) => (
                    <div
                        key={key}
                        className="bg-white rounded-xl border border-slate-100 p-5 hover:shadow-md hover:border-slate-200 transition-all duration-300"
                    >
                        <div className="flex items-center justify-between mb-3">
                            <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full tracking-wide">
                                {t(`products.upcoming.${key}.eta`)}
                            </span>
                            {UPCOMING_PRODUCT_ICONS[idx]}
                        </div>
                        <h4 className="text-lg font-bold text-slate-900 mb-1">{t(`products.upcoming.${key}.title`)}</h4>
                        <p className="text-sm text-slate-500 leading-relaxed">{t(`products.upcoming.${key}.description`)}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};


const ImageCarousel = ({ images }: { images: string[] }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    };

    if (!images || images.length === 0) return null;

    return (
        <div className="relative group">
            <div className="overflow-hidden rounded-2xl shadow-lg aspect-video bg-slate-100">
                <img
                    src={images[currentIndex]}
                    alt={`Product demo ${currentIndex + 1}`}
                    className="w-full h-full object-cover transition-all duration-500"
                />
            </div>

            {/* Navigation Buttons */}
            <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-slate-800 p-2 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-all duration-300"
            >
                <ChevronLeft className="w-6 h-6" />
            </button>
            <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-slate-800 p-2 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-all duration-300"
            >
                <ChevronRight className="w-6 h-6" />
            </button>

            {/* Indicators */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
                {images.map((_, idx) => (
                    <button
                        key={idx}
                        onClick={() => setCurrentIndex(idx)}
                        className={`w-2.5 h-2.5 rounded-full transition-all ${currentIndex === idx ? 'bg-white w-6' : 'bg-white/50 hover:bg-white/80'
                            }`}
                    />
                ))}
            </div>
        </div>
    );
};

const Products = () => {
    const { t } = useTranslation();
    const [activeCategory] = useState('All');
    const [searchQuery] = useState('');
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

    const filteredProducts = PRODUCTS.filter(product => {
        const matchesCategory = activeCategory === 'All' || product.category === activeCategory;
        const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.description.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    if (selectedProduct) {
        return (
            <div className="min-h-screen bg-slate-50 pt-24 pb-16 animate-in fade-in slide-in-from-right duration-500">
                <div className="container mx-auto px-4">
                    <button
                        onClick={() => setSelectedProduct(null)}
                        className="flex items-center text-slate-600 hover:text-blue-600 font-medium mb-8 transition-colors"
                    >
                        <ArrowLeft className="w-5 h-5 mr-2" /> {t('products.detail.back')}
                    </button>

                    <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100">
                        {/* Product Header Image */}
                        <div className="h-64 md:h-96 relative">
                            <img
                                src={selectedProduct.image}
                                alt={selectedProduct.title}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent"></div>
                            <div className="absolute bottom-0 left-0 w-full p-8 md:p-12 text-white">
                                <div className="flex items-center space-x-3 mb-4">
                                    <span className="bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                                        {selectedProduct.category}
                                    </span>
                                    {selectedProduct.isNew && (
                                        <span className="bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                                            NEW
                                        </span>
                                    )}
                                </div>
                                <h1 className="text-3xl md:text-5xl font-bold mb-4">{selectedProduct.title}</h1>
                                <p className="text-lg md:text-xl text-slate-200 max-w-3xl">{selectedProduct.description}</p>
                            </div>
                        </div>

                        <div className="p-8 md:p-12 grid grid-cols-1 lg:grid-cols-3 gap-12">
                            {/* Main Content */}
                            <div className="lg:col-span-2 space-y-12">

                                {/* Image Carousel */}
                                {selectedProduct.gallery && selectedProduct.gallery.length > 0 && (
                                    <div>
                                        <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center">
                                            <Layers className="w-6 h-6 text-blue-600 mr-2" /> {t('products.detail.gallery')}
                                        </h2>
                                        <ImageCarousel images={selectedProduct.gallery} />
                                    </div>
                                )}

                                <div>
                                    <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center">
                                        <Zap className="w-6 h-6 text-blue-600 mr-2" /> {t('products.detail.overview')}
                                    </h2>
                                    <p className="text-slate-600 leading-relaxed text-lg">
                                        {selectedProduct.longDescription || selectedProduct.description}
                                    </p>
                                </div>

                                <div>
                                    <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center">
                                        <Layers className="w-6 h-6 text-purple-600 mr-2" /> {t('products.detail.features')}
                                    </h2>
                                    <div className="grid grid-cols-1 gap-4">
                                        {selectedProduct.features.map((feature, idx) => (
                                            <div key={idx} className="bg-slate-50 p-6 rounded-xl border border-slate-100 hover:shadow-md transition-shadow">
                                                <h4 className="text-lg font-bold text-slate-900 mb-2 flex items-center">
                                                    <CheckCircle className="w-5 h-5 text-purple-600 mr-2" />
                                                    {feature.title}
                                                </h4>
                                                <p className="text-slate-600 text-sm ml-7">
                                                    {feature.description}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center">
                                        <CheckCircle className="w-6 h-6 text-green-500 mr-2" /> {t('products.detail.benefits')}
                                    </h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {selectedProduct.benefits?.map((benefit, idx) => (
                                            <div key={idx} className="flex items-start bg-slate-50 p-4 rounded-xl border border-slate-100">
                                                <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                                                <span className="text-slate-700 font-medium">{benefit}</span>
                                            </div>
                                        )) || (
                                                <p className="text-slate-500 italic">{t('products.detail.benefitsComingSoon')}</p>
                                            )}
                                    </div>
                                </div>
                            </div>

                            {/* Sidebar */}
                            <div className="space-y-8">
                                <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 sticky top-24">
                                    <h3 className="text-lg font-bold text-slate-900 mb-4">{t('products.detail.actions')}</h3>
                                    <div className="space-y-3">
                                        {selectedProduct.demoUrl && (
                                            <a
                                                href={selectedProduct.demoUrl}
                                                className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-xl hover:bg-blue-700 transition-colors flex items-center justify-center shadow-lg shadow-blue-600/20"
                                            >
                                                {t('products.detail.liveDemo')} <ExternalLink className="ml-2 w-4 h-4" />
                                            </a>
                                        )}
                                        <button className="w-full bg-white text-slate-700 font-bold py-3 px-4 rounded-xl border border-slate-300 hover:bg-slate-100 transition-colors">
                                            {t('products.detail.contactSales')}
                                        </button>
                                    </div>

                                    <div className="mt-8 pt-8 border-t border-slate-200">
                                        <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center">
                                            <Code className="w-5 h-5 mr-2 text-slate-500" /> {t('products.detail.techStack')}
                                        </h3>
                                        <div className="flex flex-wrap gap-2">
                                            {selectedProduct.techStack?.map((tech, idx) => (
                                                <span key={idx} className="px-3 py-1 bg-white text-slate-600 rounded-md text-xs font-bold border border-slate-200 shadow-sm">
                                                    {tech}
                                                </span>
                                            )) || (
                                                    <span className="text-slate-500 text-sm italic">{t('products.detail.techStackNA')}</span>
                                                )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 pt-20 pb-16">
            {/* Hero Section */}
            <div className="bg-slate-900 text-white py-16 md:py-24 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center opacity-20"></div>
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-900"></div>

                <div className="container mx-auto px-4 relative z-10 text-center">
                    <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
                        {t('products.hero.titlePart1')}<span className="text-blue-500">{t('products.hero.titleHighlight')}</span>
                    </h1>
                    <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto mb-8 animate-in fade-in slide-in-from-bottom-6 duration-700 delay-100">
                        {t('products.hero.description')}
                    </p>

                    {/* Search Bar */}
                    {/* Search Bar (Hidden for now) */}
                    {/*
                    <div className="max-w-md mx-auto relative animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
                        <input
                            type="text"
                            placeholder="Search products..."
                            className="w-full px-6 py-4 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                    </div>
                    */}
                </div>
            </div>

            {/* Main Content */}
            <div className="container mx-auto px-4 mt-12 relative z-20">
                {/* Products Grid */}
                {filteredProducts.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredProducts.map((product, index) => (
                            <div
                                key={product.id}
                                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-100 group flex flex-col h-full animate-in fade-in slide-in-from-bottom-4"
                                style={{ animationDelay: `${index * 100}ms` }}
                            >
                                {/* Image */}
                                <div className="relative h-56 overflow-hidden">
                                    <img
                                        src={product.image}
                                        alt={product.title}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                                    {product.isNew && (
                                        <div className="absolute top-4 left-4 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                                            NEW
                                        </div>
                                    )}

                                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-slate-800 text-xs font-bold px-3 py-1 rounded-full shadow-sm">
                                        {product.category}
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-6 flex-1 flex flex-col">
                                    <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                                        {product.title}
                                    </h3>
                                    <p className="text-slate-600 text-sm mb-6 flex-1">
                                        {product.description}
                                    </p>

                                    {/* Features */}
                                    <div className="mb-6 space-y-2">
                                        {product.features.slice(0, 3).map((feature, idx) => (
                                            <div key={idx} className="flex items-center text-xs text-slate-500">
                                                <CheckCircle className="w-3 h-3 mr-2 text-green-500" />
                                                {feature.title}
                                            </div>
                                        ))}
                                    </div>

                                    {/* Action */}
                                    <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between">
                                        <button
                                            onClick={() => setSelectedProduct(product)}
                                            className="text-blue-600 font-bold text-sm flex items-center hover:underline"
                                        >
                                            {t('products.detail.learnMore')} <ArrowRight className="ml-1 w-4 h-4" />
                                        </button>
                                        {product.demoUrl && (
                                            <a
                                                href={product.demoUrl}
                                                className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-2 rounded-lg text-xs font-bold transition-colors flex items-center"
                                            >
                                                {t('products.detail.liveDemo')} <ExternalLink className="ml-1 w-3 h-3" />
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <WaitingListSection />
                )}
            </div>

            {/* CTA */}
            <div className="container mx-auto px-4 mt-24">
                <div className="bg-gradient-to-r from-indigo-600 to-violet-600 rounded-3xl p-8 md:p-12 text-center text-white relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                    <div className="relative z-10">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('products.cta.title')}</h2>
                        <p className="text-indigo-100 mb-8 max-w-2xl mx-auto">
                            {t('products.cta.description')}
                        </p>
                        <button className="bg-white text-indigo-600 px-8 py-3 rounded-full font-bold hover:bg-indigo-50 transition-colors shadow-lg">
                            {t('products.cta.button')}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Products;
