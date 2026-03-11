'use client';
import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { CheckCircle2, ArrowRight, MessageCircle } from 'lucide-react';
import { useLanguage } from '@/lib/i18n/LanguageContext';

const MODULE_OPTIONS = [
    'Control Center', 'CRM Lite (Clients)', 'Client Portal',
    'Inventory Posting', 'Field Team Tracking', 'Booking Calendar',
];

function CustomFormContent() {
    const { t } = useLanguage();
    const searchParams = useSearchParams();
    const [submitted, setSubmitted] = useState(false);
    const [summary, setSummary] = useState('');
    const [modules, setModules] = useState<string[]>([]);
    const [form, setForm] = useState({ fullName: '', business: '', email: '', phone: '' });

    useEffect(() => {
        const s = searchParams.get('summary');
        const m = searchParams.get('modules');
        if (s) setSummary(s);
        if (m) setModules(m.split(',').map((x) => x.trim()).filter(Boolean));
    }, [searchParams]);

    const toggleModule = (mod: string) => {
        setModules((prev) => prev.includes(mod) ? prev.filter((m) => m !== mod) : [...prev, mod]);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
    };

    if (submitted) {
        return (
            <div className="text-center py-16">
                <div className="w-20 h-20 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 className="w-10 h-10 text-green-500" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-3">{t('custom.success.title')}</h2>
                <p className="text-gray-500 text-lg mb-8 max-w-md mx-auto">{t('custom.success.desc')}</p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <a
                        href="https://wa.me/1000000000"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-7 py-3.5 bg-green-500 text-white font-semibold rounded-xl hover:bg-green-600 transition-all"
                    >
                        <MessageCircle className="w-5 h-5" />
                        {t('custom.success.whatsapp')}
                    </a>
                </div>
                <p className="text-sm text-gray-400 mt-5">{t('custom.success.note')}</p>
            </div>
        );
    }

    return (
        <>
            {/* Hero */}
            <section className="bg-gradient-to-b from-gray-50 to-white py-20 px-6 text-center">
                <div className="max-w-2xl mx-auto">
                    <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 tracking-tight mb-4">{t('custom.title')}</h1>
                    <p className="text-lg text-gray-500">{t('custom.subtitle')}</p>
                </div>
            </section>

            {/* Form */}
            <section className="pb-20 px-6">
                <div className="max-w-2xl mx-auto">
                    <form onSubmit={handleSubmit} className="space-y-8">
                        {/* Summary */}
                        <div>
                            <label className="label text-base font-semibold text-gray-900 mb-3">{t('custom.summary.label')}</label>
                            <textarea
                                className="input-field min-h-[120px] resize-y"
                                placeholder={t('custom.summary.placeholder')}
                                value={summary}
                                onChange={(e) => setSummary(e.target.value)}
                            />
                        </div>

                        {/* Module chips */}
                        <div>
                            <label className="label text-base font-semibold text-gray-900 mb-3">{t('custom.modules.label')}</label>
                            <div className="flex flex-wrap gap-2">
                                {MODULE_OPTIONS.map((mod) => (
                                    <button
                                        key={mod}
                                        type="button"
                                        onClick={() => toggleModule(mod)}
                                        className={`chip ${modules.includes(mod) ? 'chip-active' : 'chip-inactive'}`}
                                    >
                                        {modules.includes(mod) ? '✓ ' : ''}{mod}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Contact */}
                        <div className="bg-gray-50 rounded-2xl p-6 space-y-4">
                            <h3 className="font-semibold text-gray-900">Your contact info</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="label">{t('custom.form.fullname')}</label>
                                    <input type="text" required className="input-field" value={form.fullName} onChange={(e) => setForm({ ...form, fullName: e.target.value })} placeholder="Jane Smith" />
                                </div>
                                <div>
                                    <label className="label">{t('custom.form.business')}</label>
                                    <input type="text" required className="input-field" value={form.business} onChange={(e) => setForm({ ...form, business: e.target.value })} placeholder="Acme Co." />
                                </div>
                                <div>
                                    <label className="label">{t('custom.form.email')}</label>
                                    <input type="email" required className="input-field" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="jane@business.com" />
                                </div>
                                <div>
                                    <label className="label">{t('custom.form.phone')}</label>
                                    <input type="tel" required className="input-field" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="+1 (555) 000-0000" />
                                </div>
                            </div>
                        </div>

                        <button type="submit" className="btn-primary w-full justify-center py-4 text-base">
                            {t('custom.form.submit')} <ArrowRight className="w-4 h-4" />
                        </button>
                    </form>
                </div>
            </section>
        </>
    );
}

export default function CustomPage() {
    return (
        <div className="pt-16">
            <Suspense fallback={<div className="pt-32 text-center text-gray-400">Loading…</div>}>
                <CustomFormContent />
            </Suspense>
        </div>
    );
}
