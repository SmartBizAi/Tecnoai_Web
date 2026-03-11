'use client';
import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useLanguage } from '@/lib/i18n/LanguageContext';

const FAQ_KEYS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] as const;

function FAQItem({ q, a }: { q: string; a: string }) {
    const [open, setOpen] = useState(false);
    return (
        <div className="border border-gray-100 rounded-2xl overflow-hidden bg-white shadow-card">
            <button
                onClick={() => setOpen(!open)}
                className="w-full flex items-start justify-between gap-4 px-7 py-5 text-left hover:bg-gray-50 transition-colors"
            >
                <span className="font-semibold text-gray-900 leading-snug">{q}</span>
                <div className="flex-shrink-0 mt-0.5">
                    {open
                        ? <ChevronUp className="w-5 h-5 text-gray-400" />
                        : <ChevronDown className="w-5 h-5 text-gray-400" />}
                </div>
            </button>
            {open && (
                <div className="px-7 pb-5 text-gray-600 leading-relaxed text-sm border-t border-gray-50">
                    {a}
                </div>
            )}
        </div>
    );
}

export default function FAQPage() {
    const { t } = useLanguage();

    return (
        <div className="pt-16">
            {/* Hero */}
            <section className="bg-gradient-to-b from-white to-gray-50 py-20 px-6 text-center">
                <div className="max-w-xl mx-auto">
                    <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-4">{t('faq.title')}</h1>
                    <p className="text-gray-500 text-lg">Quick answers to the most common questions about TecnoAI.</p>
                </div>
            </section>

            {/* FAQ list */}
            <section className="section-pad bg-gray-50">
                <div className="max-w-3xl mx-auto space-y-4">
                    {FAQ_KEYS.map((n) => (
                        <FAQItem
                            key={n}
                            q={t(`faq.q${n}` as any)}
                            a={t(`faq.a${n}` as any)}
                        />
                    ))}
                </div>
            </section>

            {/* Bottom CTA */}
            <section className="py-16 px-6 text-center bg-white border-t border-gray-100">
                <h2 className="text-2xl font-bold text-gray-900 mb-3">Still have questions?</h2>
                <p className="text-gray-500 mb-6">Take 5 minutes to get a personalized diagnosis.</p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <a href="/chaos-challenge" className="btn-primary">Start Chaos Challenge</a>
                    <a href="/contact" className="btn-secondary">Contact us</a>
                </div>
            </section>
        </div>
    );
}
