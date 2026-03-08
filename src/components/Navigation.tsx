import { useState } from 'react';
import logo from '../assets/logo.png';
import { Menu, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';
import LanguageSwitcher from './LanguageSwitcher';
import { ROUTE_PATHS, getRouteKeyByPath } from '../utils/routeConstants';

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { t, i18n } = useTranslation();
  const location = useLocation();

  const lang = i18n.language === 'vi' ? 'vi' : 'en';

  const tabs = [
    { id: 'home', label: t('nav.home'), path: ROUTE_PATHS.home[lang] },
    { id: 'services', label: t('nav.services'), path: ROUTE_PATHS.services[lang] },
    { id: 'case-studies', label: t('nav.caseStudies'), path: ROUTE_PATHS.caseStudies[lang] },
    { id: 'products', label: t('nav.products'), path: ROUTE_PATHS.products[lang] },
    { id: 'news', label: t('nav.news'), path: ROUTE_PATHS.news[lang] },
    { id: 'community', label: t('nav.community'), path: ROUTE_PATHS.community[lang] },
    { id: 'contact', label: t('nav.contact'), path: ROUTE_PATHS.contact[lang] }
  ];

  const currentRouteKey = getRouteKeyByPath(location.pathname);

  const isActive = (tabId: string) => {
    if (tabId === 'home') {
      return currentRouteKey === 'home' || location.pathname === '/' || location.pathname === '';
    }
    return currentRouteKey === tabId;
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50 h-24">
      <div className="max-w-7xl mx-auto px-4 h-full">
        <div className="flex items-center justify-between h-full">
          <Link to="/" className="flex h-full items-center gap-3 cursor-pointer">
            <img src={logo} alt="Company Logo" className="h-full w-auto object-contain" />
          </Link>

          <div className="hidden md:flex items-center gap-2">
            {tabs.map((tab) => (
              <Link
                key={tab.id}
                to={tab.path}
                className={`px-6 py-2 rounded-xl font-semibold transition-all duration-300 ${isActive(tab.id)
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'text-slate-700 hover:bg-slate-100'
                  }`}
              >
                {tab.label}
              </Link>
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
              <Link
                key={tab.id}
                to={tab.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`block w-full px-6 py-3 rounded-xl font-semibold transition-all duration-300 text-left ${isActive(tab.id)
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'text-slate-700 hover:bg-slate-100'
                  }`}
              >
                {tab.label}
              </Link>
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
