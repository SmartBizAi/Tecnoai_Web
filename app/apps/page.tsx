'use client';
import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Zap } from 'lucide-react';
import { useLanguage } from '@/lib/i18n/LanguageContext';

const APPS = [
    {
        name: 'RxRoutes',
        href: '/apps/rxroutes',
        icon: '🚚',
        tagKey: 'apps.rxroutes.oneliner' as const,
        viewKey: 'apps.view.rxroutes' as const,
        filters: [0],
        color: 'from-brand-50 to-brand-50/30',
        border: 'border-brand-100',
        accent: 'text-brand-600 bg-brand-50',
    },
    {
        name: 'BookingPro',
        href: '/apps/bookingpro',
        icon: '📅',
        tagKey: 'apps.bookingpro.oneliner' as const,
        viewKey: 'apps.view.bookingpro' as const,
        filters: [1],
        color: 'from-violet-50 to-violet-50/30',
        border: 'border-violet-100',
        accent: 'text-violet-600 bg-violet-50',
    },
    {
        name: 'InventaryEasy',
        href: '/apps/inventaryeasy',
        icon: '📦',
        tagKey: 'apps.inventaryeasy.oneliner' as const,
        viewKey: 'apps.view.inventaryeasy' as const,
        filters: [2],
        color: 'from-emerald-50 to-emerald-50/30',
        border: 'border-emerald-100',
        accent: 'text-emerald-600 bg-emerald-50',
    },
];

export default function AppsPage() {
    const { t } = useLanguage();
    const [activeFilter, setActiveFilter] = useState<number | null>(null);

    const filters = [
        t('apps.filter.1'),
        t('apps.filter.2'),
        t('apps.filter.3'),
    ];

    const filtered = activeFilter === null
        ? APPS
        : APPS.filter((a) => a.filters.includes(activeFilter));

    return (
        <div className="pt-16">
            {/* Hero */}
            <section className="bg-gradient-to-b from-white to-gray-50 py-20 px-6 text-center">
                <div className="max-w-2xl mx-auto">
                    <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 tracking-tight mb-4">
                        {t('apps.title')}
                    </h1>
                    <p className="text-lg text-gray-500">{t('apps.subtitle')}</p>
                </div>
            </section>

            {/* Filters */}
            <section className="bg-white border-b border-gray-100 py-5 px-6 sticky top-16 z-10">
                <div className="max-w-5xl mx-auto flex flex-wrap gap-2 justify-center">
                    {filters.map((f, i) => (
                        <button
                            key={i}
                            onClick={() => setActiveFilter(activeFilter === i ? null : i)}
                            className={`chip ${activeFilter === i ? 'chip-active' : 'chip-inactive'}`}
                        >
                            {f}
                        </button>
                    ))}
                    <button
                        onClick={() => setActiveFilter(null)}
                        className={`chip ${activeFilter === null ? 'chip-active' : 'chip-inactive'}`}
                    >
                        {t('apps.filter.all')}
                    </button>
                </div>
            </section>

            {/* App cards */}
            <section className="section-pad bg-gray-50">
                <div className="container-narrow">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {filtered.map((app) => (
                            <div key={app.href} className={`bg-gradient-to-br ${app.color} border ${app.border} rounded-2xl p-8 flex flex-col card-hover shadow-card`}>
                                <div className="text-4xl mb-5">{app.icon}</div>
                                <h2 className="text-xl font-bold text-gray-900 mb-2">{app.name}</h2>
                                <p className="text-sm text-gray-600 leading-relaxed flex-1">{t(app.tagKey)}</p>
                                <Link href={app.href} className="btn-primary mt-6 justify-center text-sm">
                                    {t(app.viewKey)} <ArrowRight className="w-3.5 h-3.5" />
                                </Link>
                            </div>
                        ))}
                    </div>

                    {/* Chaos Challenge banner */}
                    <div className="mt-10 bg-gradient-to-r from-brand-600 to-brand-700 rounded-2xl p-7 flex flex-col sm:flex-row items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                            <Zap className="w-6 h-6 text-white flex-shrink-0" />
                            <p className="text-white font-semibold">{t('apps.banner')}</p>
                        </div>
                        <Link href="/chaos-challenge" className="inline-flex items-center gap-2 px-6 py-2.5 bg-white text-brand-700 font-semibold rounded-xl hover:bg-brand-50 transition-all text-sm flex-shrink-0">
                            Start Challenge <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
