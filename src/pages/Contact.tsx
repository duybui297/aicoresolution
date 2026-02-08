import { MapPin, Mail, Phone } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function Contact() {
  const { t } = useTranslation();

  return (
    <section className="py-12 bg-white min-h-screen">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Form */}
          <div>
            <h2 className="text-4xl font-bold mb-6">{t('contact.title')}</h2>
            <p className="text-slate-600 mb-8">
              {t('contact.description')}
            </p>

            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">{t('contact.fullname')}</label>
                  <input type="text" className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50" placeholder={t('contact.fullnamePlaceholder')} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">{t('contact.email')}</label>
                  <input type="email" className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50" placeholder="email@company.com" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">{t('contact.phone')}</label>
                <input type="tel" className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50" placeholder="0912..." />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">{t('contact.subject')}</label>
                <select className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50">
                  <option>{t('contact.subjects.aiIntegration')}</option>
                  <option>{t('contact.subjects.webApp')}</option>
                  <option>{t('contact.subjects.consulting')}</option>
                  <option>{t('contact.subjects.other')}</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">{t('contact.message')}</label>
                <textarea rows={4} className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50" placeholder={t('contact.messagePlaceholder')}></textarea>
              </div>
              <button type="submit" className="w-full bg-blue-600 text-white font-bold py-4 rounded-lg hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/20">
                {t('contact.submit')}
              </button>
            </form>
          </div>

          {/* Info & Map */}
          <div className="bg-slate-50 p-8 rounded-2xl">
            <h3 className="text-2xl font-bold mb-6">{t('contact.info.title')}</h3>
            <ul className="space-y-6 mb-8">
              <li className="flex items-start">
                <div className="bg-blue-100 p-3 rounded-lg mr-4">
                  <MapPin className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">{t('contact.info.headquarters')}</h4>
                  <p className="text-slate-600">{t('contact.info.address')}</p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="bg-blue-100 p-3 rounded-lg mr-4">
                  <Mail className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">Email</h4>
                  <p className="text-slate-600">contact@aicoresolutions.vn</p>
                  <p className="text-slate-600">support@aicoresolutions.vn</p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="bg-blue-100 p-3 rounded-lg mr-4">
                  <Phone className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">Hotline</h4>
                  <p className="text-slate-600">+84 905 123 456</p>
                  <p className="text-slate-600 text-sm">{t('contact.info.hours')}</p>
                </div>
              </li>
            </ul>

            {/* Simulated Map */}
            <div className="w-full h-64 bg-slate-200 rounded-xl relative overflow-hidden group">
              <img
                src="https://picsum.photos/seed/map/800/400"
                alt="Map location"
                className="w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-white/90 backdrop-blur px-4 py-2 rounded shadow-lg text-sm font-bold flex items-center">
                  <MapPin className="w-4 h-4 text-red-500 mr-2" />
                  AI Core Office
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
