import { Mail, Phone, MapPin, Facebook, Linkedin } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import logo from '../assets/logo.gif';

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="bg-slate-900 text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-2">
            <div className="mb-6">
              <img src={logo} alt="AI Core Solutions" className="h-24 w-auto object-contain rounded-xl" />
            </div>
            <p className="text-slate-300 leading-relaxed mb-6">
              {t('footer.description')}
            </p>
            <div className="flex gap-4">
              <a href="https://www.facebook.com/aicoresolutions" target="_blank" rel="noopener noreferrer" className="p-2 bg-slate-800 rounded-lg hover:bg-blue-600 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="https://www.linkedin.com/company/aicorelabs/" target="_blank" rel="noopener noreferrer" className="p-2 bg-slate-800 rounded-lg hover:bg-blue-600 transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">{t('footer.services.title')}</h3>
            <ul className="space-y-3 text-slate-300">
              <li><a href="#" className="hover:text-blue-400 transition-colors">{t('footer.services.aiDevelopment')}</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">{t('footer.services.webDevelopment')}</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">{t('footer.services.mobileApps')}</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">{t('footer.services.cloudSolutions')}</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">{t('footer.services.consulting')}</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">{t('footer.contact.title')}</h3>
            <ul className="space-y-3 text-slate-300">
              <li className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                <span>{t('footer.contact.email')}</span>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                <span>{t('footer.contact.phone')}</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                <span>{t('footer.contact.address')}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-slate-400 text-sm">
            <p>{t('footer.copyright')}</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-blue-400 transition-colors">{t('footer.privacyPolicy')}</a>
              <a href="#" className="hover:text-blue-400 transition-colors">{t('footer.termsOfService')}</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
