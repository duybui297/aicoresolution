import { useTranslation } from 'react-i18next';
import { Languages } from 'lucide-react';

export default function LanguageSwitcher() {
    const { i18n } = useTranslation();

    const toggleLanguage = () => {
        const newLang = i18n.language === 'vi' ? 'en' : 'vi';
        i18n.changeLanguage(newLang);
    };

    return (
        <button
            onClick={toggleLanguage}
            className="flex items-center gap-2 px-4 py-2 rounded-xl font-semibold text-slate-700 hover:bg-slate-100 transition-all duration-300"
            title={i18n.language === 'vi' ? 'Switch to English' : 'Chuyển sang Tiếng Việt'}
        >
            <Languages className="w-5 h-5" />
            <span className="text-sm font-bold uppercase">{i18n.language === 'vi' ? 'EN' : 'VI'}</span>
        </button>
    );
}
