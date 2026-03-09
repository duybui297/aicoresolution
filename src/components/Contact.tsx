import { MapPin, Mail, Phone } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { ZaloIcon } from './icons/ZaloIcon';

export default function Contact() {
    const { t } = useTranslation();

    return (
        <section className="py-12 bg-white min-h-screen">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {/* Form */}
                    <div>
                        <h2 className="text-4xl font-bold mb-6">{t('contact.title', 'Liên Hệ Với Chúng Tôi')}</h2>
                        <p className="text-slate-600 mb-8">
                            {t('contact.description', 'Để lại thông tin, đội ngũ AI Consultant sẽ liên hệ tư vấn giải pháp tối ưu nhất cho doanh nghiệp của bạn trong vòng 24h.')}
                        </p>

                        <form className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">{t('contact.fullname', 'Họ tên')}</label>
                                    <input type="text" className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50" placeholder={t('contact.fullnamePlaceholder', 'Nguyễn Văn A')} />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">{t('contact.email', 'Email')}</label>
                                    <input type="email" className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50" placeholder="email@company.com" />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">{t('contact.phone', 'Số điện thoại')}</label>
                                <input type="tel" className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50" placeholder="0912..." />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">{t('contact.subject', 'Nhu cầu tư vấn')}</label>
                                <select className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50">
                                    <option>{t('contact.subjects.aiIntegration', 'Tích hợp AI vào hệ thống')}</option>
                                    <option>{t('contact.subjects.webApp', 'Triển khai Web/App')}</option>
                                    <option>{t('contact.subjects.consulting', 'Tư vấn chuyển đổi số')}</option>
                                    <option>{t('contact.subjects.other', 'Khác')}</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">{t('contact.message', 'Tin nhắn')}</label>
                                <textarea rows={4} className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50" placeholder={t('contact.messagePlaceholder', 'Mô tả sơ qua về dự án...')}></textarea>
                            </div>
                            <button type="submit" className="w-full bg-blue-600 text-white font-bold py-4 rounded-lg hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/20">
                                {t('contact.submit', 'Gửi Yêu Cầu Tư Vấn')}
                            </button>
                        </form>
                    </div>

                    {/* Info & Map */}
                    <div className="bg-slate-50 p-8 rounded-2xl">
                        <h3 className="text-2xl font-bold mb-6">{t('contact.info.title', 'Thông Tin Liên Hệ')}</h3>
                        <ul className="space-y-6 mb-8">
                            <li className="flex items-start">
                                <div className="bg-blue-100 p-3 rounded-lg mr-4">
                                    <MapPin className="w-6 h-6 text-blue-600" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-slate-900">{t('contact.info.headquarters', 'Trụ sở chính')}</h4>
                                    <p className="text-slate-600">{t('contact.info.address', '101 Nguyễn Du, Thạch Thang Hải Châu Đà Nẵng')}</p>
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
                                    <p className="text-slate-600">{t('contact.info.phone')}</p>
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
