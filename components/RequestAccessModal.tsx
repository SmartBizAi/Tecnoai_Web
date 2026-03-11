'use client';
import { useState } from 'react';
import { X, CheckCircle2, Zap } from 'lucide-react';
import { useLanguage } from '@/lib/i18n/LanguageContext';

interface Props {
    appName: string;
    onClose: () => void;
}

export default function RequestAccessModal({ appName, onClose }: Props) {
    const { t } = useLanguage();
    const [submitted, setSubmitted] = useState(false);
    const [form, setForm] = useState({ fullName: '', business: '', email: '', phone: '' });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
            <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 animate-in fade-in slide-in-from-bottom-4 duration-200">
                <button
                    onClick={onClose}
                    className="absolute top-5 right-5 p-2 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
                >
                    <X className="w-5 h-5" />
                </button>

                {!submitted ? (
                    <>
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 rounded-xl gradient-brand flex items-center justify-center flex-shrink-0">
                                <Zap className="w-5 h-5 text-white" />
                            </div>
                            <div>
                                <h2 className="text-lg font-bold text-gray-900">{t('app.modal.title')}</h2>
                                <p className="text-sm text-gray-500">{appName}</p>
                            </div>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="label">{t('app.modal.fullname')}</label>
                                <input
                                    type="text"
                                    required
                                    className="input-field"
                                    value={form.fullName}
                                    onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                                    placeholder="Jane Smith"
                                />
                            </div>
                            <div>
                                <label className="label">{t('app.modal.business')}</label>
                                <input
                                    type="text"
                                    required
                                    className="input-field"
                                    value={form.business}
                                    onChange={(e) => setForm({ ...form, business: e.target.value })}
                                    placeholder="Acme Deliveries"
                                />
                            </div>
                            <div>
                                <label className="label">{t('app.modal.email')}</label>
                                <input
                                    type="email"
                                    required
                                    className="input-field"
                                    value={form.email}
                                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                                    placeholder="jane@yourbusiness.com"
                                />
                            </div>
                            <div>
                                <label className="label">{t('app.modal.phone')}</label>
                                <input
                                    type="tel"
                                    required
                                    className="input-field"
                                    value={form.phone}
                                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                                    placeholder="+1 (555) 000-0000"
                                />
                            </div>
                            <button type="submit" className="btn-primary w-full justify-center mt-2 py-3.5">
                                {t('app.modal.submit')}
                            </button>
                        </form>
                    </>
                ) : (
                    <div className="text-center py-6">
                        <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-5">
                            <CheckCircle2 className="w-8 h-8 text-green-500" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">{t('app.modal.success')}</h3>
                        <p className="text-sm text-gray-500 leading-relaxed">{t('app.modal.note')}</p>
                        <button onClick={onClose} className="btn-secondary mt-6 mx-auto">
                            Close
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
