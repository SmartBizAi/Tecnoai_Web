'use client';
import Link from 'next/link';
import { ArrowRight, BookOpen, ShieldCheck, TrendingUp, MapPin } from 'lucide-react';
import { useLanguage } from '@/lib/i18n/LanguageContext';

const roles = [
    {
        href: '/user-manuals/admin',
        icon: ShieldCheck,
        emoji: '🛡️',
        titleKey: 'manuals.admin.title' as const,
        descKey: 'manuals.admin.desc' as const,
        ctaKey: 'manuals.admin.cta' as const,
        color: 'from-brand-50 to-brand-100/40',
        border: 'border-brand-100',
        iconColor: 'text-brand-600',
        iconBg: 'bg-brand-50',
    },
    {
        href: '/user-manuals/salesrep',
        icon: TrendingUp,
        emoji: '📈',
        titleKey: 'manuals.salesrep.title' as const,
        descKey: 'manuals.salesrep.desc' as const,
        ctaKey: 'manuals.salesrep.cta' as const,
        color: 'from-violet-50 to-violet-100/40',
        border: 'border-violet-100',
        iconColor: 'text-violet-600',
        iconBg: 'bg-violet-50',
    },
    {
        href: '/user-manuals/locations_owner',
        icon: MapPin,
        emoji: '📍',
        titleKey: 'manuals.locations_owner.title' as const,
        descKey: 'manuals.locations_owner.desc' as const,
        ctaKey: 'manuals.locations_owner.cta' as const,
        color: 'from-emerald-50 to-emerald-100/40',
        border: 'border-emerald-100',
        iconColor: 'text-emerald-600',
        iconBg: 'bg-emerald-50',
    },
];

export default function UserManualsPage() {
    const { t } = useLanguage();

    return (
        <div className="pt-16">
            {/* Hero */}
            <section className="bg-gradient-to-b from-[#f0f4ff] via-[#e8f0fe] to-white py-24 px-6">
                <div className="max-w-3xl mx-auto text-center">
                    <div className="inline-flex items-center gap-2 bg-white text-[#0f2250] px-4 py-1.5 rounded-full text-sm font-semibold mb-6 border border-[#c7d4f0] shadow-sm">
                        <BookOpen className="w-4 h-4" />
                        <span>{t('manuals.title')}</span>
                    </div>
                    <h1 className="text-5xl font-extrabold text-[#0a0f1e] tracking-tight leading-tight mb-5">
                        {t('manuals.title')}
                    </h1>
                    <p className="text-xl text-gray-500 leading-relaxed max-w-xl mx-auto">
                        {t('manuals.subtitle')}
                    </p>
                </div>
            </section>

            {/* Role cards */}
            <section className="py-20 px-6 bg-white">
                <div className="max-w-5xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
                        {roles.map((role) => {
                            const Icon = role.icon;
                            return (
                                <Link
                                    key={role.href}
                                    href={role.href}
                                    className={`bg-gradient-to-br ${role.color} border ${role.border} rounded-2xl p-8 flex flex-col group hover:shadow-lg transition-all duration-200`}
                                >
                                    <div className={`w-12 h-12 rounded-xl ${role.iconBg} flex items-center justify-center mb-5`}>
                                        <Icon className={`w-6 h-6 ${role.iconColor}`} />
                                    </div>
                                    <h2 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-brand-700 transition-colors">
                                        {t(role.titleKey)}
                                    </h2>
                                    <p className="text-sm text-gray-500 leading-relaxed flex-1">
                                        {t(role.descKey)}
                                    </p>
                                    <div className="flex items-center gap-1.5 text-sm font-semibold mt-7 text-gray-700 group-hover:text-brand-700 transition-colors">
                                        {t(role.ctaKey)} <ArrowRight className="w-4 h-4" />
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </section>
        </div>
    );
}
