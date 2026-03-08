import React, { useState, useEffect } from 'react';
import {
    Calendar,
    MapPin,
    Users,
    Clock,
    CheckCircle,
    X,
    Video,
    CreditCard,
    QrCode,
    Loader2,
    Share2,
    Info,
    ArrowRight
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Event, Registration } from '../types';
import { EVENTS } from '../constants';
import { sendNotificationEmail } from '../services/emailService';

// Helper: resolve bilingual field
function getLang(field: string | { vi: string; en: string }, lang: string): string;
function getLang(field: string[] | { vi: string[]; en: string[] }, lang: string): string[];
function getLang(
    field: string | string[] | { vi: string; en: string } | { vi: string[]; en: string[] },
    lang: string
): string | string[] {
    if (field && typeof field === 'object' && 'vi' in field) {
        const biField = field as { vi: string | string[]; en: string | string[] };
        return biField[lang === 'en' ? 'en' : 'vi'] as string | string[];
    }
    return field as string | string[];
}

// --- Helper Functions ---
const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
};

const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('vi-VN', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    }).format(date);
};

// --- Mock Service ---
const CommunityService = {
    getEvents: () => {
        return EVENTS;
    },

    registerEvent: (registration: Omit<Registration, 'id' | 'registeredAt'>): Promise<Registration> => {
        return new Promise((resolve) => {
            setTimeout(() => {
                const newReg: Registration = {
                    ...registration,
                    id: `reg-${Date.now()}`,
                    registeredAt: new Date().toISOString()
                };
                const existingRegs = JSON.parse(localStorage.getItem('registrations') || '[]');
                localStorage.setItem('registrations', JSON.stringify([...existingRegs, newReg]));
                resolve(newReg);
            }, 1000);
        });
    },

    getRegistrations: (eventId: string): Registration[] => {
        const allRegs = JSON.parse(localStorage.getItem('registrations') || '[]');
        return allRegs.filter((r: Registration) => r.eventId === eventId);
    }
};

// --- Components ---

const EventCard = ({ event, onClick }: { event: Event; onClick: () => void }) => {
    const { t, i18n } = useTranslation();
    const isEnded = new Date(event.date) < new Date();

    return (
        <div
            className={`bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-md transition-all cursor-pointer group flex flex-col h-full ${event.isFeatured ? 'ring-2 ring-blue-500/20' : ''}`}
            onClick={onClick}
        >
            <div className="relative h-48 overflow-hidden">
                <img
                    src={event.image}
                    alt={getLang(event.title, i18n.language)}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {event.isFeatured && (
                    <div className="absolute top-3 right-3 bg-yellow-400 text-yellow-900 text-xs font-bold px-2 py-1 rounded-full shadow-sm flex items-center">
                        <Share2 className="w-3 h-3 mr-1" /> Featured
                    </div>
                )}
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-slate-800 text-xs font-bold px-2 py-1 rounded-md shadow-sm">
                    {event.price === 0 ? t('community.event.free') : formatCurrency(event.price)}
                </div>
            </div>

            <div className="p-5 flex-grow flex flex-col">
                <div className="flex items-center text-xs text-slate-500 mb-2 space-x-3">
                    <span className="flex items-center"><Calendar className="w-3 h-3 mr-1" /> {formatDate(event.date).split(' ')[1]}</span>
                    <span className="flex items-center"><Clock className="w-3 h-3 mr-1" /> {formatDate(event.date).split(' ')[0]}</span>
                </div>

                <h3 className="text-lg font-bold text-slate-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                    {getLang(event.title, i18n.language)}
                </h3>

                <div className="mt-auto space-y-2">
                    <div className="flex items-center text-sm text-slate-600">
                        {event.isOnline ? <Video className="w-4 h-4 mr-2 text-blue-500" /> : <MapPin className="w-4 h-4 mr-2 text-red-500" />}
                        <span className="truncate">{event.location}</span>
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-slate-50">
                        <div className="flex items-center text-xs text-slate-500">
                            <Users className="w-3 h-3 mr-1" />
                            {t('community.event.registeredOf', { count: event.registeredCount, max: event.maxSeats })}
                        </div>
                        <span className={`text-xs font-medium px-2 py-1 rounded-full ${isEnded ? 'bg-slate-100 text-slate-500' :
                            event.status === 'full' ? 'bg-red-100 text-red-600' :
                                'bg-green-100 text-green-600'
                            }`}>
                            {isEnded ? t('community.event.ended') : event.status === 'full' ? t('community.event.full') : t('community.event.open')}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

const PaymentModal = ({ amount, onClose, onSuccess }: { amount: number, onClose: () => void, onSuccess: () => void }) => {
    const { t } = useTranslation();
    const [step, setStep] = useState<'method' | 'qr' | 'processing' | 'success'>('method');

    useEffect(() => {
        if (step === 'processing') {
            const timer = setTimeout(() => {
                setStep('success');
                setTimeout(onSuccess, 1500);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [step, onSuccess]);

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
                <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                    <h3 className="font-bold text-slate-800">{t('community.payment.title')}</h3>
                    <button onClick={onClose} className="p-1 hover:bg-slate-200 rounded-full transition-colors"><X className="w-5 h-5" /></button>
                </div>

                <div className="p-6">
                    {step === 'method' && (
                        <div className="space-y-4">
                            <p className="text-sm text-slate-600 mb-4">{t('community.payment.selectMethod')} <span className="font-bold text-blue-600">{formatCurrency(amount)}</span></p>

                            <button onClick={() => setStep('qr')} className="w-full flex items-center p-4 border border-slate-200 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all group">
                                <div className="bg-blue-100 p-2 rounded-lg mr-4 group-hover:bg-blue-200"><QrCode className="w-6 h-6 text-blue-600" /></div>
                                <div className="text-left">
                                    <div className="font-bold text-slate-800">{t('community.payment.vietqr')}</div>
                                    <div className="text-xs text-slate-500">{t('community.payment.vietqrSub')}</div>
                                </div>
                                <ArrowRight className="ml-auto w-4 h-4 text-slate-400 group-hover:text-blue-500" />
                            </button>

                            <button onClick={() => setStep('qr')} className="w-full flex items-center p-4 border border-slate-200 rounded-xl hover:border-pink-500 hover:bg-pink-50 transition-all group">
                                <div className="bg-pink-100 p-2 rounded-lg mr-4 group-hover:bg-pink-200"><CreditCard className="w-6 h-6 text-pink-600" /></div>
                                <div className="text-left">
                                    <div className="font-bold text-slate-800">{t('community.payment.momo')}</div>
                                    <div className="text-xs text-slate-500">{t('community.payment.momoSub')}</div>
                                </div>
                                <ArrowRight className="ml-auto w-4 h-4 text-slate-400 group-hover:text-pink-500" />
                            </button>
                        </div>
                    )}

                    {step === 'qr' && (
                        <div className="text-center space-y-4">
                            <div className="bg-white p-4 border-2 border-blue-500 rounded-xl inline-block shadow-lg relative">
                                <img
                                    src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=Payment_for_Event_${amount}`}
                                    alt="Payment QR"
                                    className="w-48 h-48"
                                />
                                <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 bg-white/90 transition-opacity cursor-pointer" onClick={() => setStep('processing')}>
                                    <span className="text-sm font-bold text-blue-600">{t('community.payment.simulate')}</span>
                                </div>
                            </div>
                            <p className="text-sm text-slate-600">{t('community.payment.scanGuide')}</p>
                            <div className="flex justify-center space-x-2">
                                <Loader2 className="w-4 h-4 animate-spin text-blue-500" />
                                <span className="text-xs text-blue-500">{t('community.payment.waiting')}</span>
                            </div>
                        </div>
                    )}

                    {step === 'processing' && (
                        <div className="text-center py-8 space-y-4">
                            <Loader2 className="w-12 h-12 animate-spin text-blue-600 mx-auto" />
                            <h4 className="font-bold text-slate-800">{t('community.payment.processing')}</h4>
                            <p className="text-sm text-slate-500">{t('community.payment.processingNote')}</p>
                        </div>
                    )}

                    {step === 'success' && (
                        <div className="text-center py-8 space-y-4 animate-in zoom-in duration-300">
                            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                                <CheckCircle className="w-8 h-8 text-green-600" />
                            </div>
                            <h4 className="font-bold text-green-600 text-xl">{t('community.payment.successTitle')}</h4>
                            <p className="text-sm text-slate-500">{t('community.payment.successNote')}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

const EventMaterialsSignup = ({ eventId: _eventId, eventTitle }: { eventId: string; eventTitle: string }) => {
    const { t } = useTranslation();
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await sendNotificationEmail({
            type: 'event_materials',
            email,
            phone,
            eventTitle,
        });
        setIsSubmitted(true);
    };

    if (isSubmitted) {
        return (
            <div className="bg-green-50 border border-green-100 rounded-xl p-6 text-center animate-in fade-in">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                </div>
                <h3 className="text-base font-bold text-green-800 mb-1">{t('community.materials.successTitle')}</h3>
                <p className="text-sm text-green-600">{t('community.materials.successMsg')}</p>
            </div>
        );
    }

    return (
        <div className="bg-slate-50 rounded-xl border border-slate-200 p-5 animate-in slide-in-from-bottom-2 duration-300">
            <h3 className="font-bold text-slate-900 mb-2 flex items-center">
                <Share2 className="w-4 h-4 mr-2 text-blue-600" /> {t('community.materials.title')}
            </h3>
            <p className="text-xs text-slate-500 mb-4">{t('community.materials.subtitle')}</p>

            <form onSubmit={handleSubmit} className="space-y-3">
                <div>
                    <input
                        type="email"
                        required
                        className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none bg-white"
                        placeholder={t('community.form.emailPlaceholder')}
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                </div>
                <div>
                    <input
                        type="tel"
                        required
                        className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none bg-white"
                        placeholder={t('community.form.phonePlaceholder')}
                        value={phone}
                        onChange={e => setPhone(e.target.value)}
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-slate-900 text-white text-sm font-bold py-2.5 rounded-lg hover:bg-slate-800 transition-colors"
                >
                    {t('community.materials.send')}
                </button>
            </form>
        </div>
    );
};

const EventModal = ({ event, onClose }: { event: Event; onClose: () => void }) => {
    const { t, i18n } = useTranslation();
    const [formData, setFormData] = useState({ fullName: '', email: '', phone: '', note: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showPayment, setShowPayment] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const isEnded = new Date(event.date) < new Date();
    const eventTitle = getLang(event.title, i18n.language);
    const eventDescription = getLang(event.description, i18n.language);
    const eventAgenda = getLang(event.agenda, i18n.language) as string[];

    useEffect(() => {
        const handleKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
        document.addEventListener('keydown', handleKey);
        return () => document.removeEventListener('keydown', handleKey);
    }, [onClose]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (event.price > 0) { setShowPayment(true); }
        else { await processRegistration('free'); }
    };

    const processRegistration = async (paymentStatus: 'paid' | 'free') => {
        setIsSubmitting(true);
        try {
            await CommunityService.registerEvent({
                eventId: event.id,
                fullName: formData.fullName,
                email: formData.email,
                phone: formData.phone,
                note: formData.note,
                paymentStatus
            });

            await sendNotificationEmail({
                type: 'event_registration',
                fullName: formData.fullName,
                email: formData.email,
                phone: formData.phone,
                eventTitle: eventTitle,
                eventDate: formatDate(event.date),
                paymentStatus,
                note: formData.note || undefined,
            });

            setShowPayment(false);
            setIsSuccess(true);
        } catch (error) {
            console.error(error);
            alert('Có lỗi xảy ra, vui lòng thử lại.');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isSuccess) {
        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-8 text-center animate-in zoom-in duration-300">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle className="w-10 h-10 text-green-600" />
                    </div>
                    <h2 className="text-2xl font-bold text-slate-900 mb-2">{t('community.form.successTitle')}</h2>
                    <p className="text-slate-600 mb-6">
                        {t('community.form.successMsg')} <strong>{eventTitle}</strong>.
                        {' '}{i18n.language === 'en' ? 'We have sent a confirmation email to' : 'Chúng tôi đã gửi email xác nhận đến'} <strong>{formData.email}</strong>.
                    </p>
                    <button onClick={onClose} className="bg-slate-900 text-white px-8 py-3 rounded-xl font-semibold hover:bg-slate-800 transition-all w-full">
                        {t('community.form.done')}
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto" onClick={onClose}>
            {showPayment && (
                <PaymentModal
                    amount={event.price}
                    onClose={() => setShowPayment(false)}
                    onSuccess={() => processRegistration('paid')}
                />
            )}

            <button
                onClick={onClose}
                className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center bg-white/20 hover:bg-white/40 text-white rounded-full backdrop-blur-sm transition-all hover:scale-110 active:scale-95"
                aria-label="Close"
            >
                <X className="w-5 h-5" />
            </button>

            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-6xl overflow-hidden flex flex-col md:flex-row max-h-[90vh] animate-in fade-in slide-in-from-bottom-4 duration-300" onClick={e => e.stopPropagation()}>
                <div className="md:w-1/2 bg-slate-50 relative">
                    <img src={event.image} alt={eventTitle} className="w-full h-48 md:h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent md:hidden"></div>
                </div>

                <div className="md:w-1/2 p-6 md:p-10 overflow-y-auto custom-scrollbar">
                    <div className="mb-4">
                        <span className={`text-xs font-bold px-2 py-1 rounded-md uppercase tracking-wider ${event.price === 0 ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}>
                            {event.price === 0 ? t('community.event.free') : t('community.event.paid')}
                        </span>
                    </div>

                    <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">{eventTitle}</h2>

                    <div className="flex flex-col space-y-3 mb-6 text-sm text-slate-600">
                        <div className="flex items-center"><Calendar className="w-4 h-4 mr-3 text-blue-500" /> {formatDate(event.date)}</div>
                        <div className="flex items-center"><MapPin className="w-4 h-4 mr-3 text-red-500" /> {event.location}</div>
                        {event.speaker && (
                            <div className="flex items-center mt-2 p-3 bg-slate-50 rounded-lg border border-slate-100">
                                <img src={event.speaker.avatar} alt={event.speaker.name} className="w-10 h-10 rounded-full mr-3 object-cover" />
                                <div>
                                    <div className="font-bold text-slate-900">{event.speaker.name}</div>
                                    <div className="text-xs text-slate-500">{event.speaker.role}</div>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="prose prose-sm text-slate-600 mb-8">
                        <h4 className="font-bold text-slate-900 mb-2">{t('community.event.intro')}</h4>
                        <p className="mb-4">{eventDescription}</p>

                        {eventAgenda.length > 0 && (
                            <>
                                <h4 className="font-bold text-slate-900 mb-2">{t('community.event.agenda')}</h4>
                                <ul className="list-disc pl-4 space-y-1">
                                    {eventAgenda.map((item: string, idx: number) => <li key={idx}>{item}</li>)}
                                </ul>
                            </>
                        )}
                    </div>

                    {isEnded ? (
                        <EventMaterialsSignup eventId={event.id} eventTitle={eventTitle} />
                    ) : (
                        <div className="bg-slate-50 p-6 rounded-xl border border-slate-100">
                            <h3 className="font-bold text-lg text-slate-900 mb-4 flex items-center">
                                <Info className="w-5 h-5 mr-2 text-blue-600" /> {t('community.form.title')}
                            </h3>

                            {event.status === 'open' ? (
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-xs font-medium text-slate-700 mb-1">{t('community.form.fullName')} <span className="text-red-500">*</span></label>
                                            <input required type="text" className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                                                placeholder={t('community.form.fullNamePlaceholder')} value={formData.fullName} onChange={e => setFormData({ ...formData, fullName: e.target.value })} />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-medium text-slate-700 mb-1">{t('community.form.phone')} <span className="text-red-500">*</span></label>
                                            <input required type="tel" className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                                                placeholder={t('community.form.phonePlaceholder')} value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-medium text-slate-700 mb-1">{t('community.form.email')} <span className="text-red-500">*</span></label>
                                        <input required type="email" className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                                            placeholder={t('community.form.emailPlaceholder')} value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-medium text-slate-700 mb-1">{t('community.form.note')}</label>
                                        <textarea rows={2} className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                                            placeholder={t('community.form.notePlaceholder')} value={formData.note} onChange={e => setFormData({ ...formData, note: e.target.value })}></textarea>
                                    </div>

                                    <div className="pt-2">
                                        <button type="submit" disabled={isSubmitting}
                                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl shadow-lg shadow-blue-600/20 transition-all transform active:scale-95 flex items-center justify-center">
                                            {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : (
                                                <>
                                                    {event.price > 0 ? t('community.form.submitPaid', { amount: formatCurrency(event.price) }) : t('community.form.submitFree')}
                                                    <ArrowRight className="ml-2 w-4 h-4" />
                                                </>
                                            )}
                                        </button>
                                        <p className="text-xs text-center text-slate-400 mt-3">{t('community.form.privacy')}</p>
                                    </div>
                                </form>
                            ) : (
                                <div className="text-center py-6 bg-slate-100 rounded-lg border border-slate-200 border-dashed">
                                    <span className="font-bold text-slate-500">{t('community.form.fullTitle')}</span>
                                    <p className="text-xs text-slate-400 mt-1">{t('community.form.fullSubtitle')}</p>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

const FeaturedEvent = ({ event, onClick }: { event: Event; onClick: () => void }) => {
    const { t, i18n } = useTranslation();
    return (
        <div className="container mx-auto px-4 -mt-24 relative z-20 mb-16">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col lg:flex-row border border-slate-100">
                <div className="lg:w-1/2 relative min-h-[300px] lg:min-h-[400px]">
                    <img src={event.image} alt={getLang(event.title, i18n.language)} className="absolute inset-0 w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent lg:hidden"></div>
                    <div className="absolute top-4 left-4 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md animate-pulse flex items-center">
                        <Clock className="w-3 h-3 mr-1" /> {t('community.event.upcoming')}
                    </div>
                    <div className="absolute bottom-4 left-4 text-white font-bold lg:hidden">
                        <div className="flex items-center text-sm mb-1"><Calendar className="w-4 h-4 mr-2" /> {formatDate(event.date)}</div>
                        <div className="flex items-center text-sm"><MapPin className="w-4 h-4 mr-2" /> {event.location}</div>
                    </div>
                </div>
                <div className="lg:w-1/2 p-8 lg:p-12 flex flex-col justify-center">
                    <div className="hidden lg:flex items-center space-x-2 text-blue-600 font-bold text-sm mb-4 uppercase tracking-wider">
                        <Calendar className="w-4 h-4" />
                        <span>{formatDate(event.date)}</span>
                    </div>
                    <h2 className="text-2xl lg:text-4xl font-bold text-slate-900 mb-4 leading-tight">{getLang(event.title, i18n.language)}</h2>
                    <p className="text-slate-600 mb-6 line-clamp-3 text-base lg:text-lg">{getLang(event.description, i18n.language)}</p>

                    <div className="hidden lg:flex flex-wrap gap-6 mb-8">
                        <div className="flex items-center text-sm text-slate-500">
                            <MapPin className="w-4 h-4 mr-2 text-red-500" />
                            {event.location}
                        </div>
                        <div className="flex items-center text-sm text-slate-500">
                            <Users className="w-4 h-4 mr-2 text-blue-500" />
                            {t('community.event.registeredOf', { count: event.registeredCount, max: event.maxSeats })}
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <button onClick={onClick}
                            className="flex-1 lg:flex-none bg-blue-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20 flex items-center justify-center">
                            {t('community.event.registerBtn')} <ArrowRight className="ml-2 w-5 h-5" />
                        </button>
                        <div className="text-slate-900 font-bold text-lg lg:hidden">
                            {event.price === 0 ? t('community.event.free') : formatCurrency(event.price)}
                        </div>
                    </div>
                    <div className="hidden lg:block mt-4 text-sm text-slate-500">
                        {t('community.event.limitedSeats', { price: event.price === 0 ? t('community.event.free').toLowerCase() : formatCurrency(event.price) })}
                    </div>
                </div>
            </div>
        </div>
    );
};

// --- Admin Component ---

const AdminModal = ({ onClose }: { onClose: () => void }) => {
    const { t, i18n } = useTranslation();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState('');
    const [selectedEventId, setSelectedEventId] = useState<string | null>(null);
    const events = CommunityService.getEvents();

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (password === 'admin123') { setIsAuthenticated(true); }
        else { alert(t('community.admin.wrongPass')); }
    };

    const registrations = selectedEventId ? CommunityService.getRegistrations(selectedEventId) : [];
    const selectedEvent = events.find(e => e.id === selectedEventId);

    return (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl h-[80vh] flex flex-col overflow-hidden animate-in fade-in zoom-in duration-200">
                <div className="p-4 border-b border-slate-200 flex justify-between items-center bg-slate-900 text-white">
                    <h3 className="font-bold flex items-center"><Users className="w-5 h-5 mr-2" /> {t('community.admin.title')}</h3>
                    <button onClick={onClose} className="p-1 hover:bg-white/20 rounded-full transition-colors"><X className="w-5 h-5" /></button>
                </div>

                {!isAuthenticated ? (
                    <div className="flex-grow flex items-center justify-center bg-slate-50">
                        <form onSubmit={handleLogin} className="bg-white p-8 rounded-xl shadow-lg w-full max-w-sm">
                            <h4 className="text-xl font-bold mb-4 text-center">{t('community.admin.loginTitle')}</h4>
                            <input type="password" className="w-full px-4 py-2 border border-slate-300 rounded-lg mb-4 focus:ring-2 focus:ring-blue-500 outline-none"
                                placeholder="admin123" value={password} onChange={e => setPassword(e.target.value)} />
                            <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg font-bold hover:bg-blue-700">{t('community.admin.loginBtn')}</button>
                        </form>
                    </div>
                ) : (
                    <div className="flex flex-grow overflow-hidden">
                        <div className="w-1/3 border-r border-slate-200 overflow-y-auto bg-slate-50">
                            <div className="p-4 font-bold text-slate-500 text-xs uppercase tracking-wider">{t('community.admin.eventList')}</div>
                            {events.map(event => (
                                <div key={event.id} onClick={() => setSelectedEventId(event.id)}
                                    className={`p-4 border-b border-slate-100 cursor-pointer hover:bg-blue-50 transition-colors ${selectedEventId === event.id ? 'bg-blue-100 border-l-4 border-l-blue-600' : ''}`}>
                                    <div className="font-bold text-sm text-slate-800 line-clamp-1">{getLang(event.title, i18n.language)}</div>
                                    <div className="flex justify-between mt-1">
                                        <span className="text-xs text-slate-500">{formatDate(event.date).split(' ')[0]}</span>
                                        <span className="text-xs font-bold text-blue-600">{t('community.admin.regCount', { count: CommunityService.getRegistrations(event.id).length })}</span>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="w-2/3 overflow-y-auto p-6 bg-white">
                            {selectedEvent ? (
                                <>
                                    <h4 className="text-xl font-bold mb-1">{getLang(selectedEvent.title, i18n.language)}</h4>
                                    <div className="text-sm text-slate-500 mb-6">{t('community.admin.regList')}</div>

                                    {registrations.length > 0 ? (
                                        <div className="overflow-x-auto">
                                            <table className="w-full text-sm text-left">
                                                <thead className="bg-slate-100 text-slate-600 font-bold uppercase text-xs">
                                                    <tr>
                                                        <th className="p-3 rounded-tl-lg">{t('community.admin.colName')}</th>
                                                        <th className="p-3">{t('community.admin.colContact')}</th>
                                                        <th className="p-3">{t('community.admin.colStatus')}</th>
                                                        <th className="p-3 rounded-tr-lg">{t('community.admin.colDate')}</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="divide-y divide-slate-100">
                                                    {registrations.map(reg => (
                                                        <tr key={reg.id} className="hover:bg-slate-50">
                                                            <td className="p-3 font-medium text-slate-900">{reg.fullName}</td>
                                                            <td className="p-3">
                                                                <div className="text-slate-800">{reg.email}</div>
                                                                <div className="text-slate-500 text-xs">{reg.phone}</div>
                                                            </td>
                                                            <td className="p-3">
                                                                <span className={`px-2 py-1 rounded-full text-xs font-bold ${reg.paymentStatus === 'paid' ? 'bg-green-100 text-green-700' :
                                                                    reg.paymentStatus === 'free' ? 'bg-blue-100 text-blue-700' : 'bg-yellow-100 text-yellow-700'}`}>
                                                                    {reg.paymentStatus === 'paid' ? t('community.admin.paid') :
                                                                        reg.paymentStatus === 'free' ? t('community.admin.paidFree') : t('community.admin.pending')}
                                                                </span>
                                                            </td>
                                                            <td className="p-3 text-slate-500 text-xs">{new Date(reg.registeredAt).toLocaleString('vi-VN')}</td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    ) : (
                                        <div className="text-center py-12 text-slate-400 border-2 border-dashed border-slate-200 rounded-xl">
                                            {t('community.admin.noReg')}
                                        </div>
                                    )}
                                </>
                            ) : (
                                <div className="h-full flex items-center justify-center text-slate-400">
                                    {t('community.admin.selectEvent')}
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

// --- Main Community Component ---

const Community = () => {
    const { t } = useTranslation();
    const [activeTab, setActiveTab] = useState<'upcoming' | 'past'>('upcoming');
    const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
    const [showAdmin, setShowAdmin] = useState(false);
    const events = CommunityService.getEvents();

    const upcomingEvents = events.filter(e => new Date(e.date) >= new Date()).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    const pastEvents = events.filter(e => new Date(e.date) < new Date()).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    const nearestEvent = upcomingEvents.length > 0 ? upcomingEvents[0] : null;
    const displayEvents = activeTab === 'upcoming' ? upcomingEvents : pastEvents;

    return (
        <div className="min-h-screen bg-slate-50 pb-20">
            {/* Hero Section */}
            <section className="relative bg-slate-900 pt-20 pb-32 overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center opacity-20"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/80 to-transparent"></div>

                <div className="container mx-auto px-4 relative z-10 text-center">
                    <span className="inline-block py-1 px-3 rounded-full bg-blue-500/20 text-blue-400 text-xs font-bold mb-4 border border-blue-500/30">
                        {t('community.hero.badge')}
                    </span>
                    <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">
                        {t('community.hero.title')}
                    </h1>
                    <p className="text-lg text-slate-300 max-w-2xl mx-auto mb-10">
                        {t('community.hero.subtitle')}
                    </p>
                </div>
            </section>

            {/* Featured Event */}
            {nearestEvent && (
                <FeaturedEvent event={nearestEvent} onClick={() => setSelectedEvent(nearestEvent)} />
            )}

            {/* Events List */}
            <div id="events-list" className={`container mx-auto px-4 ${nearestEvent ? 'pt-0' : 'pt-16'} pb-16`}>
                {/* Tabs */}
                <div className="flex flex-col items-center mb-12">
                    <div className="bg-white p-1 rounded-full shadow-sm border border-slate-200 inline-flex">
                        <button onClick={() => setActiveTab('upcoming')}
                            className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${activeTab === 'upcoming' ? 'bg-slate-900 text-white shadow-md' : 'text-slate-500 hover:text-slate-900'}`}>
                            {t('community.tabs.upcoming', { count: upcomingEvents.length })}
                        </button>
                        <button onClick={() => setActiveTab('past')}
                            className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${activeTab === 'past' ? 'bg-slate-900 text-white shadow-md' : 'text-slate-500 hover:text-slate-900'}`}>
                            {t('community.tabs.past', { count: pastEvents.length })}
                        </button>
                    </div>
                </div>

                {/* Grid */}
                {displayEvents.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {displayEvents.map(event => (
                            <EventCard key={event.id} event={event} onClick={() => setSelectedEvent(event)} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20">
                        <div className="bg-slate-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Calendar className="w-8 h-8 text-slate-400" />
                        </div>
                        <h3 className="text-slate-900 font-bold text-lg">{t('community.empty.title')}</h3>
                        <p className="text-slate-500">{t('community.empty.subtitle')}</p>
                    </div>
                )}
            </div>

            {/* Newsletter / CTA */}
            <div className="container mx-auto px-4 mb-12">
                <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-8 md:p-12 text-center text-white relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                    <div className="relative z-10">
                        <h2 className="text-2xl md:text-3xl font-bold mb-4">{t('community.newsletter.title')}</h2>
                        <p className="text-blue-100 mb-8 max-w-xl mx-auto">{t('community.newsletter.subtitle')}</p>
                        <div className="flex flex-col sm:flex-row justify-center gap-3 max-w-md mx-auto">
                            <input type="email" placeholder={t('community.newsletter.placeholder')}
                                className="px-5 py-3 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-white/50 w-full" />
                            <button className="bg-slate-900 hover:bg-slate-800 text-white px-6 py-3 rounded-xl font-bold transition-colors whitespace-nowrap">
                                {t('community.newsletter.button')}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Admin Trigger (Secret) */}
            <div className="fixed bottom-4 left-4 z-40 opacity-20 hover:opacity-100 transition-opacity">
                <button onClick={() => setShowAdmin(true)} className="p-2 bg-slate-800 text-white rounded-full text-xs">
                    Admin
                </button>
            </div>

            {/* Modals */}
            {selectedEvent && (
                <EventModal event={selectedEvent} onClose={() => setSelectedEvent(null)} />
            )}
            {showAdmin && (
                <AdminModal onClose={() => setShowAdmin(false)} />
            )}
        </div>
    );
};

export default Community;
