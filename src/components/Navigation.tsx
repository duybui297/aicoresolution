import { useState } from 'react';
import { Menu, X, Sparkles } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './LanguageSwitcher';

interface NavigationProps {
  activeTab: 'home' | 'services' | 'case-studies' | 'news' | 'contact';
  onTabChange: (tab: 'home' | 'services' | 'case-studies' | 'news' | 'contact') => void;
}

export default function Navigation({ activeTab, onTabChange }: NavigationProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { t } = useTranslation();

  const tabs = [
    { id: 'home' as const, label: t('nav.home') },
    { id: 'services' as const, label: t('nav.services') },
    { id: 'case-studies' as const, label: t('nav.caseStudies') },
    { id: 'news' as const, label: t('nav.news') },
    { id: 'contact' as const, label: t('nav.contact') }
  ];

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => onTabChange('home')}>
            <div className="p-2 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="text-xl font-bold text-slate-900">{t('nav.companyName')}</div>
              <div className="text-xs text-slate-500">{t('nav.tagline')}</div>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`px-6 py-2 rounded-xl font-semibold transition-all duration-300 ${activeTab === tab.id
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'text-slate-700 hover:bg-slate-100'
                  }`}
              >
                {tab.label}
              </button>
            ))}
            <LanguageSwitcher />
          </div>

          <button
            className="md:hidden text-slate-900"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden py-4 space-y-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  onTabChange(tab.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full px-6 py-3 rounded-xl font-semibold transition-all duration-300 text-left ${activeTab === tab.id
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'text-slate-700 hover:bg-slate-100'
                  }`}
              >
                {tab.label}
              </button>
            ))}
            <div className="pt-2">
              <LanguageSwitcher />
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
