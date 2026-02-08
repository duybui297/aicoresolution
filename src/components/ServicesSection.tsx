import { useState } from 'react';
import { ChevronRight, CheckCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { SERVICES } from '../data/servicesData';

export default function ServicesSection() {
    const { t, i18n } = useTranslation();
    const [activeService, setActiveService] = useState<string>(SERVICES[0].id);

    const currentService = SERVICES.find(s => s.id === activeService);

    const renderTierTitle = (title: string = '') => {
        const parts = title.split(/ [-–] /);
        if (parts.length > 1) {
            return (
                <div className="mb-2">
                    <h4 className="text-lg font-bold text-slate-900">{parts[0]}</h4>
                    <p className="text-sm text-slate-500 font-medium">{parts[1]}</p>
                </div>
            );
        }
        return <h4 className="text-lg font-bold text-slate-900 mb-2">{title}</h4>;
    };

    const getTierFeatures = (tier: string) => {
        if (!currentService) return [];
        const specificKey = `services.items.${currentService.id}.tierFeatures.${tier}`;
        const specificFeatures = t(specificKey, { returnObjects: true });

        if (Array.isArray(specificFeatures)) {
            return specificFeatures as string[];
        }

        // Fallback to global tiers if specific ones aren't found
        const globalKey = `services.tiers.${tier}`;
        const globalFeatures = t(globalKey, { returnObjects: true });

        return Array.isArray(globalFeatures) ? globalFeatures as string[] : [];
    };

    return (
        <section className="py-12 bg-white min-h-screen">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold mb-4">{t('services.title')}</h2>
                    <p className="text-slate-600">{t('services.description')}</p>
                </div>

                <div className="flex flex-col lg:flex-row gap-12">
                    {/* Sidebar Navigation */}
                    <div className="lg:w-1/4 space-y-2">
                        {SERVICES.map(service => (
                            <button
                                key={service.id}
                                onClick={() => setActiveService(service.id)}
                                className={`w-full text-left px-6 py-4 rounded-xl transition-all flex items-center justify-between ${activeService === service.id ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30' : 'bg-slate-50 text-slate-600 hover:bg-slate-100'}`}
                            >
                                <span className="font-medium">{t(service.name)}</span>
                                {activeService === service.id && <ChevronRight className="w-5 h-5" />}
                            </button>
                        ))}
                    </div>

                    {/* Main Content */}
                    <div className="lg:w-3/4">
                        {currentService && (
                            <div className="animate-fade-in">
                                <div className="mb-8">
                                    <h3 className="text-2xl font-bold mb-2">{t(currentService.name)}</h3>
                                    <p className="text-slate-600 text-lg">{t(currentService.description)}</p>
                                    <div className="flex flex-wrap gap-2 mt-4">
                                        {/* Access features from translation file directly using the key path */}
                                        {t(`services.items.${currentService.id}.features`, { returnObjects: true }) && Array.isArray(t(`services.items.${currentService.id}.features`, { returnObjects: true }))
                                            ? (t(`services.items.${currentService.id}.features`, { returnObjects: true }) as string[]).map((feature: string, idx: number) => (
                                                <span key={idx} className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-medium border border-blue-100">
                                                    {feature}
                                                </span>
                                            ))
                                            : currentService.features.map((featureKey, idx) => (
                                                <span key={idx} className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-medium border border-blue-100">
                                                    {t(featureKey)}
                                                </span>
                                            ))
                                        }
                                    </div>
                                </div>

                                {/* Pricing Table */}
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    {/* Basic */}
                                    <div className="flex flex-col border border-slate-200 rounded-2xl p-6 hover:shadow-lg transition-shadow bg-white relative overflow-hidden">
                                        <div className="absolute top-0 left-0 w-full h-1 bg-slate-300"></div>
                                        {renderTierTitle(t('services.tierTitles.basic'))}
                                        <div className="text-3xl font-bold text-slate-800 mb-6">
                                            {t(`services.items.${currentService.id}.tiers.basic`) !== `services.items.${currentService.id}.tiers.basic`
                                                ? (
                                                    <>{t(`services.items.${currentService.id}.tiers.basic`)} <span className="text-sm font-normal text-slate-500">{i18n.language === 'en' ? 'USD' : 'VND'}</span></>
                                                )
                                                : <>{currentService.tiers.basic} <span className="text-sm font-normal text-slate-500">VND</span></>
                                            }
                                        </div>
                                        <ul className="space-y-3 mb-8 text-sm text-slate-600">
                                            {getTierFeatures('basic').map((feature, idx) => (
                                                <li key={idx} className="flex items-start">
                                                    <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                                                    <span>{feature}</span>
                                                </li>
                                            ))}
                                        </ul>
                                        <button className="mt-auto w-full py-2 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors font-medium text-slate-700">{t('services.select')}</button>
                                    </div>

                                    {/* Standard */}
                                    <div className="flex flex-col border border-blue-200 rounded-2xl p-6 shadow-xl shadow-blue-100 bg-white relative overflow-hidden transform md:-translate-y-4">
                                        <div className="absolute top-0 left-0 w-full h-1 bg-blue-500"></div>
                                        <div className="absolute top-4 right-4 bg-blue-100 text-blue-700 text-xs font-bold px-2 py-1 rounded">{t('services.popular')}</div>
                                        {renderTierTitle(t('services.tierTitles.standard'))}
                                        <div className="text-3xl font-bold text-blue-600 mb-6">
                                            {t(`services.items.${currentService.id}.tiers.standard`) !== `services.items.${currentService.id}.tiers.standard`
                                                ? (
                                                    <>{t(`services.items.${currentService.id}.tiers.standard`)} <span className="text-sm font-normal text-slate-500">{i18n.language === 'en' ? 'USD' : 'VND'}</span></>
                                                )
                                                : <>{currentService.tiers.standard} <span className="text-sm font-normal text-slate-500">VND</span></>
                                            }
                                        </div>
                                        <ul className="space-y-3 mb-8 text-sm text-slate-600">
                                            {getTierFeatures('standard').map((feature, idx) => (
                                                <li key={idx} className="flex items-start">
                                                    <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                                                    <span>{feature}</span>
                                                </li>
                                            ))}
                                        </ul>
                                        <button className="mt-auto w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">{t('services.contact')}</button>
                                    </div>

                                    {/* Premium */}
                                    <div className="flex flex-col border border-slate-200 rounded-2xl p-6 hover:shadow-lg transition-shadow bg-slate-50 relative overflow-hidden">
                                        <div className="absolute top-0 left-0 w-full h-1 bg-slate-800"></div>
                                        {renderTierTitle(t('services.tierTitles.premium'))}
                                        <div className="text-3xl font-bold text-slate-800 mb-6">
                                            {t(`services.items.${currentService.id}.tiers.premium`) !== `services.items.${currentService.id}.tiers.premium`
                                                ? (
                                                    <>{t(`services.items.${currentService.id}.tiers.premium`)} <span className="text-sm font-normal text-slate-500">{i18n.language === 'en' ? 'USD' : 'VND'}</span></>
                                                )
                                                : <>{currentService.tiers.premium} <span className="text-sm font-normal text-slate-500">VND</span></>
                                            }
                                        </div>
                                        <ul className="space-y-3 mb-8 text-sm text-slate-600">
                                            {getTierFeatures('premium').map((feature, idx) => (
                                                <li key={idx} className="flex items-start">
                                                    <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                                                    <span>{feature}</span>
                                                </li>
                                            ))}
                                        </ul>
                                        <button className="mt-auto w-full py-2 border border-slate-300 rounded-lg hover:bg-white transition-colors font-medium text-slate-700">{t('services.consult')}</button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
