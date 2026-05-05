'use client';
import Link from 'next/link';
import { TrendingUp, Users, MapPin, ShoppingCart, BarChart2, Bell, ChevronRight } from 'lucide-react';
import { useLanguage } from '@/lib/i18n/LanguageContext';

const sections = [
    { icon: BarChart2, numKey: 's1' as const },
    { icon: Users, numKey: 's2' as const },
    { icon: MapPin, numKey: 's3' as const },
    { icon: ShoppingCart, numKey: 's4' as const },
    { icon: TrendingUp, numKey: 's5' as const },
    { icon: Bell, numKey: 's6' as const },
];

export default function SalesRepManualPage() {
    const { t } = useLanguage();

    return (
        <div className="pt-16">
            {/* Hero */}
            <section className="bg-gradient-to-b from-violet-50 to-white py-24 px-6">
                <div className="max-w-4xl mx-auto">
                    <div className="flex items-center gap-2 mb-6 text-sm text-gray-500">
                        <Link href="/user-manuals" className="hover:text-gray-700 transition-colors">
                            {t('manuals.title')}
                        </Link>
                        <ChevronRight className="w-4 h-4 text-gray-300" />
                        <span className="text-gray-900 font-medium">{t('manuals.salesrep.title')}</span>
                    </div>
                    <div className="flex items-start gap-6 mb-6">
                        <div className="w-16 h-16 rounded-2xl bg-violet-100 flex items-center justify-center flex-shrink-0">
                            <TrendingUp className="w-8 h-8 text-violet-700" />
                        </div>
                        <div>
                            <h1 className="text-5xl font-extrabold text-gray-900 mb-4">
                                {t('manuals.salesrep.title')}
                            </h1>
                            <p className="text-xl text-gray-500 max-w-xl">
                                {t('manuals.salesrep.hero.sub')}
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Sections */}
            <section className="py-16 px-6 bg-white">
                <div className="max-w-4xl mx-auto space-y-6">
                    {sections.map(({ icon: Icon, numKey }, index) => (
                        <div
                            key={numKey}
                            className="flex gap-6 bg-gray-50 border border-gray-100 rounded-2xl p-7 hover:border-violet-200 transition-colors"
                        >
                            <div className="flex-shrink-0">
                                <div className="w-12 h-12 rounded-xl bg-violet-50 border border-violet-100 flex items-center justify-center">
                                    <Icon className="w-6 h-6 text-violet-600" />
                                </div>
                            </div>
                            <div>
                                <div className="text-xs font-bold text-violet-400 uppercase tracking-wider mb-1">
                                    Step {String(index + 1).padStart(2, '0')}
                                </div>
                                <h2 className="text-lg font-bold text-gray-900 mb-2">
                                    {t(`manuals.salesrep.${numKey}.title` as any)}
                                </h2>
                                <p className="text-sm text-gray-600 leading-relaxed">
                                    {t(`manuals.salesrep.${numKey}.desc` as any)}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Back link */}
            <section className="py-10 px-6 bg-white border-t border-gray-100">
                <div className="max-w-4xl mx-auto">
                    <Link
                        href="/user-manuals"
                        className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors"
                    >
                        {t('manuals.back')}
                    </Link>
                </div>
            </section>
        </div>
    );
}
