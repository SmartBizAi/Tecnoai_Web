'use client';
import Link from 'next/link';
import { BookOpen, ArrowRight } from 'lucide-react';
import { useLanguage } from '@/lib/i18n/LanguageContext';

const apps = [
    {
        href: '/docs/rxroutes',
        emoji: '🚚',
        accentColor: 'border-brand-500',
        badgeBg: 'bg-brand-50 text-brand-700',
        titleKey: 'docs.rxroutes.card.title',
        descKey: 'docs.rxroutes.card.desc',
        ctaKey: 'docs.rxroutes.card.cta',
    },
    {
        href: '/docs/bookingpro',
        emoji: '📅',
        accentColor: 'border-violet-500',
        badgeBg: 'bg-violet-50 text-violet-700',
        titleKey: 'docs.bookingpro.card.title',
        descKey: 'docs.bookingpro.card.desc',
        ctaKey: 'docs.bookingpro.card.cta',
    },
    {
        href: '/docs/inventaryeasy',
        emoji: '📦',
        accentColor: 'border-emerald-500',
        badgeBg: 'bg-emerald-50 text-emerald-700',
        titleKey: 'docs.inventaryeasy.card.title',
        descKey: 'docs.inventaryeasy.card.desc',
        ctaKey: 'docs.inventaryeasy.card.cta',
    },
] as const;

export default function DocsPage() {
    const { t } = useLanguage();

    return (
        <div className="pt-16 min-h-screen bg-gray-50">
            <section className="bg-white border-b border-gray-100 py-16 px-6">
                <div className="max-w-3xl mx-auto text-center">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-[#0f2250]/10 mb-6">
                        <BookOpen className="w-6 h-6 text-[#0f2250]" />
                    </div>
                    <h1 className="text-4xl font-extrabold text-gray-900 mb-4">{t('docs.title')}</h1>
                    <p className="text-lg text-gray-500">{t('docs.subtitle')}</p>
                </div>
            </section>

            <section className="py-16 px-6">
                <div className="max-w-3xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6">
                    {apps.map((app) => (
                        <Link
                            key={app.href}
                            href={app.href}
                            className={`group bg-white border border-gray-100 border-l-4 ${app.accentColor} rounded-2xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col gap-4`}
                        >
                            <div className="text-4xl">{app.emoji}</div>
                            <div className="flex-1">
                                <h2 className="text-base font-bold text-gray-900 mb-2">{t(app.titleKey as any)}</h2>
                                <p className="text-sm text-gray-500 leading-relaxed">{t(app.descKey as any)}</p>
                            </div>
                            <span className={`inline-flex items-center gap-1 text-xs font-semibold ${app.badgeBg} px-3 py-1.5 rounded-lg self-start group-hover:gap-2 transition-all`}>
                                {t(app.ctaKey as any)} <ArrowRight className="w-3 h-3" />
                            </span>
                        </Link>
                    ))}
                </div>
            </section>
        </div>
    );
}
