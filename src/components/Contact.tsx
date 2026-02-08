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
                                    <p className="text-slate-600">{t('contact.info.address', '123 Đường Nguyễn Văn Linh, Quận Hải Châu, TP. Đà Nẵng, Việt Nam')}</p>
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
                                    <p className="text-slate-600 text-sm">{t('contact.info.hours', '(08:00 - 17:30, Thứ 2 - Thứ 6)')}</p>
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
