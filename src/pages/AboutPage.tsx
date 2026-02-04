import { useTranslation } from 'react-i18next';
import About from '../components/About';

export default function AboutPage() {
    const { t } = useTranslation();

    return (
        <div>
            <section className="py-20 px-4 bg-gradient-to-br from-slate-50 to-white">
                <div className="max-w-7xl mx-auto text-center">
                    <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
                        {t('pages.about.title')}
                    </h1>
                    <p className="text-lg text-slate-600 max-w-3xl mx-auto">
                        {t('pages.about.description')}
                    </p>
                </div>
            </section>
            <About />
        </div>
    );
}
