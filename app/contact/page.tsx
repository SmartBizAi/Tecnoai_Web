'use client';
import { useState } from 'react';
import Link from 'next/link';
import { CheckCircle2, Mail, Phone, ArrowRight } from 'lucide-react';
import { useLanguage } from '@/lib/i18n/LanguageContext';

export default function ContactPage() {
    const { t } = useLanguage();
    const [submitted, setSubmitted] = useState(false);
    const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
    };

    return (
        <div className="pt-16">
            {/* Hero */}
            <section className="bg-gradient-to-b from-white to-gray-50 py-20 px-6 text-center">
                <div className="max-w-xl mx-auto">
                    <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-4">{t('contact.title')}</h1>
                    <p className="text-lg text-gray-500">{t('contact.subtitle')}</p>
                </div>
            </section>

            {/* Content */}
            <section className="section-pad bg-gray-50">
                <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
                    {/* Info */}
                    <div className="space-y-6">
                        <div>
                            <h2 className="text-xl font-bold text-gray-900 mb-4">Get in touch</h2>
                            <p className="text-gray-500 text-sm leading-relaxed">
                                Whether you have a question, want to explore an app, or need something custom—we're here. A real person reads every message.
                            </p>
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-center gap-3 bg-white border border-gray-100 rounded-xl p-4 shadow-card">
                                <div className="w-10 h-10 rounded-xl bg-brand-50 flex items-center justify-center flex-shrink-0">
                                    <Mail className="w-5 h-5 text-brand-600" />
                                </div>
                                <div>
                                    <p className="text-xs text-gray-400 uppercase tracking-wide">{t('contact.email.label')}</p>
                                    <p className="font-medium text-gray-900">{t('contact.email.value')}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 bg-white border border-gray-100 rounded-xl p-4 shadow-card">
                                <div className="w-10 h-10 rounded-xl bg-brand-50 flex items-center justify-center flex-shrink-0">
                                    <Phone className="w-5 h-5 text-brand-600" />
                                </div>
                                <div>
                                    <p className="text-xs text-gray-400 uppercase tracking-wide">{t('contact.phone.label')}</p>
                                    <p className="font-medium text-gray-900">{t('contact.phone.value')}</p>
                                </div>
                            </div>
                        </div>

                        <div className="border-t border-gray-200 pt-6 space-y-3">
                            <p className="text-sm font-semibold text-gray-700">Or jump straight in:</p>
                            <Link href="/chaos-challenge" className="btn-primary block text-center">
                                {t('contact.cta.chaos')} <ArrowRight className="w-4 h-4 inline ml-1" />
                            </Link>
                            <Link href="/apps" className="btn-secondary block text-center">
                                {t('contact.cta.apps')}
                            </Link>
                        </div>
                    </div>

                    {/* Form */}
                    <div className="bg-white border border-gray-100 rounded-2xl p-8 shadow-card">
                        {!submitted ? (
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label className="label">{t('contact.form.name')}</label>
                                    <input type="text" required className="input-field" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Jane Smith" />
                                </div>
                                <div>
                                    <label className="label">{t('contact.form.email')}</label>
                                    <input type="email" required className="input-field" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="jane@business.com" />
                                </div>
                                <div>
                                    <label className="label">{t('contact.form.phone')}</label>
                                    <input type="tel" className="input-field" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="+1 (555) 000-0000" />
                                </div>
                                <div>
                                    <label className="label">{t('contact.form.message')}</label>
                                    <textarea required className="input-field min-h-[120px] resize-y" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder="Tell us about your business and what you need..." />
                                </div>
                                <button type="submit" className="btn-primary w-full justify-center py-3.5">
                                    {t('contact.form.submit')} <ArrowRight className="w-4 h-4" />
                                </button>
                            </form>
                        ) : (
                            <div className="text-center py-8">
                                <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-5">
                                    <CheckCircle2 className="w-8 h-8 text-green-500" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">{t('contact.form.success')}</h3>
                                <p className="text-sm text-gray-500">We typically respond within 1 business day.</p>
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </div>
    );
}
