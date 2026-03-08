import { useState } from 'react';
import { MapPin, Mail, Phone, CheckCircle, Loader2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { ZaloIcon } from '../components/icons/ZaloIcon';
import { sendNotificationEmail } from '../services/emailService';

export default function Contact() {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await sendNotificationEmail({
        type: 'contact',
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        subject: formData.subject || t('contact.subjects.aiIntegration'),
        message: formData.message,
      });
      setIsSuccess(true);
    } catch {
      alert('Có lỗi xảy ra, vui lòng thử lại.');
    } finally {
      setIsSubmitting(false);
    }
  };

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

            {isSuccess ? (
              <div className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-green-800 mb-2">{t('contact.successTitle')}</h3>
                <p className="text-green-600">{t('contact.successMessage')}</p>
                <button
                  onClick={() => { setIsSuccess(false); setFormData({ fullName: '', email: '', phone: '', subject: '', message: '' }); }}
                  className="mt-6 text-sm font-medium text-green-700 underline hover:no-underline"
                >
                  {t('contact.sendAnother')}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">{t('contact.fullname')}</label>
                    <input required type="text" className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50"
                      placeholder={t('contact.fullnamePlaceholder')} value={formData.fullName} onChange={e => setFormData({ ...formData, fullName: e.target.value })} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">{t('contact.email')}</label>
                    <input required type="email" className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50"
                      placeholder="email@company.com" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">{t('contact.phone')}</label>
                  <input required type="tel" className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50"
                    placeholder="0912..." value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">{t('contact.subject')}</label>
                  <select className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50"
                    value={formData.subject} onChange={e => setFormData({ ...formData, subject: e.target.value })}>
                    <option value="">{t('contact.subjects.aiIntegration')}</option>
                    <option value="Web/App">{t('contact.subjects.webApp')}</option>
                    <option value="Consulting">{t('contact.subjects.consulting')}</option>
                    <option value="Other">{t('contact.subjects.other')}</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">{t('contact.message')}</label>
                  <textarea required rows={4} className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50"
                    placeholder={t('contact.messagePlaceholder')} value={formData.message} onChange={e => setFormData({ ...formData, message: e.target.value })}></textarea>
                </div>
                <button type="submit" disabled={isSubmitting}
                  className="w-full bg-blue-600 text-white font-bold py-4 rounded-lg hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/20 flex items-center justify-center">
                  {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : t('contact.submit')}
                </button>
              </form>
            )}
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
                  <p className="text-slate-600">info@aicorelabs.net</p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="bg-blue-100 p-3 rounded-lg mr-4">
                  <Phone className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">Hotline</h4>
                  <p className="text-slate-600">+84 869 17 18 12</p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="bg-blue-100 p-3 rounded-lg mr-4">
                  <ZaloIcon className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">{t('contact.info.zaloLabel')}</h4>
                  <p className="text-slate-600">{t('contact.info.zalo')}</p>
                </div>
              </li>
            </ul>

            {/* Map */}
            <div className="w-full h-80 bg-slate-200 rounded-xl relative overflow-hidden group shadow-lg">
              <iframe
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                allowFullScreen
                src="https://maps.google.com/maps?width=100%25&height=600&hl=en&q=101%20Nguyen%20Du,%20Thach%20Thang,%20Hai%20Chau,%20Da%20Nang&t=&z=16&ie=UTF8&iwloc=B&output=embed"
              >
              </iframe>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
